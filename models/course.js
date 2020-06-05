const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    unavailablePeriods: {
        type: String,
        required: true
    },
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})

const Course = mongoose.model("Course", CourseSchema)

module.exports = { Course }