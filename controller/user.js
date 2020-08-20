const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/helper");
const { transporter } = require("../config/nodemailer");
const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
var _ = require('lodash');
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

    await user.save();
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
    const token = nanoid('1234567890abcdefghijklmnopqrstuvwxyz', 5);
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(422).json("user does not exist");
      }
      transporter.sendMail({
        to: user.email,
        from: "testd20202@gmail.com",
        subject: "Password-Reset",
        html: `<p><h1>Password Reset</h1> <p>
            <h4> Your reset code is:   ${token}</h4><br>
            <h5>Use this code to reset your password. This code should not be shared</h5><br>`,
      });
      console.log(token)
      res.json({ message: "check mail" });
      return user.updateOne({ resetToken: token }, (err, success) => {
        if (err) {
          return res.status(400).json({ error: "USER DOESNT EXIST" });
        }
      });
    });
};

const resetPassword = (req, res) => {
  const { resetToken, newpassword } = req.body
  User.findOne({ resetToken: req.body.resetToken }, (err, user) => {
    if(!user) {
      return res.status(422).json({ error: "wrong token" })
    }
    console.log(user)
    
    const obj = {
      password: newpassword,
      resetToken: ''
    }

    user = _.extend(user, obj);
    user.save((err, result) => {
      if(err) {
        return res.status(400).json({error: "reset password error"});
      } else {
        return res.status(200).json({message: "password has been changed"})
      }
    });
  });
};

const resetPasswordwithOldPassword = (req, res) => {
  const { _id, oldPassword, newpassword } = req.body
  User.findOne({ _id: req.body._id }, (err, user) => {
    if(!user) {
      return res.status(422).json({ error: "wrong token" })
    }
    
    user.comparePassword(req.body.password, (err, match) => {
      if (!match) {
        return response
          .status(400)
          .send({ message: "The password is invalid" });
      }
    });
    
    const obj = {
      password: newpassword,
    }

    user = _.extend(user, obj);
    user.save((err, result) => {
      if(err) {
        return res.status(400).json({error: "reset password error"});
      } else {
        return res.status(200).json({message: "password has been changed"})
      }
    });
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

// Update User
const UpdateUser = async (req, res) => {
  const { _id } = req.headers
  const UpdatedUser = await User.findByIdAndUpdate(req.headers._id, {$set: req.body});
  if (!UpdatedUser) {
      res.status(400).json({
          message: "failed to update"
      });
  } else {
      res.json({
          success: true,
          message: UpdatedUser
      });
  }

}

const UpdateUserImage = async (req, res) => {
  console.log(req.file)
  const image = {}
  const UpdatedUserImage = await User.findByIdAndUpdate(req.headers._id, {$set: {"image": req.file.path}});
  if (!UpdatedUserImage) {
      res.status(400).json({
          message: "failed"
      });
  } else {
      res.json({
          success: true,
          message: UpdatedUserImage
      });
  }

}

// add courses to user
const RegisterCourse = async (req, res) => {
  const { _id } = req.headers
  const UpdatedUser = await User.findByIdAndUpdate(req.headers._id, {$set: req.body}).populate({ 
    path:'courses', populate: [{path: 'lecturer', model: 'Lecturer'}, {path: 'venue', model: 'room'}]
  });
  if (!UpdatedUser) {
      res.status(400).json({
          message: "failed to update"
      });
  } else {
      res.json({
          success: true,
          message: UpdatedUser.courses
      });
  }
}

const checkExistence = async (req, res) => {
  const { email } = req.body
  var mtu = /\w+@+mtu.edu.ng/
  try {
    if(mtu.test(req.body.email) == true ) {
      return res.json({
        success: true,
        data: "https://res.cloudinary.com/duqphnggn/image/upload/v1596850732/mtu_ljd7ex.jpg"
      })
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (err) {
    return res.status(500).json({
      err: "error login in",
      success: false,
    });
  }
}

module.exports = { signup, login, forgotPassword, resetPassword, getUser, UpdateUser, UpdateUserImage, RegisterCourse, checkExistence, resetPasswordwithOldPassword };
