var express = require('express');
const path = require('path');
var router = express.Router();

const attendancecontroller= require('../controllers/attendance')

// router.post('/', .postfeeDetails);
// router.get('/:id',FeeFormController.getFeeDetails)

router.post('/', attendancecontroller.addattendance)
module.exports=router