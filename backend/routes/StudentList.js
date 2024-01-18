var express = require('express');
var router = express.Router();

const StudentListController = require('../controllers/StudentList') 

/* GET users listing. */
router.post('/',StudentListController.postStudentDetails );

router.post('/getdata',StudentListController.getDetails);

router.post('/updatedata',StudentListController.updateStudentData)



module.exports = router;