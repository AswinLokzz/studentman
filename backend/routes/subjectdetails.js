var express = require('express');
var router = express.Router();

const subjectdetailsController=require('../controllers/subjectdetails')

router.post("/",subjectdetailsController.postSubjectDetails)
router.get("/",subjectdetailsController.getSubjectDetails)

module.exports=router