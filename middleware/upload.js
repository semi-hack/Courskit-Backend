const express = require("express");
const path = require('path')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')

cloudinary.config({
    cloud_name: "duqphnggn",
    api_key: "648338731742227",
    api_secret: "a1vPBeYwCS4jtzF1xLKYw2E-tig"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'jomwedding',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
const parser = multer({ storage: storage });


module.exports = { parser }