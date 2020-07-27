const express = require("express");
const mongoose = require("mongoose");
const { Room } = require("../models/room");

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

// get all rooms
const GetAllRooms = async (req, res) => {
  const rooms = await Room.find({});
  if (rooms) {
    return res.status(200).json({
        success: true,
        data: rooms });
  } else {
    return res.status(404).json({
      error: "no rooms found",
    });
  }
};


//update a room
const updateRoom = async (req, res) => {
    const UpdateRoom = await Room.findOneAndUpdate(req.params._id, {$set: reqbody});
    if (err) {
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

// delete a room
const DeleteRoom = async (req, res) => {

    const { id } = req.body;
    try {
        const data = await Room.findOneAndDelete({ _id: req.body.id});
        if (!data) {
            res.status(404).json({ success: false, message: 'not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

module.exports = { createRoom, GetAllRooms, updateRoom, DeleteRoom };
