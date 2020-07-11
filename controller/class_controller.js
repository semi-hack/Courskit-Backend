const express = require("express");
const mongoose = require("mongoose");
const Class = require("../models/class");

// CREATE a CLASS
const createRoom = async (req, res) => {
    const { name, c } = req.body;
  
    try {
      const existingroom = await Room.findOne({ name: req.body.name }).exec();
      if (existingroom) {
          return res.status(401).json({
            message: "name already taken",
          });
      }
  
      const room = new Room({
          name,
          capacity
      });
      await room.save()
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