import React, { useState } from 'react';

import { useT } from 'lib/i18n';
import { useBasket } from '../index';
import { useLocale } from 'lib/app-config';

import { doPost } from 'lib/rest-api/helpers';
import {
  Outer,
  VoucherButton,
  VoucherInput,
  VoucherFeedback,
  InputGroup,
  OpenVoucherBtn
} from './styles';

export const Voucher = () => {
  const t = useT();
  const basket = useBasket();
  const locale = useLocale();

  const [state, setState] = useState({
    showButton: true,
    validated: false,
    voucherMessage: '',
    voucherCode: ''
  });

  const validateVoucher = async (voucherCode) => {
    try {
      const voucher = await doPost('/api/validate-voucher', {
        body: JSON.stringify({ voucherCode })
      });

      setState({
        ...state,
        validated: voucher.message === 'Enjoy off Price',
        voucherMessage: voucher.message
      });

      if (voucher.message === 'Enjoy off Price') {
        basket.actions.addItem({
          sku: voucher.sku,
          path: `/vouchers/${voucherCode.toLowerCase()}`,
          priceVariantIdentifier: locale.crystallizePriceVariant
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { showButton, voucherCode, voucherMessage, validated } = state;

  return (
    <Outer>
      {showButton && !validated ? (
        <OpenVoucherBtn
          onClick={() =>
            setState({
              ...state,
              showButton: !showButton
            })
          }
        >
          <span> {t('basket.addVoucher')} </span>
          <span>+</span>
        </OpenVoucherBtn>
      ) : null}

      {!showButton && !validated ? (
        <InputGroup>
          <VoucherInput
            type="text"
            placeholder={t('basket.voucherCode')}
            onChange={(e) =>
              setState({ ...state, voucherCode: e.target.value })
            }
            value={voucherCode}
          ></VoucherInput>
          <VoucherButton onClick={() => validateVoucher(voucherCode)}>
            {t('basket.voucherCheck')}
          </VoucherButton>
        </InputGroup>
      ) : null}
      {voucherMessage ? (
        <VoucherFeedback>
          <p>{voucherMessage}</p>
        </VoucherFeedback>
      ) : null}
    </Outer>
  );
};
