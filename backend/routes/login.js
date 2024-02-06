var express = require('express');
var router = express.Router();
var login=require('../controllers/login')
var middleware =  require('../middleware/middleware.js')

router.post('/',login.postLoginData);

module.exports=router