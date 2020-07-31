const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    unit: {
        type: Number,
        required: true
    },
    day: {
        type: String
    },
    description: {
        type: String
    },
    level: {
        type: Number
    },
    lecturer: {type: Schema.Types.ObjectId, ref: 'Lecturer', default: null},
    venue: {type: Schema.Types.ObjectId, ref: 'room'},
    time: {
        type: String,
        required: true
    },
})

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course 