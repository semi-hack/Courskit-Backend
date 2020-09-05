const mongoose = require('mongoose');
const { Discussion } = require('../models/discussion');
const { Comment } = require('../models/discussion');
const { isValidObjectId } = require('mongoose');

module.exports = {
    ADD_Discussion : async params => {
        const discuss = await Discussion.findOne({ title: params.title}).exec()
        if(discuss) {
            return { error: "title exists" }
        }
        const newDiscussion = await new Discussion({
            title: params.title,
            details: params.details,
            createdBy: params.createdBy
        }).save();

        return Discussion.populate(newDiscussion, {
            path: 'createdBy'
        });
    },
    ADD_Comment : async data => {
        var comment = {message: data.message, userId: data.userId, _id: data._id}
        return await Discussion.findByIdAndUpdate(data._id, {$push: {comments:comment}})
        .populate({ path:'comments', populate: [{ path: 'userId', model: 'User'}]})
    }
}