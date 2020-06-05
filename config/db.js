const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Timetable'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

mongoose.connect(url, options);
