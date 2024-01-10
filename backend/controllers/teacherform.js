const TeacherForm=require('../models/teacherform/teacherform.model')

const postTeacherDetails = async (req, res, next) => {
  try {
    console.log("hello")
    console.log(req.body)

    const newTeacher = new TeacherForm({
      Fullname: req.body.Fullname,
      Gender: req.body.Gender,
      Year: req.body.Year,
      Semester: req.body.Semester,
      Department: req.body.Department,
      Subject: req.body.subject,
      Email: req.body.Email,
      Username: req.body.Username,
      Password: req.body.Password,
      Image: req.body.image
    });
    console.log("new", newTeacher)
    await newTeacher.save();
    res.status(201).send({ data: 'Teacher added successfully' });
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getDetails= async(req,res)=>{
  try{
    const id=req.body.id
    const teacher=await TeacherForm.findOne({_id:id})
    if(!teacher){
      return res.status(400).send('Teacher not found');

    }
    return res.status(201).json({message:"Success", data:teacher})
  }catch(err){
    console.error('Error adding teacher:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  postTeacherDetails,
  getDetails
};
