
const subjectdetialitems=require('../models/timetable/subjectdetails.model')

const postSubjectDetails= async(req,res)=>{
   try {
    console.log(req.body)

    const newSubjectdetail=new subjectdetialitems({
        Department:req.body.Department,
        Semester:req.body.Semester,
        Day:req.body.Day,
        Hour:req.body.Hour,
        Subject:req.body.Subject,
        Teacher:req.body.Teacher
    })
    console.log("new",newSubjectdetail)
    await newSubjectdetail.save()
    res.status(201).send({ data: 'subject added successfully' });
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).send('Internal Server Error');
  }
}

const getSubjectDetails = async (req, res) => {
  try {
    const subjectdetails = await subjectdetialitems.find();
    res.status(200).json({ message: "Data obtained successfully", data: subjectdetails });
    console.log(subjectdetails); // Corrected to log subjectdetails instead of data
  } catch (error) {
    console.error('Error fetching subject details:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports={postSubjectDetails, getSubjectDetails}