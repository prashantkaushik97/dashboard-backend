const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true},
    notes: { type: String, default: '' },

    emailId: { type: Array, default: null },
    currentOrders: { type: Array, default: null },
    status: { type: String , default: "available" },
    occupiedAt: { type: Date, default: null  },
    split:{type: Boolean, default: false},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("table", tableSchema);