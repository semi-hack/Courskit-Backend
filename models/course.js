const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

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
        type: [String]
    },
    description: {
        type: String
    },
    level: {
        type: Number
    },
    colorCode: {
        type: String,
        validator: [colorValidator, 'Invalid color'],
        required: true
    },
    lecturer: [{type: Schema.Types.ObjectId, ref: 'Lecturer' }],
    students: [{type: Schema.Types.ObjectId, ref: 'User'}],
    venue: {type: Schema.Types.ObjectId, ref: 'room'},
    time: {
        type: String,
        required: true
    },
})

//CourseSchema.plugin(mongoosastic)
CourseSchema.plugin(aggregatePaginate);
CourseSchema.plugin(mongoosePaginate);

CourseSchema.index({
    name: "text", code: "text"
})

const Course = mongoose.model("Course", CourseSchema)



module.exports = Course 