var express = require('express');
var router = express.Router();

const StudentListController = require('../controllers/StudentList') 

/* GET users listing. */
router.post('/',StudentListController.postStudentDetails );

module.exports = router;