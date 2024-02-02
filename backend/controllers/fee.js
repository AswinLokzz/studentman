const feeDetailsItems = require("../models/feedetails/feedetails.model");
const mongoose = require("mongoose");

const postfeeDetails = async (req, res, next) => {
  try {
    console.log("fee body", req.body);

    const newFeedetails = new feeDetailsItems({
      studentid: req.body.id,
      FeeType: req.body.FeeType,
      Amount: req.body.Amount,
      Description: req.body.Description,
    });
    console.log("new", newFeedetails);
    await newFeedetails.save();
    res.status(201).send({ data: "details added successfully" });
  } catch (error) {
    console.error("Error adding details:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getFeeDetails = async (req, res) => {
  try {
    console.log("hwllo:", req.params);
    const id = req.params.id;

    if (id === 'null') {
      
      const AdminfeeDetailsData = await feeDetailsItems.find();
      console.log("====>",AdminfeeDetailsData)
      if (AdminfeeDetailsData.length === 0) {
        return res.status(400).json({ message: "not found" });
      }
      console.log("-++++++>", AdminfeeDetailsData);
      return res.status(200).send(AdminfeeDetailsData);
    }
    console.log("---+>",id)
    let string_id = id.toString()
    console.log("---+>",string_id)
    const feeDetailsData = await feeDetailsItems.find({ 
      studentid:
      id});
    console.log("------>", feeDetailsData);
    if (feeDetailsData.length === 0) {
      return res.status(401).json({ message: "not found" });
    }

    return res.status(200).send(feeDetailsData);
  } catch (error) {
    console.error("Error fetching homepage data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { postfeeDetails, getFeeDetails };
