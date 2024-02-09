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

module.exports={postSubjectDetails}