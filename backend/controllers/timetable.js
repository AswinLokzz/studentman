const timetableitems=require("../models/timetable/timetabledetails.model")

const getTimeTableData = async (req, res) => {
    try {
      const TimeTableData = await timetableitems.find();
      if(!TimeTableData){
        return res.status(401).json({message:"not found"})
      }
      res.status(200).json(TimeTableData);
    } catch (error) {
      console.error('Error fetching student list data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  module.exports={getTimeTableData}