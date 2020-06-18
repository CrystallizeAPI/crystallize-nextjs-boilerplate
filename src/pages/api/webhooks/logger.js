import Pusher from 'pusher';

export default (req, res) => {
  new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    useTLS: true
  }).trigger('my-channel', 'webhook-received', req.body);

  res.send('received');
};
