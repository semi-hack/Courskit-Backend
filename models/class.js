const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course'}],
    AcademicPeriod: {
        type: String,
        required: true
    },
    Meeting: {
        type: String,
        required: true
    },
    Population: {
        type: Number,
        required: true
    },
    UnavailableRooms: {
        type: String,
        required: true
    }
});

const Class = mongoose.model("Class", ClassSchema)

module.exports = { Class }