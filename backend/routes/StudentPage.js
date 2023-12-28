var express = require('express');
var router = express.Router();

const StudentPageController = require('../controllers/StudentList'); 
const StudentListItem = require('../models/studentspage/StudentListItem.model');

/* GET users listing. */
// router.get('/Students/list',StudentPageController.getStudentListData );
router.get('/',async (req, res) => {
    console.log("I am here")
    try {
      // Fetch data from MongoDB
      const StudentListData = await StudentListItem.find()
      if(!StudentListData){
        return res.status(500).json({message:"not found"})
      }
      console.log(StudentListData)
      res.status(201).json({data:StudentListData});
    } catch (error) {
      console.error('Error fetching homepage data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;