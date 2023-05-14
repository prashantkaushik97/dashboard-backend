const mongoose = require('mongoose');
require('dotenv').config()

//const db = process.env.MONGO_URI;
const db=`mongodb+srv://root:adminxyz@cluster0.t0ffmpk.mongodb.net/?retryWrites=true&w=majority`
const connectDb = async() =>{
    try{ 
        await mongoose.connect(db,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
    }
    catch(err){
        console.error(err.message); 
        process.exit(1);
    }
};

module.exports = connectDb;