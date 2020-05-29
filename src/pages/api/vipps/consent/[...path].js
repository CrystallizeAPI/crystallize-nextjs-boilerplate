export default async (req, res) => {
  res.status(200).send('hello');

  try {
    const validCrystallizeOrder = await orderNormalizer({
      vippsUserId: req.query.path[req.query.path.length - 1],
      vippsData: req.body,
    });

    const updateCrystallizeOrderResponse = await updateCrystallizeOrder(
      validCrystallizeOrder
    );

    return res.status(200).send({
      success: true,
      ...updateCrystallizeOrderResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack,
    });
  }
};
