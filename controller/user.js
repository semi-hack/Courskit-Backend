const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require("../config/helper");

const login = async (req, res) => {
    const { matric, password } = req.body;
    try {
        const user = await User.findOne({ matric: req.body.matric }).exec()
        if (!user) {
            return res.status(404).json({
                error: "user not found",
                success: false
            }); 
        }

        user.comparePassword(req.body.password, (err, match) => {
            if(!match) {
                return response.status(400).send({ message: "The password is invalid" });
            }
        })

        const token = jwt.sign({ matric: user.matric }, secret)
        return res.json({
            success: true,
            data: token
        });
    } catch (err) {
        return res.status(500).json({
            err: "error login in",
            success: false
        });
    }
}


const signup = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        dob,
        level,
        matric,
        password,
        role
    } = req.body
      
    try {
        const existingUser = await User.findOne({ matric: req.body.matric}).exec()
        if (existingUser) {
            return res.status(401).json({
                error: "account alrady exists",
                success: false
            });
        }
        const user = new User({
            firstname,
            lastname,
            email,
            dob,
            level,
            matric,
            password,
            role
        });
        await user.save();
        return res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            error: "error while signing up",
            success: false
        });
    }
}

// const forgotPassword = async (req, res) => {
//     const { email } = req.body
//     try {
//         const user = await User.findOne({email}).exec();
//         if (!user) {
//             return
//         }
//     }
// }



module.exports = { signup, login }