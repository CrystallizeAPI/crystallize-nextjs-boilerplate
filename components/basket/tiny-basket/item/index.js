import React from 'react';

import AttributeList from 'components/attribute-list';
import { CurrencyValue } from 'components/currency-value';

import {
  Item,
  ItemInfo,
  ItemInfoText,
  ItemImage,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  PriceWrap,
  Price,
  PriceVat,
  SubInfoOuter,
  SubInfoLine
} from './styles';

const TinyBasketItem = ({ actions, item }) => {
  const increment = () => {
    actions.incrementQuantityItem(item);
  };

  const decrement = () => {
    actions.decrementQuantityItem(item);
  };

  const remove = () => {
    actions.removeItem(item);
  };

  const { attributes, subscription } = item;

  const isSubscription = !!subscription;

  return (
    <Item animate={item.animate} isSubscription={isSubscription}>
      <ItemInfo>
        <ItemImage
          {...item.image}
          onError={e => {
            e.target.onerror = null;
            e.target.src = item.placeholder_image;
          }}
        />
        <ItemInfoText>
          <ItemName>
            {isSubscription ? item.subscriptionName : item.name}
          </ItemName>
          {attributes && attributes.length > 0 && (
            <AttributeList attributes={attributes} />
          )}
          {isSubscription ? (
            <SubInfoOuter>
              <SubInfoLine>{item.subscriptionInitialInfo}</SubInfoLine>
              <SubInfoLine>{item.subscriptionRenewalInfo}</SubInfoLine>
            </SubInfoOuter>
          ) : (
            <PriceWrap>
              <Price>
                <CurrencyValue value={item.price} />
              </Price>
            </PriceWrap>
          )}

          <PriceVat>
            <span>
              <CurrencyValue value={item.vatAmount} />
            </span>
          </PriceVat>
        </ItemInfoText>
      </ItemInfo>
      <ItemQuantityChanger>
        <button
          onClick={decrement}
          type="button"
          disabled={item.quantity === 1}
        >
          -
        </button>
        <ItemQuantity>{item.quantity}</ItemQuantity>
        <button onClick={increment} type="button">
          +
        </button>
      </ItemQuantityChanger>
      <ItemDelete onClick={remove}>Remove {item.name} from basket</ItemDelete>
    </Item>
  );
};

export default TinyBasketItem;
