const TeacherDataList = require('../models/teacherform/teacherform.model')

const getTeacherDataList = async (req, res) => {
    console.log("I am here")
    try {
      // Fetch data from MongoDB
      const TeacherListData = await TeacherDataList.find();
      if(!TeacherListData){
        return res.status(500).json({message:"not found"})
      }
      console.log(TeacherListData)
      res.status(200).send(TeacherListData);
    } catch (error) {
      console.error('Error fetching homepage data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  module.exports={
    getTeacherDataList}