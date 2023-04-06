const mongoose = require("mongoose");

const seqSchema = new mongoose.Schema({
    // seq_name: {type: String, unique: true, default: null },
    _id: { type: String, required: true },
    seq_val: { type: Number, required: true, default: 1 }

});

module.exports = mongoose.model("seq", seqSchema);