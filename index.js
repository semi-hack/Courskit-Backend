const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const router = require('./routes/routes');

const app = express()

const PORT = 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})