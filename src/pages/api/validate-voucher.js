import { fetchVoucher } from 'lib-api/util/checkout';

export default async (req, res) => {
  try {
    const { voucherCode } = req.body;
    const apiResponse = await fetchVoucher({ voucherCode });
    console.log(apiResponse.data?.voucher?.defaultVariant);

    const voucher = apiResponse?.data?.voucher?.defaultVariant;
    const response = {
      ...voucher,
      success: true
    };
    if (voucher && voucher.stock > 0) {
      response.message = `Enjoy off Price`;
    } else if (!voucher) {
      response.message = `Try again`;
    } else {
      response.message = `This code has been used`;
    }
    return res.json(response);
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
