/**
 * Vipps will call this URL in case the user is revoking
 * access to any data for the user.
 *
 * If you store user related information on payments here,
 * respect the users choice and remove any additional information
 * there might be on the ecommerce end
 */
export default async (req, res) => {
  console.log('Remove data for user', req.query);
  res.status(200).send('hello');
};
