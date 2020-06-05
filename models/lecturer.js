const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LecturerSchema = new Schema({
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

const Lecturer = mongoose.model("Lecturer", LecturerSchema)

module.exports = { Lecturer }