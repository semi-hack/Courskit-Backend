const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');


const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course'}],
    AcademicPeriod: {
        type: Schema.Types.ObjectId, ref: 'Period'
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

ClassSchema.plugin(mongoosePaginate);

const Klass = mongoose.model("Klass", ClassSchema)

module.exports = { Klass }