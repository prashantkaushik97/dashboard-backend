const Seq = require("../model/seq");
const express = require('express')
const router = express.Router();

router.post("/", async (req, res) => {
    //create Seq
    try {
        let { seq_name, seq_val } = req.body
        if (!(seq_name && seq_val)) {
            res.status(400).json({ message: "Required Seq Name and Seq Value" });
            return
        }
        var seqDoc = await Seq.findOneAndUpdate(
            { _id: seq_name },
            { seq_val: seq_val },
            { upsert: true, returnOriginal: false }
            // { new : true }
        );
        console.log('seqDoc', seqDoc)

        res.status(201).json({ seqDoc });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;