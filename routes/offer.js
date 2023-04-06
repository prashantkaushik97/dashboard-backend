const Offer = require("../model/offer");
const express = require('express')
const router = express.Router();

router.get("/offerid/:id", async (req, res) => {
    const query = { offerId: req.params.id };

    try {
        const offer = await Offer.findOne(query);

        res.status(201).json({ offer });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/createOffer", async (req, res) => {
    try {
        let { title, description, discount, endDate, startDate, minimum_amount, itemType, maximumDiscount, customerType} = req.body
        let { image } = req.files;


        const offer = await Offer.create({
            title, description, discount, endDate, startDate, minimum_amount, itemType, maximumDiscount, customerType
        });

        res.status(200).json({ message: "Offer created" })

    } catch (err) {
        res.status(500).json("Server Error!")
        console.log(err);
    }
});
router.get("/allOffers", async (req, res) => {
    try {
        let data = await Offer.find({})
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Server Error!")
    }
});

module.exports = router;