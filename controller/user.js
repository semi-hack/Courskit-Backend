const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/helper");
const { transporter } = require("../config/nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { nextTick } = require("process");
const { error } = require("console");
const { use } = require("bcrypt/promises");
//const { doesNotMatch } = require("assert");

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

    const token = jwt.sign({ _id: user._id }, secret);
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
    const user = await User.findOne({
      adminNumber: req.body.adminNumber,
    }).exec();
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
    await user.save().then((user) => {
      transporter.sendMail({
        to: user.email,
        from: "semilooreakinlo@gmail.com",
        subject: "sign-up success",
        html: "<h1> welcome </h1>",
      });
    });
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
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(422).json("user does not exist");
      }
      transporter.sendMail({
        to: user.email,
        from: "asemiloore@gmail.com",
        subject: "password-reset",
        html: `<p> your password reset <p>
            <h5> click on <a href="http://localhost:5000/reset/${token}>link</a>`,
      });
      res.json({ message: "check mail" });
      return user.updateOne({ resetToken: token }, (err, success) => {
        if (err) {
          return res.status(400).json({ error: "USER DOESNT EXIST" });
        }
      });
    });
  });
};

const resetPassword = (req, res) => {
  const { resetToken, newpassword } = req.body;
  User.findOne({ restToken: req.body.restToken })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "try again token expired" });
      }
      bcrypt.hash(newpassword, 10).then((hashedpassword) => {
        user.password = hashedpassword;
        user.restToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated", data: saveduser });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  const token = req.headers.token;
  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    User.findOne({ _id: decoded._id }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user granted",
        user,
      });
    });
  });
};

// const checkExistence = async (req, res) => {
//   const {email, matric} = req.body
//   try {
//     if(req.body.matric == )
//   }
// }

module.exports = { signup, login, forgotPassword, resetPassword, getUser };
