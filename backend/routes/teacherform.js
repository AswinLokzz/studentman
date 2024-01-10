var express = require('express');
const path = require('path');
var router = express.Router();

const TeacherFormController = require('../controllers/teacherform');


router.post('/', TeacherFormController.postTeacherDetails);

router.post('/getData' ,TeacherFormController.getDetails )

module.exports = router;
