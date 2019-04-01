import styled from 'styled-components';

import { colors } from 'ui';

const borderColor = '#dfdfdf';

export const Header = styled.h4`
  flex: 0 0 100px;
  padding: 50px 0;
  align-items: center;
  position: relative;
`;

export const Basket = styled.div`
  position: relative;
  height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #fff;
  z-index: 15;
  .crystallize-basket {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0;
    color: ${colors.black};
    &__basket-is-empty {
      flex: 1 1 auto;
    }
    &__items {
      flex: 1 1 auto;
      overflow-y: auto;
    }
    &__item {
      padding: 2px 0;
      &-inner {
        background: #fff;
        padding: 5px 0;
        position: relative;
        img {
          object-fit: contain;
          width: 80px;
          height: 80px;
        }
      }
      &-quantity-changer {
        align-items: flex-end;
        padding: 0 10px 10px 0;
      }
      &-delete {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0px;
        right: 2px;
      }
      &-name {
        font-size: 14px;
      }
      &-price {
        font-weight: 700;
        padding-top: 5px;
      }
      &-vat {
        font-weight: 300;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    &__totals {
      padding: 10px 0;
      font-size: 14px;
      border-top: 1px solid ${borderColor};

      &-row--total-price {
        font-weight: 700;
        font-size: 16px;
      }
    }
  }
`;

export const Footer = styled.div`
  padding: 25px 0;
`;
