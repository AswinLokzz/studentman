const attendanceItems = require("../models/attendance/attendance.model")
const TeacherForm = require("../models/teacherform/teacherform.model")
const subjectitems = require("../models/timetable/subjectdetails.model")

const addattendance= async(req,res)=>{
    try{
   console.log("subject", req.body.sub)
   const teacher=await TeacherForm.findOne({_id:req.body.id})
   console.log(teacher)
   if(!teacher){
    return res.status(401).json({message:"Unknown error ocuured"})

   }
   const item=await subjectitems.findOne({Teacher:teacher.Fullname, Subject:req.body.sub})
   console.log(item)
   if(!item){
    return res.status(401).json({message:"Unknown error ocuured"})

   }
   const newteacher=new attendanceItems({
    studentid: req.body.students,
    date:req.body.date,
    Subject:req.body.sub,
    hour:item.Hour,
    Department:item.Department,
    Semester:item.Semester

   })
   await newteacher.save()
   return res.status(201).json({message:"Timetable add4ed"})
   ret
    } catch(err){
        return res.status(401).json({message:"Unknown error ocuured"})
    }
}

module.exports={addattendance}