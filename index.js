const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const router = require('./routes/routes');

const app = express()
connectDB();
require('dotenv').config();
const PORT = process.env.PORT || 4040

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})