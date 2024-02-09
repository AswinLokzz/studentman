const mongoose = require('mongoose');

const timetableDetailsSchema = new mongoose.Schema({
  Department:String,
  Semester:String,
  Subjects:Array
});

const timetableitems = mongoose.model('timetableitems', timetableDetailsSchema);

module.exports = timetableitems;