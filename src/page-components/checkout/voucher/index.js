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
  const [state, dispatch] = useReducer(voucherReducer, initialVoucherState);
  const { voucherCode, isValid } = state;

  async function handleClickOnApplyVoucher() {
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
