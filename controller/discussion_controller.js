const express = require('express');
const mongoose = require('mongoose');
const { Discussion, Comments } =  require('../models/discussion');
const { isValidObjectId } = require('mongoose');
const { callbackPromise } = require('nodemailer/lib/shared');


const createDiscussion = async (req, res) => {
    const { title, details } = req.body

    try {
        const discuss = await Discussion.findOne({ title: req.body.title}).exec()
        if(discuss) {
            return res.status(401).json({
                message: "title exists"
            });
        }
        const discussion = new Discussion({
            title,
            details
        });
        await discussion.save()
        return res.json({
            success: true,
            data: discussion
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error.',
            success: false
        });
    }
}


const comment = async (req, res) => {
    const { discussionId } = req.headers
    //const comment = {message: req.body.message, userId: req.body.userId}
    const comm = new Comments({
        message: req.body.message,
        userId: req.body.userId
    })
    await comm.save()

    await Discussion.findOneAndUpdate( {_id: req.headers.discussionId}, {
        $set: {
            comments:comm._id
        },
    }, { 
        'new': true
        
    }, (err, discussion) => {
        if(err) {
            console.log(err)
        } else {
            console.log(discussion)
            return(null, discussion)
        }
        return res.status(200).json({ data: discussion})
    })

    
}

// const updateDiscussion = async(req, res) => {
//     const {}
// }

// const deleteDiscussion = async (req, res) => {

// }


module.exports = {createDiscussion, comment }