var express = require('express');
const path = require('path');
var router = express.Router();

const FeeFormController=require('../controllers/fee')

router.post('/', FeeFormController.postfeeDetails);
router.get('/',FeeFormController.getFeeDetails)

module.exports=router