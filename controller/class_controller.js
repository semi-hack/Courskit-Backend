const express = require("express");
const mongoose = require("mongoose");
const Class = require("../models/class");

// CREATE a CLASS
const createClass = async (req, res) => {
    const { name, Course, AcademicPeriod, Meeting, Population, UnavailableRooms } = req.body;
  
    try {
      const existingclass = await Class.findOne({ name: req.body.name }).exec();
      if (existingclass) {
          return res.status(401).json({
            message: "name already taken",
          });
      }

      const class = new Class({
          name,
          Course,
          AcademicPeriod,
          Meeting,
          Population,
          UnavailableRooms
      });
     
      await class.save()
      return res.json({
          success: true,
          data: room
      });
    } catch (error) {
      return res.status(500).json({
          error: 'There was an error.',
          success: false
      });
    }
}