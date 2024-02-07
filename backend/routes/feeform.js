var express = require('express');
const path = require('path');
var router = express.Router();

const FeeFormController=require('../controllers/fee')

router.post('/', FeeFormController.postfeeDetails);
router.get('/:id',FeeFormController.getFeeDetails)
router.put('/update',FeeFormController.updatefeeDetails)

module.exports=router