export default `
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
`;
