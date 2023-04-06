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
const express = require('express');
const table = require("../model/table");
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

function calculateBill(currentOrders) {
    let sum = 0
    currentOrders.forEach((order, idx) => {
        sum += order.orderAmount
    })
    return sum
}
router.post("/getBill", async (req, res) => {
    try {
        let { tableNumber } = req.body
        let tableData = await Table.findOne({ tableNumber: tableNumber } )
        if(tableData){
            totalAmount=0
            totals=[]
            tableData?.currentOrders.map((order)=>{
                order.orderItems.forEach(item=>{
                    console.log(item)
                    let itemAmount = item.price * item.quantity;
                    itemAmount=Number((itemAmount*(1+item.tax/100)).toFixed(2))
                    totalAmount += itemAmount;
                    totals.push({
                        itemName:item.name,
                        itemQuantity:item.quantity,
                        itemTotal:itemAmount
                    })
                })
            })           
            console.log(totals)
            console.log(totalAmount)
            let billAmount = calculateBill(tableData?.currentOrders)
            res.status(200).json({ billAmount });
        }
        else{
            res.status(404).json({"error":"Order Not found"})
        }
    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});

module.exports = router;