const Order = require("../model/order");
const Table = require("../model/table");
  const sse = require("../sse");

const getOrdersService = async () => {
    //   try {
    //     const posts = await PostModel.find();
    //     const _length = posts.length;
    //     const message = _length === 0 ? "Not found" : "success";
    //     const error = _length === 0 ? true : false;
    //     const statusCode = _length === 0 ? 404 : 200;
    //     return { data: posts, error, message, statusCode };
    //   } catch (error) {
    //     return {
    //       data: [],
    //       error: true,
    //       message: "Sorry an error occurred",
    //       statusCode: 500,
    //     };
    //   }
    try {

        const orders = await Order.find();
        const _length = orders.length;
        const message = _length === 0 ? "Not found" : "success";
        const error = _length === 0 ? true : false;
        const statusCode = _length === 0 ? 404 : 200;
        return { data: orders, error, message, statusCode };
    } catch (err) {
        return {
            data: [],
            error: true,
            message: "Sorry an error occurred",
            statusCode: 500,
        };
    }
};
const createOrderService = async (body) => {
    try {
        let { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount, tableNumber } = body
        const order = await Order.create({
            orderItems, email, orderStatus, paymentStatus, orderType, orderAmount
        });
        await Table.updateOne({ tableNumber: tableNumber },
            {
                $set: {
                    currentOrders: { $push: { orderItems, email, orderStatus, paymentStatus, orderType, orderAmount } },
                    status: 'occupied'
                }
            })

        const _length = order.length;
        const message = _length === 0 ? "Not found" : "success";
        const error = _length === 0 ? true : false;
        const statusCode = _length === 0 ? 404 : 200;

        return { data: order, error, message, statusCode };
    } catch (err) {
        return {
            data: [],
            error: true,
            message: "Sorry an error occurred",
            statusCode: 500,
        };
    }
};
module.exports = {
    getOrdersService,
    createOrderService
};