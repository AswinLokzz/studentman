const feeDetailsItems = require("../models/feedetails/feedetails.model");

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
    console.log("hwllo")
    const feeDetailsData = await feeDetailsItems.find();
    if (!feeDetailsData) {
      return res.status(500).json({ message: "not found" });
    }
    console.log(feeDetailsData);
    return res.status(200).send(feeDetailsData);
  } catch (error) {
    console.error("Error fetching homepage data:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { postfeeDetails,getFeeDetails };
