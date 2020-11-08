const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    courses: {
        type: Array
    },
    name: {
        type: String
    },
    session: {
        type: String
    },
    uid: {
        type: String
    },
    current_progress: {
        type: Number
    },
    total_progress: {
        type: Number
    }
})

const Timetable = mongoose.model('timetable', TimetableSchema);

module.exports =  Timetable
