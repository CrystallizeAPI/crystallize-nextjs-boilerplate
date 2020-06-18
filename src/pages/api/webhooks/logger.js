export default (req, res) => {
  console.log('webhook received', new Date());
  console.log(JSON.stringify(req.body, null, 3));

  res.send('received');
};
