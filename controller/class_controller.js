const express = require("express");
const mongoose = require("mongoose");
const { Klass } = require("../models/class");

// create a class
const createclass = async (req, res) => {
  const {
    name,
    Courses,
    AcademicPeriod,
    Meeting,
    Population,
    UnavailableRooms,
  } = req.body;

  try {
    const existingclass = await Klass.findOne({ name: req.body.name }).exec();
    console.log(req.body.name);
    if (existingclass) {
      return res.status(401).json({
        message: "name already taken",
      });
    }

    const classes = new Klass({
      name,
      Courses,
      AcademicPeriod,
      Meeting,
      Population,
      UnavailableRooms,
    });
    await classes.save();

    const data = await Klass.findOne({ name: req.body.name }).populate(
      "Courses"
    );

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};

const getClass = async (req, res) => {
  const { page, perPage, searchQuery } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    populate: [{path: "Courses"}, {path: "AcademicPeriod"}]
  };
  const classes = await Klass.paginate({ name:  new RegExp(`^${searchQuery}`)}, options)

  if (classes) {
    return res.status(200).json({
      success: true,
      data: classes,
    });
  } else {
    return res.status(404).json({
      error: "no class found",
    });
  }
};

const UpdateClass = async (req, res) => {
  const { _id } = req.headers;
  const existingclass = await Klass.findOne({ name: req.body.name }).exec();
  if (existingclass) {
    return res.status(401).json({
      message: "name already taken",
    });
  } else {
    const UpdatedClass = await Klass.findByIdAndUpdate(
      req.headers._id,
      { $set: req.body },
      { new: true }
    );
    if (!UpdatedClass) {
      res.status(400).json({
        message: "failed to update",
      });
    } else {
      res.json({
        success: true,
        message: UpdatedClass,
      });
    }
  }
};

const DeleteClass = async (req, res) => {
  const { _id } = req.headers;
  try {
    const data = await Klass.findOneAndDelete({ _id: req.headers._id });
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

module.exports = { createclass, getClass, UpdateClass, DeleteClass };
