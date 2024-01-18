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

    
    const updateTeacherData = async (req, res) => {
      const teacherId = req.params.id;
      const updatedData = req.body;
    
      try {
        const updatedTeacher = await TeacherDataList.findByIdAndUpdate(
          teacherId,
          updatedData,
          { new: true }
        );
    
        if (!updatedTeacher) {
          return res.status(404).json({ message: "Teacher not found" });
        }
    
        res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
      } catch (error) {
        console.error('Error updating teacher data:', error.message);
        res.status(500).send('Internal Server Error');
      }
    };
    
    module.exports = {
      getTeacherDataList,
      updateTeacherData
    };

}