import { useReducer } from 'react';
import { useT } from 'lib/i18n';
import { Input, InputGroup, Label } from '../styles';
import { VoucherDisplayer, ErrorMessage } from './styles';
import { Button } from 'ui';
import { useBasket } from 'components/basket';
import voucherReducer, { initialVoucherState } from './reducer';
import ServiceApi from 'lib/service-api';
import GET_VOUCHER_QUERY from './get-voucher-query';

export default function Voucher() {
  const basket = useBasket();
  const t = useT();
  // We can create the initial state lazily by passing a function as third parameter that returns
  // the inital state desired. This is usually done when it depends on props.
  // See more at https://reactjs.org/docs/hooks-reference.html#lazy-initialization
  const [state, dispatch] = useReducer(
    voucherReducer,
    initialVoucherState,
    () => ({
      ...initialVoucherState,
      voucherCode: basket?.basketModel?.voucherCode || ''
    })
  );
  const { voucherCode, isValid } = state;

  async function handleClickOnApplyVoucher() {
    // If a voucher code has been validated and applied,
    // the user can't submit many times the same value.
    if (state.voucherCode === basket.basketModel.voucherCode) {
      return;
    }

    const response = await ServiceApi({
      query: GET_VOUCHER_QUERY,
      variables: { code: voucherCode }
    });

    if (!response.data.voucher.isValid) {
      dispatch({ action: 'voucher-validated-failed' });
      return;
    }

    dispatch({ action: 'voucher-validated-successfully' });
    basket.actions.addVoucherCode(voucherCode);
  }

  // we check if isValid === false because it can be undefined as well
  // For more information, read the initialState comments
  const showErrorMessage = isValid === false;

  function handleOnChange(e) {
    dispatch({
      action: 'update-voucher',
      payload: {
        voucherCode: e.target.value
      }
    });
  }

  return (
    <InputGroup>
      <Label htmlFor="voucherCode">{t('vouchers.title')}</Label>
      <VoucherDisplayer>
        <Input
          name="voucherCode"
          value={voucherCode}
          onChange={handleOnChange}
        />
        <Button onClick={handleClickOnApplyVoucher}>Apply</Button>
      </VoucherDisplayer>

      {showErrorMessage && (
        <ErrorMessage>{t('vouchers.errorMessage')}</ErrorMessage>
      )}
    </InputGroup>
  );
}
