const TeacherDataList = require('../models/teacherform/teacherform.model')
const StudentListItem = require('../models/studentspage/StudentListItem.model');
const {LocalStorage} = require('node-localstorage')  

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage('./scratch');

const jwt = require("jsonwebtoken");  


const postLoginData= async(req,res)=>{
    console.log(req.body)
    try{
        const username= req.body.Username
        const password=req.body.Password
        const token = jwt.sign({username: username} , 'A_very_long_string_for_our_secret',  { expiresIn: "1h"}  );  
        console.log("USER="+username+"PASS"+password)
        if((username=='admin')&&(password=="1234")){
            return res.status(200).json({role:"Admin",token: token})
        }
        const foundTeacher = await TeacherDataList.findOne({Username:username,Password:password})
        
        console.log("--->",foundTeacher)
        if(foundTeacher){
            return res.status(200).json({role:"Teacher",_id:foundTeacher._id,token: token  })
        }
        const foundStudent = await StudentListItem.findOne({Username:username,Password:password})
        console.log("+++>",foundStudent)
        if(foundStudent){
            return res.status(200).json({role:"Student",_id:foundStudent._id,token: token  })
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
    postLoginData, getLoginData
}