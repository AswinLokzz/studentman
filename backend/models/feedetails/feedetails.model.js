const mongoose = require('mongoose');

const feeDetailsSchema = new mongoose.Schema({
  studentid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentListItem'
  },
  FeeType: String,
  Amount: String,
  Description: String
});

const feeDetailsItems = mongoose.model('feeDetailsItems', feeDetailsSchema);

module.exports = feeDetailsItems;



