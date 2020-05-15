import React, { createContext } from 'react';
import uuid from 'uuid/v1';

import * as helpers from './helpers';
import * as cache from './cache';

export const {
  calculateTotals,
  getSupportedOptionsFromProps,
  getVariantVATprops,
} = helpers;

const BasketContext = createContext();

export const useBasket = () => React.useContext(BasketContext);

function createId() {
  return `${Date.now()}-${uuid()}`;
}

export class BasketProvider extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      options: {
        ...prevState.options,
        ...getSupportedOptionsFromProps(nextProps),
      },
      ...calculateTotals(prevState),
    };
  }

  state = {
    ready: false,
    items: [],
    options: {},
    discount: null,
    shipping: null,
    metadata: {},
  };

  onReadyQueue = [];

  itemAnimationTimeouts = [];

  componentDidMount() {
    this.getCachedBasket();
  }

  componentDidUpdate() {
    cache.persistBasketToCache(this.state);
  }

  ss = (state) => {
    const { ready } = this.state;

    if (ready) {
      return this.setState(state);
    }

    return this.onReady(() => this.setState(state));
  };

  onReady = (fn) => {
    const { ready } = this.state;
    if (ready) {
      fn();
    } else {
      this.onReadyQueue.push(fn);
    }
  };

  parseBasketItem = ({ basketId, ...item }) => {
    let newBasketId = item.sku;
    if (this.subscription) {
      newBasketId = `${item.sku}-subscr-${this.subscription.variationplan_id}`;
    }

    return {
      basketId: newBasketId,
      quantity: 1,
      ...item,
    };
  };

  getCachedBasket = async () => {
    const id = createId();
    const basket = await cache.retrieveBasketFromCache({
      parseBasketItem: this.parseBasketItem,
    });

    if (basket) {
      const { items, ...rest } = basket;

      this.setState({
        id,
        ...rest,
        items: items.map(this.parseBasketItem),
      });
    } else {
      this.setState({ id });
    }

    this.setState({ ready: true });

    this.onReadyQueue.forEach((fn) => fn());
    this.onReadyQueue.length = 0;
  };

  changeItemQuantity = ({ item, num, quantity }) => {
    const { items, options } = this.state;
    const index = this.findItemIndex(item);
    const itemInBasket = items[index];

    if (itemInBasket) {
      const itemInBasketOldQuantity = itemInBasket.quantity;

      if (typeof quantity === 'number') {
        itemInBasket.quantity = quantity;
      } else if (typeof num === 'number') {
        itemInBasket.quantity += num;
      }

      if (itemInBasket.quantity === 0) {
        items.splice(index, 1);
      } else {
        items[index] = this.parseBasketItem(itemInBasket);
      }

      // Update the item
      this.setState({
        items: [...items],
      });

      // Run any callbacks
      const quantityChange = itemInBasket.quantity - itemInBasketOldQuantity;
      if (quantityChange > 0) {
        if (options.onAddToBasket) {
          options.onAddToBasket([
            {
              ...item,
              quantity: quantityChange,
            },
          ]);
        }
      } else if (quantityChange < 0) {
        if (options.onRemoveFromBasket) {
          options.onRemoveFromBasket([
            {
              ...item,
              quantity: Math.abs(quantityChange),
            },
          ]);
        }
      }

      return true;
    }
    return false;
  };

  incrementQuantityItem = (item) =>
    this.onReady(() => {
      this.changeItemQuantity({ item, num: 1 });
    });

  decrementQuantityItem = (item) =>
    this.onReady(() => {
      this.changeItemQuantity({ item, num: -1 });
    });

  addItem = (itemRaw) =>
    this.onReady(() => {
      const item = this.parseBasketItem(itemRaw);

      // Try to increment by one. If not, add new product to basket
      if (!this.changeItemQuantity({ item, num: 1 })) {
        this.setState((s) => ({
          items: [...s.items, item],
        }));

        // Run any callbacks
        const { options } = this.state;
        if (options.onAddToBasket) {
          options.onAddToBasket([{ ...item, quantity: 1 }]);
        }
      }
    });

  findItemIndex = (item) => {
    const parsed = this.parseBasketItem(item);
    const { items } = this.state;

    return items.findIndex((i) => i.basketId === parsed.basketId);
  };

  pulsateItemInBasket = (animItem) => {
    const parsedItem = this.parseBasketItem(animItem);

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (mainResolve) => {
      const updateStateItem = (stateItem, animate) =>
        new Promise((resolve) => {
          this.setState(
            (s) => ({
              items: s.items.map((item) => {
                if (item.basketId === stateItem.basketId) {
                  return {
                    ...item,
                    animate,
                  };
                }
                return item;
              }),
            }),
            resolve
          );
        });

      // Remove queued animation
      const removeQueuedAnimation = async () => {
        const index = this.itemAnimationTimeouts.findIndex(
          (i) => i.item.basketId === parsedItem.basketId
        );
        if (index >= 0) {
          clearTimeout(this.itemAnimationTimeouts[index].timeout);
          this.itemAnimationTimeouts.splice(index, 1);
          await updateStateItem(parsedItem, false);
        }
      };

      await removeQueuedAnimation(parsedItem);

      await updateStateItem(parsedItem, true);

      this.itemAnimationTimeouts.push({
        item: parsedItem,
        timeout: setTimeout(async () => {
          await removeQueuedAnimation(parsedItem);
          mainResolve();
        }, helpers.animationSpeedMs),
      });
    });
  };

  removeItem = (item) =>
    this.onReady(() => this.changeItemQuantity({ item, quantity: 0 }));

  empty = () =>
    this.onReady(() => {
      const { items, options } = this.state;
      this.setState({
        items: [],
      });

      // Run any callbacks
      if (options.onRemoveFromBasket) {
        options.onRemoveFromBasket(items);
      }
    });

  reset = () =>
    this.ss({
      id: createId(),
      items: [],
      metadata: null,
      discount: null,
    });

  setItems = (items) => this.ss({ items });

  setDiscount = (discount) => this.ss({ discount });

  setMetadata = (metadata) => this.ss({ metadata });

  setShipping = (shipping) =>
    this.ss({
      shipping,
    });

  render() {
    const { options, ...state } = this.state;
    const { children } = this.props;

    return (
      <BasketContext.Provider
        value={{
          state,
          options,
          actions: {
            empty: this.empty,
            reset: this.reset,
            addItem: this.addItem,
            setItems: this.setItems,
            pulsateItemInBasket: this.pulsateItemInBasket,
            removeItem: this.removeItem,
            incrementQuantityItem: this.incrementQuantityItem,
            decrementQuantityItem: this.decrementQuantityItem,
            parseBasketItem: this.parseBasketItem,
            setDiscount: this.setDiscount,
            setMetadata: this.setMetadata,
            onReady: this.onReady,
          },
        }}
      >
        {children}
      </BasketContext.Provider>
    );
  }
}
