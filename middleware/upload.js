const express = require("express");
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,fil,cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldame + '-' + Date.now() + path.extname(file.original))
    }
})

const upload = multer({
    storage:storage
})