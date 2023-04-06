const express = require("express");
const cors = require("cors");
const uuid = require('uuid');

var bodyParser = require('body-parser');  
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
const sseRoute = require("./routes/sse");

const cookieParser = require('cookie-parser');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
// app.use(express.static('public'));  
connectDB()
const VERIFICATION_TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours
const verificationTokens = new Map();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.post('/', (req, res)=>{

  const userEmail = req.body.email

  res.cookie(userEmail, { maxAge: 900000, httpOnly: false  });
  res.send('Cookie set!');


})
app.get('/', (req, res) => {
  const userEmail = req.cookies;
  console.log(userEmail)
  if (userEmail) {
    res.send(`Hello! ${Object.keys(userEmail)}` );
  } else {
    console.log('No stored email found');
  }

});
app.delete('/', (req, res) => {
  try {
    res.clearCookie("userEmail");
    console.log(req.cookies);
    res.status(200).send("Cookie deleted successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting cookie.");
  }
});
app.post('/post',(req,res)=>{
    res.json({success:true})
})
app.use(function (req, res, next) {
  res.flush = function () { /* Do nothing */ }
  next();
})
app.use(sseRoute);
app.use('/auth',require("./routes/auth"));
app.use('/table',require("./routes/table"));
app.use('/item',require("./routes/item"));
app.use('/offer',require("./routes/offer"));
app.use('/bill',require("./routes/bill"))
app.use('/qr',require("./routes/qr"));
app.use('/order',require("./routes/order"));
app.use('/seq',require("./routes/order"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port`, process.env.PORT),
);