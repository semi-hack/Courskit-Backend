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

const getEventsByDate = async (req, res) => {
  const { date1 } = req.headers

  try {
    const event = await Event.findOne({ date1: req.headers.date })
    if(event) {
      return res.status(200).json({
        success: true,
        data: event
      })
    } else {
      return res.status(404).json({
        error: "not found",
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: "there was an error.",
      success: false
    })
  }
}

const updateEvent = async (req, res) => {
  const { _id } = req.headers

  const existingEvent = await Event.findOne({ _id: req.headers._id })
  if (existingEvent) {
    res.status(401).json({
      message: "already exists",
    });
  } else {
    const updateEvent = await Event.findByIdAndUpdate(req.headers._id, {$set: req.body}, { new: true });
    if (!updateEvent) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: updateEvent
        });
    }

  }
}

const getUserEvents = async (req, res) => {
  const events = await Event.find({ });
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

module.exports = { createEvent, getEventsByDate, updateEvent, getUserEvents, deleteEvent };
