const TeacherForm = require('../models/teacherform/teacherform.model');

const postTeacherDetails = async (req, res, next) => {
  try {
    console.log("hello");
    console.log(req.body);

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
      Image: req.body.image,
      allSubjects:req.body.allSubjects
    });

    console.log("new", newTeacher);
    await newTeacher.save();
    res.status(201).send({ data: 'Teacher added successfully' });
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const teacher = await TeacherForm.findOne({ _id: id });
    if (!teacher) {
      return res.status(400).send('Teacher not found');
    }
    return res.status(201).json({ message: "Success", data: teacher });
  } catch (err) {
    console.error('Error retrieving teacher details:', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateTeacherData=async(req,res)=>{
  try{
    const id=req.body.id
    const teacher= await TeacherForm.findOne({_id:id})
    if(!teacher){
      return res.status(400).send('Teacher not found');
    }
    teacher.Username=req.body.name,
    teacher.Fullname=req.body.fname,
    teacher.Department=req.body.department,
    teacher.Year=req.body.year,
    teacher.Semester=req.body.semester,
    teacher.Subject=req.body.subject,
    teacher.Email=req.body.email,
    teacher.Password=req.body.password,
    teacher.Image=req.body.image
    await teacher.save()
    res.status(201).send({ message: 'Teacher added successfully' });
    
  }catch (err) {
    console.error('Error retrieving teacher details:', err);
    res.status(500).send('Internal Server Error');
  }

}

module.exports = {
  postTeacherDetails,
  getDetails,
  updateTeacherData
};
