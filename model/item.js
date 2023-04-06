const mongoose = require("mongoose");

//const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new mongoose.Schema({
    itemName: { type: String, default: null,required: true, unique: true },
    price: { type: Number, required: true },
    availability: {type: Boolean, default: true },
    description: {type: String, default: null, required: true },
    category: {type: String, default: null, required: true },
    subCategory:{type: String, default: null, required: true },
    offer: {type: String, default: null },
    stock: {type: Number, default: null, required: true },
    prepTime: {type: String, default: null },
    tags:{type:Array, default: null},
    options:{type:Array, default: null},
    nutrition:{
        calories:{type: Number},
        protein:{type: Number},
        fat:{type: Number}
    },
    itemType:{type:String, default: null},
    orders:{type:Number, default: 0},
    productionCost:{type:Number, default: null},
    tax:{type:Number, default:0}
});

//itemSchema.plugin(AutoIncrement, {inc_field: 'itemId'});

//module.exports = mongoose.model("item", itemSchema);
module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);