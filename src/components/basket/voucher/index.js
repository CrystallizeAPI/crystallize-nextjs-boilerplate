import React, { useState } from 'react';

import { useT } from 'lib/i18n';
// import { useBasket } from '../index';
import { doPost } from 'lib/rest-api/helpers';
import { Outer, VoucherButton, VoucherInput } from './styles';

export const Voucher = () => {
  const t = useT();
  const [state, setState] = useState({
    showButton: true,
    validated: false,
    voucherMessage: '',
    voucherCode: t('basket.voucherCode')
  });

  const validateVoucher = async (voucherCode) => {
    try {
      const response = await doPost('/api/validate-voucher', {
        body: JSON.stringify({ voucherCode })
      });

      setState({
        ...state,
        validated: response.message === 'Enjoy off Price',
        voucherMessage: response.message
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { showButton, voucherCode, voucherMessage, validated } = state;

  return (
    <Outer>
      {showButton && !validated ? (
        <VoucherButton
          onClick={() =>
            setState({
              ...state,
              showButton: !showButton
            })
          }
        >
          {t('basket.addVoucher')}
        </VoucherButton>
      ) : null}
      {voucherMessage ? <p>{voucherMessage}</p> : null}
      {!showButton && !validated ? (
        <div>
          <VoucherInput
            type="text"
            onChange={(e) =>
              setState({ ...state, voucherCode: e.target.value })
            }
            value={voucherCode}
          ></VoucherInput>
          <VoucherButton onClick={() => validateVoucher(voucherCode)}>
            {t('basket.voucherCheck')}
          </VoucherButton>
        </div>
      ) : null}
    </Outer>
  );
};
