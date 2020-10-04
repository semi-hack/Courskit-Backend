const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/event");
require("mongodb");

const createEvent = async (req, res) => {
  const { user, name, date, time } = req.body;

  try {
    const event = new Event({
      user,
      name,
      date,
      time
    });
    await event.save();
    return res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};

const getUserEvents = async (req, res) => {
  const { _id } = req.headers;
  const events = await Event.find({ user: req.headers._id });
  if (events) {
    return res.status(200).json({
      success: true,
      data: events,
    });
  } else {
    return res.status(404).json({
      error: "no events found",
    });
  }
};

const deleteEvent = async (req, res) => {
    const { _id } = req.headers;
    try {
        const data = await Event.findByIdAndDelete({ _id: req.headers._id });
        if (!data) {
          res.status(404).json({ success: false, message: "not found" });
          return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createEvent, getUserEvents, deleteEvent };
