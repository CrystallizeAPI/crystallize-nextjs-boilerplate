import { useState } from 'react';
import { useT } from 'lib/i18n';
import { Input, InputGroup, Label } from '../styles';
import { VoucherDisplayer, ErrorMessage } from './styles';
import { Button } from 'ui';
import { useBasket } from 'components/basket';
// import ServiceApi from 'lib/service-api';
// import GET_VOUCHER_QUERY from './get-voucher-query'

export default function Voucher() {
  const basket = useBasket();
  const t = useT();
  const [voucherCode, setVoucherCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [
    hasValidatedVoucherCodeAtLeastOnce,
    setHasValidatedVoucherCodeAtLeastOnce
  ] = useState(false);

  async function handleClickOnApplyVoucher() {
    // const { isValid } = await ServiceApi({
    //   query: `
    //     {
    //       voucher(code: $code) {
    //         isValid,
    //         voucher {
    //           code
    //           discountAmount
    //           discountPercent
    //         }
    //       }
    //     }
    //   `,
    //   variables: { code: voucherCode }
    // });
    const isValid = true;

    setHasValidatedVoucherCodeAtLeastOnce(true);

    if (!isValid) {
      setHasError(true);
      return;
    }

    basket.actions.addVoucherCode(voucherCode);
  }

  const showErrorMessage = hasError && hasValidatedVoucherCodeAtLeastOnce;

  return (
    <InputGroup>
      <Label htmlFor="voucherCode">{t('vouchers.title')}</Label>
      <VoucherDisplayer>
        <Input
          name="voucherCode"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <Button onClick={handleClickOnApplyVoucher}>Apply</Button>
      </VoucherDisplayer>

      {showErrorMessage && (
        <ErrorMessage>{t('vouchers.errorMessage')}</ErrorMessage>
      )}
    </InputGroup>
  );
}
