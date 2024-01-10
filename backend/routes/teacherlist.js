var express = require('express');
var router = express.Router();


const TeacherListItem=require("../models/teacherform/teacherform.model")
/* GET users listing. */
// router.get('/Students/list',StudentPageController.getStudentListData );
router.get('/',async (req, res) => {
    console.log("I am here")
    try {
      // Fetch data from MongoDB
      const TeacherListData = await TeacherListItem.find()
      if(! TeacherListData){
        return res.status(500).json({message:"not found"})
      }
      console.log( TeacherListData)
      res.status(201).json({data: TeacherListData});
    } catch (error) {
      console.error('Error fetching homepage data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;