const TeacherDataList = require('../models/teacherform/teacherform.model')
const StudentListItem = require('../models/studentspage/StudentListItem.model');
const {LocalStorage} = require('node-localstorage')  

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage('./scratch');

const postLoginData= async(req,res)=>{
    console.log(req.body)
    try{
        const username= req.body.Username
        const password=req.body.Password
        console.log("USER="+username+"PASS"+password)
        if((username=='admin')&&(password=="1234")){
            return res.status(200).json("Admin")
        }
        const foundTeacher = await TeacherDataList.findOne({Username:username,Password:password})
        
        // console.log("--->",foundTeacher)
        if(foundTeacher){
            // localStorage.setItem("teacher_id","foundTeacher._id")
            return res.status(200).json({role:"Teacher",_id:foundTeacher._id})
        }
        const foundStudent = await StudentListItem.findOne({Username:username,Password:password})
        // console.log("+++>",foundStudent)
        if(foundStudent){
            // localStorage.setItem("student_id","foundStudent._id")
            return res.status(200).json({role:"Student",_id:foundStudent._id})
        }
        return res.status(401).json({message:"invalid credentials"})
    }catch (error) {
        console.error('wrong username and password', error.message);
        res.status(500).send('Internal Server Error');
      }

}

const getLoginData= async(req,res)=>{
    console.log(req.body)
    try{
        const username= req.body.Username
        const password=req.body.Password


        // if((username=='admin')&&(password=="1234")){
        //     return res.status(200).json({message:"login successfull"})
        // }
        
    }catch (error) {
        console.error('wrong username and password', error.message);
        res.status(500).send('Internal Server Error');
      }

}

module.exports={
    postLoginData
}