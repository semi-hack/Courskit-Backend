const express = require('express');
const mongoose = require('mongoose');
const { Discussion, Comments } =  require('../models/discussion');
const { isValidObjectId } = require('mongoose');
const { callbackPromise } = require('nodemailer/lib/shared');


const createDiscussion = async (req, res) => {
    const { title, details, createdBy } = req.params

    try {
        const discuss = await Discussion.findOne({ title: req.params.title}).exec()
        if(discuss) {
            return res.status(401).json({
                message: "title exists"
            });
        }
        const discussion = new Discussion({
            title,
            details,
            createdBy
        });
        
        const updated = await discussion.save()
        
        return res.json({
            success: true,
            data: updated
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error.',
            success: false
        });
    }
}


const comment = async (req, res) => {
    const { _id } = req.headers

    const comm = new Comments({
        message: req.body.message,
        userId: req.body.userId
    })
    await comm.save()

    const result = await Discussion.findByIdAndUpdate( req.headers._id, {
        $push: {comments:comm}
    }, { 
        new: true    
    }).populate({ path:'comments', populate: [{ path: 'userId', model: 'User'}]})
    if(!result) {
        return res.status(400)
    } else {
        return res.status(200).json({
            message: "comments",
            data: result
        })
    }

    
}

// const updateDiscussion = async(req, res) => {
//     const {}
// }

// const deleteDiscussion = async (req, res) => {

// }


module.exports = {createDiscussion, comment }