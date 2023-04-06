// const tableSchema = new mongoose.Schema({
//     tableNumber: { type: Number, required: true, unique: true },
//     emailId: { type: String, default: null },
//     currentOrders: { type: Array, default: null },
//     status: { type: String , default: null },
//     occupiedAt: { type: Date, default: null  }
// }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Table = require("../model/table");
const Order = require("../model/order");
const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();
// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken");

async function getValueForNextSequence(sequenceOfName) {

    console.log('sequenceOfName', sequenceOfName)
    let filter = { seq_name: sequenceOfName }
    let updates = { $inc: { seq_val: 1 } }
    var sequenceDoc = await Seq.findOneAndUpdate(
        filter,
        updates,
        { returnOriginal: false }
    );
    console.log('sequenceDoc', sequenceDoc)
    return sequenceDoc.seq_val;
}


router.post("/createTable", async (req, res) => {
    try {
        let { tableNumber, capacity, notes } = req.body
        let data = await Table.create({ tableNumber: tableNumber, capacity:capacity, notes:notes })
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

router.get("/allTables", async (req, res) => {
    try {
        let data = await Table.find({})
        //let data=await Order.find()
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Server Error!")
        // console.log(err);
    }
});
module.exports = router;