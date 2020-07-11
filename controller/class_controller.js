const express = require("express");
const mongoose = require("mongoose");
const { Class } = require("../models/class");

// create a class
const createclass = async (req, res) => {
    const { name, Course, AcademicPeriod, Meeting, Population, UnavailableRooms } = req.body;

    try {
        const existingclass = await Class.findOne({ name: req.body.name }).exec();
        if (existingclass) {
            return res.status(401).json({
                message: "name already taken",
            });
        }

        const Xclass = new Class({
            name,
            Course,
            AcademicPeriod,
            Meeting,
            Population,
            UnavailableRooms
        });
        await Xclass.save()
        return res.json({
            success: true,
            data: class
      });
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error.',
            success: false
        });
    }
}
