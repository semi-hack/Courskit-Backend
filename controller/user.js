const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Notifications = require("../models/user");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/helper");
const { transporter } = require("../config/nodemailer");
const { nanoid, customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const Pusher = require("pusher");
var _ = require("lodash");
const { nextTick } = require("process");
const { error } = require("console");
const { use } = require("bcrypt/promises");
const { json } = require("express");
const Socket  = require("../index");
require("dotenv").config();

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_APP_KEY,
//   secret: process.env.PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_APP_CLUSTER,
// });

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

const signup = async (req, res) => {

  try {
    const existingUser = await User.findOne({ matric: req.body.matric }).exec();
    if (existingUser) {
      return res.status(401).json({
        error: "account alrady exists",
        success: false,
      });
    }
    const course = await Course.find({ level: req.body.level })
      .populate("venue")
      .populate("lecturer");
    console.log(course);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dob: req.body.dob,
      level: req.body.level,
      matric: req.body.matric,
      password: req.body.firstname,
      role: req.body.role,
      courses: course,
      image: req.file.path
    });


    await user.save();
    global.io.emit("newUser", user);
    console.log("newUser", user)

    // pusher.trigger(
    //   "notifications",
    //   "newUser",
    //   user,
    //   req.headers["x-socket-id"]
    // );
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
}


// module.exports = (io) => {
//   return {
//     signup : async (req, res) => {
//       const {
//         firstname,
//         lastname,
//         email,
//         dob,
//         level,
//         matric,
//         password,
//         role,
//       } = req.body;
    
//       try {
//         const existingUser = await User.findOne({ matric: req.body.matric }).exec();
//         if (existingUser) {
//           return res.status(401).json({
//             error: "account alrady exists",
//             success: false,
//           });
//         }
//         const course = await Course.find({ level: req.body.level })
//           .populate("venue")
//           .populate("lecturer");
//         console.log(course);
    
//         const user = new User({
//           firstname,
//           lastname,
//           email,
//           dob,
//           level,
//           matric,
//           password,
//           role,
//           courses: course,
//         });
    
    
//         await user.save();
//         global.io.emit("newUser", user);
//         console.log("newUser", user)

//         // pusher.trigger(
//         //   "notifications",
//         //   "newUser",
//         //   user,
//         //   req.headers["x-socket-id"]
//         // );
//         return res.status(200).json({
//           success: true,
//           data: user,
//         });
//       } catch (error) {
//         return res.status(500).json({
//           error: "error while signing up",
//           success: false,
//         });
//       }
//     }
//   }
// }



const forgotPassword = (req, res) => {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
  const token = nanoid();
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
    console.log(token);
    res.json({ message: "check mail" });
    return user.updateOne({ resetToken: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: "USER DOESNT EXIST" });
      }
    });
  });
};

const resetPassword = (req, res) => {
  const { resetToken, newpassword } = req.body;
  User.findOne({ resetToken: req.body.resetToken }, (err, user) => {
    if (!user) {
      return res.status(422).json({ error: "wrong token" });
    }
    console.log(user);

    const obj = {
      password: newpassword,
      resetToken: "",
    };

    user = _.extend(user, obj);
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: "reset password error" });
      } else {
        return res.status(200).json({ message: "password has been changed" });
      }
    });
  });
};

const resetPasswordwithOldPassword = async (req, res) => {
  const { _id } = req.headers;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: req.headers._id }).exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "invalid user",
      });
    }

    user.comparePassword(req.body.oldPassword, (err, match) => {
      if (!match) {
        return res
          .status(400)
          .json({ success: false, message: "The password is invalid" });
      }
    });

    user.password = newPassword;
    await user.save();

    return res.json({
      message: "password updated succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: "There was an error",
      success: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.token;

    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ _id: decoded._id }).populate({
      path: "courses",
      populate: [
        { path: "lecturer", model: "Lecturer" },
        { path: "venue", model: "room" },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    } else {
      res.status(200).json({
        title: "user granted",
        message: "user is logged in",
        data: user,
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

// get all courses
const GetAllUsers = async (req, res) => {
  const users = await User.find({}).populate({
    path: "courses",
    populate: [
      { path: "lecturer", model: "Lecturer" },
      { path: "venue", model: "room" },
    ],
  });

  if (users) {
    return res.status(200).json({
      success: true,
      data: users,
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

// Update User
const UpdateUser = async (req, res) => {
  const { _id } = req.headers;
  const existingUser = await User.findOne({ matric: req.body.matric }).exec();
  if (existingUser) {
    return res.status(401).json({
      error: "account alrady exists",
      success: false,
    });
  } else {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.headers._id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate({
      path: "courses",
      populate: [
        { path: "lecturer", model: "Lecturer" },
        { path: "venue", model: "room" },
      ],
    });
    if (!UpdatedUser) {
      res.status(400).json({
        message: "failed to update",
      });
    } else {
      res.json({
        success: true,
        data: UpdatedUser,
      });
    }
  }  
};

const combinedUpdate = async (req, res) => {
  const { _id } = req.headers;
  const image = {};
  console.log(req.body);

  const CompleteUpdatedUser = await User.findByIdAndUpdate(
    req.headers._id,
    {
      $set: { "image" : req.file.path, "lastname": req.body.lastname, "firstname": req.body.firstname, "email": req.body.email }
    },
    { new: true }
  );

  if (!CompleteUpdatedUser) {
    res.status(400).json({
      message: "failed",
    });
  } else {
    res.
      json({
        success: true,
        data: CompleteUpdatedUser,
      });
  }
};

const UpdateUserImage = async (req, res) => {
  console.log(req.file);
  const image = {};
  const UpdatedUserImage = await User.findByIdAndUpdate(
    req.headers._id,
    {
      $set: { image: req.file.path },
    },
    { new: true }
  );
  if (!UpdatedUserImage) {
    res.status(400).json({
      message: "failed",
    });
  } else {
    res.json({
      success: true,
      data: UpdatedUserImage,
    });
  }
};

// add courses to user
const RegisterCourse = async (req, res) => {
  const { _id } = req.headers;
  const UpdatedUser = await User.findByIdAndUpdate(
    req.headers._id,
    { $set: req.body },
    { new: true }
  ).populate({
    path: "courses",
    populate: [
      { path: "lecturer", model: "Lecturer" },
      { path: "venue", model: "room" },
    ],
  });
  if (!UpdatedUser) {
    res.status(400).json({
      message: "failed to update",
    });
  } else {
    res.json({
      success: true,
      data: UpdatedUser,
    });
  }
};

const checkExistence = async (req, res) => {
  const { email } = req.query;
  var mtu = /\w+@+mtu.edu.ng/;
  try {
    if (mtu.test(req.query.email) == true) {
      return res.json({
        success: true,
        data:
          "https://res.cloudinary.com/duqphnggn/image/upload/v1596850732/mtu_ljd7ex.jpg",
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      err: "error login in",
      success: false,
    });
  }
};

const DeleteStudent = async (req, res) => {
  const { _id } = req.headers;
  try {
    const data = await User.findOneAndDelete({ _id: req.headers._id });
    if (!data) {
      res.status(404).json({ success: false, message: "not found" });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  GetAllUsers,
  UpdateUser,
  combinedUpdate,
  UpdateUserImage,
  RegisterCourse,
  checkExistence,
  resetPasswordwithOldPassword,
  DeleteStudent,
};
