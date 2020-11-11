const express = require("express");
const mongoose = require("mongoose");
const Lecturer = require("../models/lecturer");

const createLecturer = async (req, res) => {
  // const {
  //     name,
  //     email,
  //     unavailablePeriods,
  //     courses,
  //     education_bg,
  //     phone_no,
  //     office_no,
  //     ranking,
  //     degree,
  //     areaOfSpec

  // } = req.body

  const lecturer = await Lecturer.create({
    name: req.body.name,
    email: req.body.email,
    unavailablePeriods: req.body.unavailablePeriods,
    courses: req.body.courses,
    education_bg: req.body.education_bg,
    phone_no: req.body.phone_no,
    office_no: req.body.office_no,
    ranking: req.body.ranking,
    degree: req.body.degree,
    areaOfSpec: req.body.areaOfSpec,
    image: req.file.path,
  });

  if (!lecturer) {
    res.status(400).json({
      success: false,
      message: "lecturer not created",
    });
  }
  res.json({
    success: true,
    message: "lecturer created",
    data: lecturer,
  });
};

const getAllLecturer = async (req, res) => {
  try {
    const { page, perPage, searchQuery } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 50) || 50,
      populate: [{path: 'Courses'}]
    };
    const data = await Lecturer.paginate({ name:  new RegExp(`^${searchQuery}`, "i")}, options);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getLecturerById = async (req, res) => {
  const { id } = req.body;

  try {
    const data = await Lecturer.findOne({ _id: req.body.id });
    if (!data) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const UpdateLecturer = async (req, res) => {
  const { _id } = req.headers;
  const UpdatedLecturer = await Lecturer.findByIdAndUpdate(
    req.headers._id,
    { $set: req.body },
    { new: true }
  );
  if (!UpdatedLecturer) {
    res.status(400).json({
      message: "failed to update",
    });
  } else {
    res.json({
      success: true,
      message: UpdatedLecturer,
    });
  }
};

const UploadImage = async (req, res) => {
  console.log(req.file);
  const image = {};
  const UpdatedLecturerImage = await Lecturer.findByIdAndUpdate(
    req.headers._id,
    { $set: { image: req.file.path } }
  );
  if (!UpdatedLecturerImage) {
    res.status(400).json({
      message: "failed",
    });
  } else {
    res.json({
      success: true,
      message: UpdatedLecturerImage,
    });
  }
};

// "name": req.body.name,
//         "email": req.body.email,
//         "education_bg": req.body.education_bg,
//         "phone_no": req.body.phone_no,
//         "office_no": req.body.office_no,
//         "ranking": req.body.ranking,
//         "degree": req.body.degree,
//         "areaOfSpec": req.body.areaOfSpec,
//         "Courses": req.body.Courses

const lecturerUpdate = async (req, res) => {
  const { _id } = req.headers;
  const image = {};
  console.log(req.body);

  const CompleteUpdate = await Lecturer.findByIdAndUpdate(
    req.headers._id,
    {
      $set: { 
        "image" : req.file.path,
        "name": req.body.name,
        "email": req.body.email,
        "education_bg": req.body.education_bg,
        "phone_no": req.body.phone_no,
        "office_no": req.body.office_no,
        "ranking": req.body.ranking,
        "degree": req.body.degree,
        "areaOfSpec": req.body.areaOfSpec,
        "Courses": req.body.Courses
     }
    },
    { new: true }
  );

  if (!CompleteUpdate) {
    res.status(400).json({
      message: "failed",
    });
  } else {
    res.
      json({
        success: true,
        data: CompleteUpdate,
      });
  }
};

// reset password lecturer
const resetPasswordwithOldPassword = async (req, res) => {
  const { _id } = req.headers;
  const { oldPassword, newPassword } = req.body;

  try {
    const lecturer = await Lecturer.findOne({ _id: req.headers._id }).exec();
    if (!lecturer) {
      return res.status(401).json({
        success: false,
        error: "lecturer doesnt exist",
      });
    }

    lecturer.comparePassword(req.body.oldPassword, (err, match) => {
      if (!match) {
        return res
          .status(400)
          .json({ success: false, message: "The password is invalid" });
      }
    });

    lecturer.password = newPassword;
    await lecturer.save();

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

// delete a lecturer
const Deletelecturer = async (req, res) => {
  const { _id } = req.headers;
  try {
    const data = await Lecturer.findOneAndDelete({ _id: req.headers._id });
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
  createLecturer,
  getAllLecturer,
  getLecturerById,
  UpdateLecturer,
  UploadImage,
  lecturerUpdate,
  Deletelecturer,
};
