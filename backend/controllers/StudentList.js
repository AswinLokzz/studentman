const StudentListItem = require('../models/studentspage/StudentListItem.model')


const getStudentListData = async (req, res) => {
  try {
    // Fetch data from MongoDB
    const StudentListData = await StudentListItem.find();
    // console.log(homepageData)
    res.status(200).json({message:"Dtaa obtained successfully", data:StudentListData})
  } catch (error) {
    console.error('Error fetching homepage data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


const postStudentDetails = async(req, res, next) =>{
    console.log("--->",req.body)
    try{
        const new_student = new StudentListItem({
            Fullname:req.body.Fullname,
            Gender:req.body.Gender,
            Year:req.body.Year,
            Semester:req.body.Semester,
            District:req.body.District,
            Address:req.body.Address,
            Email:req.body.Email,
            Username:req.body.Username,
            Password:req.body.Password,
        })
        await new_student.save()
        res.status(201).send({data:"I have added Student"})
    }catch{

    }
}

module.exports={
    getStudentListData,
    postStudentDetails
}