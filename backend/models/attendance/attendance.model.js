const mongoose = require('mongoose');

const attendanceDetailsSchema = new mongoose.Schema({
  studentid:Array,
  date:String,
  status:String,
  hour:String,
  Department:String,
  Semester:String,
  Subject:String
});

const attendanceItems = mongoose.model('attendanceItems', attendanceDetailsSchema);

module.exports = attendanceItems;