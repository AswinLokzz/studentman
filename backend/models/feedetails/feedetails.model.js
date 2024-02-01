const mongoose = require('mongoose');


const feeDetailsItem= new mongoose.Schema({
    studentid: {type:mongoose.Schema.Types.ObjectId,
    ref:'StudentListItem'},
    FeeType:String,
    Amount:String,
    Description:String
})

const feeDetailsItems=mongoose.model("feeDetailsItems",feeDetailsItem)

module.exports=feeDetailsItems;
