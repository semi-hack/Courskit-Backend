const express = require("express");
const mongoose = require("mongoose");
const { Room } = require("../models/room");
require('mongodb');

// create a Room
const createRoom = async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const existingroom = await Room.findOne({ name: req.body.name }).exec();
    if (existingroom) {
      return res.status(401).json({
        message: "name already taken",
      });
    }

    const room = new Room({
      name,
      capacity,
    });
    await room.save();
    return res.json({
      success: true,
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};

// get all rooms
const GetAllRooms = async (req, res) => {
  try{
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
    };
    const rooms = await Room.paginate({}, options);
    if (rooms) {
      return res.status(200).json({
        success: true,
        data: rooms,
      });
    } else {
      return res.status(404).json({
        error: "no rooms found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "error",
      success: false,
    });
  } 
};

//update a room
const updateRoom = async (req, res) => {
  const existingName = await Room.findOne({ name: req.body.name})
  if (existingName) {
    res.status(401).json({
      message: "name already exists",
    });
  } else {
    const UpdateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });
    if (!UpdateRoom) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: UpdateRoom
        });
    }

  }
}

// const updateRoom = async (req, res) => {

//   const room = await Room.findOne({ _id: req.params.id});
//   if (!room) {
//     res.status(400).json({
//       message: "failed to update",
//     });
//   } else {
//     if (existingName) {
//       res.status(401).json({
//         message: "name already exists",
//       });
//     } else {
//       room.update(
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.json({
//         success: true,
//         data: room
//       });
//     }
//   }
// };

// delete a room
const DeleteRoom = async (req, res) => {
  const { id } = req.headers;
  try {
    const data = await Room.findByIdAndDelete({ _id: req.headers.id });
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

module.exports = { createRoom, GetAllRooms, updateRoom, DeleteRoom };
