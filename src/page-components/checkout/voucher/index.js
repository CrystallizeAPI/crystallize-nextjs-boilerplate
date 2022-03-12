import { useReducer } from 'react';

import { useTranslation } from 'next-i18next';
import { Button } from 'ui';
import ServiceApi from 'lib/service-api';
import { useBasket } from 'components/basket';

import { Input, InputGroup, Label } from '../styles';
import {
  VoucherDisplayer,
  ErrorMessage,
  ShowForm,
  VoucherApplied
} from './styles';
import voucherReducer, { initialVoucherState } from './reducer';

export default function Voucher() {
  const basket = useBasket();
  const { t } = useTranslation('basket');

  // We can create the initial state lazily by passing a function as third parameter that returns
  // the inital state desired. This is usually done when it depends on props.
  // See more at https://reactjs.org/docs/hooks-reference.html#lazy-initialization
  const [state, dispatch] = useReducer(voucherReducer, initialVoucherState);
  const { voucherCode, status } = state;

  async function onSubmit(e) {
    e.preventDefault();

    // If a voucher code has been validated and applied,
    // the user can't submit many times the same value.
    if (state.voucherCode === basket.basketModel.voucherCode) {
      return;
    }

    dispatch({ action: 'voucher-validating' });

    const response = await ServiceApi({
      query: `
        query getVoucher($code: String!) {
          voucher(code: $code) {
            isValid,
            voucher {
              code
              discountAmount
              discountPercent
            } 
          }
        }
      `,
      variables: { code: voucherCode }
    });

    if (response?.data?.voucher?.isValid) {
      dispatch({ action: 'voucher-validation-successfully' });
      basket.actions.addVoucherCode(voucherCode);
      return;
    }

    dispatch({ action: 'voucher-validation-failed' });
  }

  function handleOnChange(e) {
    dispatch({
      action: 'update-voucher',
      payload: {
        voucherCode: e.target.value
      }
    });
  }

  if (basket?.basketModel?.voucherCode) {
    return (
      <VoucherApplied>
        {t('vouchers.title')}:<span>{basket.basketModel.voucherCode}</span>
        <button type="button" onClick={basket.actions.removeVoucherCode}>
          {t('vouchers.remove')}
        </button>
      </VoucherApplied>
    );
  }

  if (!state.showForm) {
    return (
      <ShowForm onClick={() => dispatch({ action: 'show-form' })}>
        {t('vouchers.inputPlaceholder')}
      </ShowForm>
    );
  }

  return (
    <InputGroup as="form" onSubmit={onSubmit} autoComplete="off">
      <Label htmlFor="voucherCode">{t('vouchers.title')}</Label>
      <VoucherDisplayer>
        <Input
          name="voucherCode"
          value={voucherCode}
          autoFocus
          onChange={handleOnChange}
        />
        <Button
          type="submit"
          state={status === 'voucher-validating' && 'loading'}
        >
          {t('vouchers.applyCode')}
        </Button>
      </VoucherDisplayer>

      {status === 'voucher-invalid' && (
        <ErrorMessage>
          {t('vouchers.invalidCode', { code: voucherCode })}
        </ErrorMessage>
      )}
    </InputGroup>
  );
}
