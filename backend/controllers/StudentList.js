const StudentListItem = require('../models/studentspage/StudentListItem.model');
const attendanceItems=require('../models/attendance/attendance.model')

const getStudentListData = async (req, res) => {
  try {
    const StudentListData = await StudentListItem.find();
    res.status(200).json({ message: "Data obtained successfully", data: StudentListData });
  } catch (error) {
    console.error('Error fetching student list data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

const postStudentDetails = async (req, res, next) => {
  console.log("--->", req.body);
  try {
    const new_student = new StudentListItem({
      Fullname: req.body.Fullname,
      Gender: req.body.Gender,
      Year: req.body.Year,
      Department:req.body.Department,
      Semester: req.body.Semester,
      District: req.body.District,
      Address: req.body.Address,
      Email: req.body.Email,
      Username: req.body.Username,
      Password: req.body.Password,
    });
    await new_student.save();
    res.status(201).send({ data: "Student added successfully" });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await StudentListItem.findOne({ _id: id });
    if (!student) {
      return res.status(400).send('Student not found');
    }
    const attendance=await attendanceItems.find() 
    if (!attendance) {
      return res.status(400).send('Student not found');
    }
    return res.status(201).json({ message: "Success", data: student, att:attendance });
  } catch (err) {
    console.error('Error retrieving student details:', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateStudentData = async (req, res) => {
  try {
    const id = req.body.id;
    const student = await StudentListItem.findOne({ _id: id });
    if (!student) {
      return res.status(400).send('Student not found');
    }

    console.log(student)

    student.Username = req.body.name;
    student.Fullname = req.body.fname;
    student.Department = req.body.department;
    student.Year = req.body.year;
    student.Semester = req.body.semester;
    student.Address = req.body.address;
    student.District = req.body.district;
    student.Gender = req.body.gender;
    student.Email = req.body.email;
    student.Password = req.body.password;
    student.Image = req.body.image;

    await student.save();
    res.status(201).send({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Error updating student details:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getStudentListData,
  postStudentDetails,
  getDetails,
  updateStudentData
};
