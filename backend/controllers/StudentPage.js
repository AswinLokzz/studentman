const StudentListItem = require('../models/studentspage/StudentListItem.model')


const getStudentListData = async (req, res) => {
    console.log("I am here")
    try {
      // Fetch data from MongoDB
      const StudentListData = await StudentListItem.find();
      if(!StudentListData){
        return res.status(500).json({message:"not found"})
      }
      console.log(StudentListData)
      res.status(200).send(StudentListData);
    } catch (error) {
      console.error('Error fetching homepage data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  module.exports={
    getStudentListData}