const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
},
 { timestamps: true }
)

RoomSchema.plugin(mongoosePaginate);

const Room = mongoose.model('room', RoomSchema);

module.exports = { Room };