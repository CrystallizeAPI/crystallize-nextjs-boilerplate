import produce from 'immer';

export const initialVoucherState = {
  showForm: false,
  status: 'idle',
  voucherCode: ''
};

export default produce(function reducer(draft, { action, payload }) {
  switch (action) {
    case 'show-form': {
      draft.showForm = true;
      break;
    }

    case 'update-voucher': {
      draft.voucherCode = payload.voucherCode;
      draft.status = initialVoucherState.status;
      break;
    }

    case 'voucher-validating': {
      draft.status = 'voucher-validating';
      break;
    }

    case 'voucher-validation-failed': {
      draft.status = 'voucher-invalid';
      break;
    }

    case 'voucher-validation-successfully': {
      draft.status = 'voucher-valid';
      break;
    }

    default:
      throw new Error(`Action "${action}" not provided nor supported!`);
  }
});
