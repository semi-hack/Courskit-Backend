const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    courses: {
        type: Array
    }
})

const Timetable = mongoose.model('timetable', TimetableSchema);

module.exports =  Timetable
