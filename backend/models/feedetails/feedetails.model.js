const mongoose = require('mongoose');


const feeDetailsItem= new mongoose.Schema({
    studentid:String,
    FeeType:String,
    Amount:String,
    Description:String
})

const feeDetailsItems=mongoose.model("feeDetailsItems",feeDetailsItem)

module.exports=feeDetailsItems;
