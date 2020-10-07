const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/helper");



const signupAd = async (req, res) => {
    const {
      adminNumber,
      password,

    } = req.body;
  
    try {
      const existingAd = await Admin.findOne({ adminNumber: req.body.adminNumber }).exec();
      if (existingAd) {
        return res.status(401).json({
          error: "account alrady exists",
          success: false,
        });
      }
  
      const admin = new Admin({
        adminNumber,
        password,
      });
  
  
  
      await admin.save();
  
      return res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      return res.status(500).json({
        error: "error while signing up",
        success: false,
      });
    }
};


const adminlogin = async (req, res) => {
    const { adminNumber, password } = req.body;
    try {
      const admin = await Admin.findOne({ adminNumber: req.body.adminNumber }).exec();
      if (!admin) {
        return res.status(404).json({
          error: "user not found",
          success: false,
        });
      }
  
      admin.comparePassword(req.body.password, (err, match) => {
        if (!match) {
          return response
            .status(400)
            .send({ message: "The password is invalid" });
        }
      });
  
      return res.json({
        success: true,
        data: admin,
      });
    } catch (err) {
      return res.status(500).json({
        err: "error login in",
        success: false,
      });
    }
};

const getAdmin = async (req, res) => {
    try {
      const { adminNumber,password, } = req.body
      const admin = await Admin.findOne({ _id: decoded._id })
  
      if (!admin) {
        return res.status(404).json({
          message: "not found",
        });
      } else {
        res.status(200).json({
          message: "logged in",
          data: admin,
        });
      }
    } catch (err) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
};

module.exports = {
    signupAd,
    adminlogin,
    getAdmin
}