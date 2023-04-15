const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, unique: true, required: true, },
    password: { type: String, required: true, },
    type: { type: String, required: true, }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("User", userSchema);