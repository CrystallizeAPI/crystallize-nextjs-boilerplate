import React from 'react';
import { translate } from 'react-i18next';
import { BasketConsumer } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';

const Button = ({ t }) => (
  <BasketConsumer>
    {({ state }) => (
      <button onClick={showRight}>
        {state.totalQuantity
          ? t('basket:shortStatus', state)
          : t('basket:empty')}
      </button>
    )}
  </BasketConsumer>
);

export default translate()(Button);
