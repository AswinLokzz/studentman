const mongoose = require('mongoose');

const TeacherFormSchema = new mongoose.Schema({
  Fullname: String,
  Gender: String,
  Year: String,
  Semester: String,
  Department: String,
  Subject: String,
  allSubjects:Array,
  Email: String,
  Username: String,
  Password: String,
  Image: String,

});

const TeacherForm = mongoose.model('TeacherForm', TeacherFormSchema);

module.exports = TeacherForm;
