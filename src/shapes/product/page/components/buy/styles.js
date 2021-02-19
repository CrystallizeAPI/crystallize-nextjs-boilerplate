import styled from 'styled-components';
import is from 'styled-is';
import { responsive } from 'ui';

export const ProductFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  align-items: center;
  ${responsive.mdPlus} {
    margin-bottom: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  button {
    ${responsive.mdPlus} {
      flex-grow: 0;
    }
  }
`;

export const Price = styled.div`
  align-items: center;
  color: var(--color-text-sub);
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-lg);
  margin-bottom: 20px;
  margin-top: 20px;
  ${is('discounted')`
    color:var(--color-discount);
  `}

  ${responsive.xs} {
    flex-grow: 1;
  }

  ${responsive.mdPlus} {
    margin-right: 20px;
  }
`;

export const DiscountDetails = styled.span`
  display: block;
  display: flex;
  font-size: 0.55em;
  font-weight: 400;
  justify-content: space-between;
  text-align: left;
`;

export const BeforePrice = styled.div`
  color: var(--color-text-sub);
  opacity: 0.6;
  padding: 5px 0;
  text-decoration: line-through;
`;

export const Percentage = styled.div`
  font-weight: 600;
  padding: 5px 15px;
`;
