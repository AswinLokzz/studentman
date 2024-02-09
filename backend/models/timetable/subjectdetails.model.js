const mongoose = require('mongoose');

const subjectdetialsSchema= new mongoose.Schema({
    Department:String,
    Semester:String,
    Day:String,
    Hour:String,
    Subject:String,
    Teacher:String
})

const subjectitems=mongoose.model("subjectitems",subjectdetialsSchema);
 module.exports=subjectitems