import produce from 'immer';

export const initialVoucherState = {
  voucherCode: '',

  /*
   * isValid can have the following values:
   * - undefined (default)
   * - true
   * - false
   */
  isValid: undefined
};

export default produce(function reducer(draft, { action, payload }) {
  switch (action) {
    case 'update-voucher': {
      draft.voucherCode = payload.voucherCode;
      draft.isValid = undefined;
      break;
    }

    case 'voucher-validated-failed': {
      draft.isValid = false;
      break;
    }

    case 'voucher-validated-successfully': {
      draft.isValid = true;
      break;
    }

    default:
      throw new Error('Action not provided nor supported!');
  }
});
