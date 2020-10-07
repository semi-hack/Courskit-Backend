const mongoose = require('mongoose');
const { Discussion } = require('../models/discussion');
const { Comment } = require('../models/discussion');
const { isValidObjectId } = require('mongoose');

// const Server = require('socket.io');
// const io = new Server();

// var Socket = {
//     emit: function (event, data) {
//         console.log(event, data);
//         io.sockets.emit(event, data);
//     }
// };

// io.on("connection", function (socket) {
//     console.log("A user connected");
// });

// exports.Socket = Socket;
// exports.io = io;

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});

// module.exports = {
//     ADD_Discussion : async params => {
//         const discuss = await Discussion.findOne({ title: params.title}).exec()
//         if(discuss) {
//             return { error: "title exists" }
//         }
//         const newDiscussion = await new Discussion({
//             title: params.title,
//             details: params.details,
//             createdBy: params.createdBy
//         }).save();

//         return Discussion.populate(newDiscussion, {
//             path: 'createdBy'
//         });
//     },
//     ADD_Comment : async data => {
//         var comment = {message: data.message, userId: data.userId, _id: data._id}
//         return await Discussion.findByIdAndUpdate(data._id, {$push: {comments:comment}})
//         .populate({ path:'comments', populate: [{ path: 'userId', model: 'User'}]})
//     }
// }