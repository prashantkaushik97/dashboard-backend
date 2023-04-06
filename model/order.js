const mongoose = require("mongoose");
require('dotenv').config()

const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    orderItems: { type: Array, default: null },
    email: { type: String, required: true },
    orderStatus: { type: String, default: null, required: true },
    paymentStatus: { type: String, default: null, required: true },
    orderType: { type: String, default: null },
    orderAmount: { type: Number, required: true },
    tableNumber: { type: Number, default: 1 },
    

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
orderSchema.plugin(AutoIncrement, {inc_field: 'orderId'});

module.exports = mongoose.model("order", orderSchema);