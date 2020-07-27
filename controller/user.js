const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/helper");
const { transporter } = require("../config/nodemailer");
const crypto = require("crypto");
const { doesNotMatch } = require("assert");

const login = async (req, res) => {
  const { matric, password } = req.body;
  try {
    const user = await User.findOne({ matric: req.body.matric }).exec();
    if (!user) {
      return res.status(404).json({
        error: "user not found",
        success: false,
      });
    }

    user.comparePassword(req.body.password, (err, match) => {
      if (!match) {
        return response
          .status(400)
          .send({ message: "The password is invalid" });
      }
    });

    const token = jwt.sign({ matric: user.matric }, secret);
    return res.json({
      success: true,
      data: token,
    });
  } catch (err) {
    return res.status(500).json({
      err: "error login in",
      success: false,
    });
  }
};

const adminlogin = async (req, res) => {
  const { adminNumber, password } = req.body;
  try {
    const user = await User.findOne({ adminNumber: req.body.adminNumber }).exec();
    if (!user) {
      return res.status(404).json({
        error: "user not found",
        success: false,
      });
    }

    user.comparePassword(req.body.password, (err, match) => {
      if (!match) {
        return response
          .status(400)
          .send({ message: "The password is invalid" });
      }
    });

    const token = jwt.sign({ matric: user.matric }, secret);
    return res.json({
      success: true,
      data: token,
    });
  } catch (err) {
    return res.status(500).json({
      err: "error login in",
      success: false,
    });
  }
};

const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    dob,
    level,
    matric,
    password,
    role,
  } = req.body;

  try {
    const existingUser = await User.findOne({ matric: req.body.matric }).exec();
    if (existingUser) {
      return res.status(401).json({
        error: "account alrady exists",
        success: false,
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
      role,
    });
    await user.save()
    .then(user=> {
        transporter.sendMail({
            to:user.email,
            from:"semilooreakinlo@gmail.com",
            subject:"sign-up success",
            html: "<h1> welcome </h1>"
        })
    })
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while signing up",
      success: false,
    });
  }
};


const forgotPassword = (req, res) => {
    crypto.randomBytes(32,(err, buffer) => {
        if(err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(422).json("user does not exist")
            }
            user.restToken = token
            //user.expireToken = Date.now + 360000
            user.save().then((result) => {
                transporter.sendMail({
                    to:user.email,
                    from:"asem@test.com",
                    subject:"password-reset",
                    html: `<p> your password reset <p>
                    <h5> click on <a href="http://localhost:5000/reset/${token}>link</a>`
                })
                res.json({message: "check mail"})
            })
        })
    })
}

module.exports = { signup, login, forgotPassword };
