var express = require('express');
var router = express.Router();

const TimeTableController=require("../controllers/timetable")

router.get("/",TimeTableController.getTimeTableData)


module.exports=router