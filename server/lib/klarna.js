const KlarnaV2 = require('@crystallize/node-klarna/v2');

module.exports = new KlarnaV2({
  testDrive: true,
  useTestMerchant: true
});
