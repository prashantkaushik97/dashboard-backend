const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: { type: Object, required: true },
    startDate: { type: Date, default:Date.now},
    endDate: { type: Date, default: null },
    minimum_amount: { type: Number, default: null },
    itemType: {
        type: Array,
        default: null
    },
    itemCategory:{ type: Array, default: null },
    itemSubCategory:{ type: Array, default: null },

    maximumDiscount: { type: Number, default: null },
    customerType: {
        type: Array,
        default: null
    },
    image: {
        type: String,
        default: null
      },
      
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("offer", offerSchema);