const mongoose = require('mongoose');

const StudentListItemSchema = new mongoose.Schema({
    Fullname:String,
    Gender:String,
    Year:String,
    Semester:String,
    District:String,
    Address:String,
    Email:String,
    Username:String,
    Password:String,
});

const StudentListItem = mongoose.model('StudentListItem', StudentListItemSchema);

module.exports = StudentListItem;