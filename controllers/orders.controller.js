const {
    getOrdersService,
    createOrderService,
  
  } = require("../services/order");
  const sse = require("../sse");
  
  const getOrdersController = async (req, res) => {
    const result = await getOrdersService();
    res.status(result.statusCode).json(result);
  };
  
  const createOrderController = async (req, res) => {
    const body = req.body;
    const result = await createOrderService(body);
    res.status(result.statusCode).json(result);
    if (!result.error) {
      //   emit post event
      sse.send(result, "order_created")
    }
  };
  
  module.exports = {
    getOrdersController,
    createOrderController
  };