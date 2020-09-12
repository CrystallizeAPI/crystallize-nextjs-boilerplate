export default (req, res) => {
  console.log('webhook received', JSON.stringify(req.body, null, 2));

  res.send('webhook received');
};
