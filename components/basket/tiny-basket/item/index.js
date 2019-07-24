import React from 'react';

import { useTranslation } from 'lib/i18n';

import {
  Item,
  ItemInfo,
  ItemInfoText,
  ItemImage,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  Attributes,
  Attribute,
  PriceWrap,
  Price,
  PriceVat,
  SubInfoOuter,
  SubInfoLine
} from './styles';

const TinyBasketItem = ({ actions, item }) => {
  const { t } = useTranslation(['basket']);

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
            <Attributes>
              {attributes.map(a => (
                <Attribute key={a.attribute_key}>
                  {a.attribute_key}: {a.attribute_value}
                </Attribute>
              ))}
            </Attributes>
          )}
          {isSubscription ? (
            <SubInfoOuter>
              <SubInfoLine>{item.subscriptionInitialInfo}</SubInfoLine>
              <SubInfoLine>{item.subscriptionRenewalInfo}</SubInfoLine>
            </SubInfoOuter>
          ) : (
            <PriceWrap>
              <Price>{t('currency', { amount: item.price })}</Price>
            </PriceWrap>
          )}
          {item.vat && (
            <PriceVat>
              <span>
                {t('basket:itemVat', { amount: item.vat.toFixed(2) })}
              </span>
            </PriceVat>
          )}
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
      <ItemDelete onClick={remove}>
        {t('basket:removeItemFromBasket', item)}
      </ItemDelete>
    </Item>
  );
};

export default TinyBasketItem;
