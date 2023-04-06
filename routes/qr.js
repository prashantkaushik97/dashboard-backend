const User = require("../model/user");
const QRCode = require("../model/qrCode");
const ConnectedDevice = require("../model/connectedDevice");
const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");
const QR = require("qrcode");
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/generate", async (req, res) => {
    try {
        console.log('body',req.body)
        const { userId } = req.body;
        console.log('userId',userId, req.body.userId)
        // Validate user input
        if (!userId) {
            res.status(400).send("User Id is required");
        }

        const user = await User.findById(userId);

        // Validate is user exist
        if (!user) {
            res.status(400).send("User not found");
        }

        const qrExist = await QRCode.findOne({ userId });

        // If qr exist, update disable to true and then create a new qr record
        if (!qrExist) {
            await QRCode.create({ userId });
        } else {
            await QRCode.findOneAndUpdate({ userId }, { $set: { disabled: true } });
            await QRCode.create({ userId });
        }

        // Generate encrypted data
        const encryptedData = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1d",
            }
        );

        // Generate qr code
        const dataImage = await QR.toDataURL(encryptedData);

        // Return qr code
        return res.status(200).json({ dataImage });
    } catch (err) {
        console.log(err);
    }
});

router.post("/scan", async (req, res) => {
    try {
      const { token, deviceInformation } = req.body;
  
      if (!token && !deviceInformation) {
        res.status(400).send("Token and deviceInformation is required");
      }
  
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      console.log('decoded',decoded)
      const qrCode = await QRCode.findOne({
        userId: decoded.user_id,
        disabled: false,
      });
    //   const qrCode = await QRCode.findOne({
    //     userId: new ObjectId(decoded.user_id),
    //     disabled: false,
    //   });
  
      if (!qrCode) {
        res.status(400).send("QR Code not found");
      }
      console.log('qrCode', qrCode)
      const connectedDeviceData = {
        userId: decoded.user_id,
        qrCodeId: qrCode._id,
        deviceName: deviceInformation.deviceName,
        deviceModel: deviceInformation.deviceModel,
        deviceOS: deviceInformation.deviceOS,
        deviceVersion: deviceInformation.deviceVersion,
      };
  
      const connectedDevice = await ConnectedDevice.create(connectedDeviceData);
  
      // Update qr code
      await QRCode.findOneAndUpdate(
        { _id: qrCode._id },
        {
          isActive: true,
          connectedDeviceId: connectedDevice._id,
          lastUsedDate: new Date(),
        }
      );
  
      // Find user
      const user = await User.findById(decoded.user_id);
  
      // Create token
      const authToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
  
      // Return token
      return res.status(200).json({ token: authToken });
    } catch (err) {
      console.log(err);
    }
  });
  
module.exports = router;