const mongoose = require('mongoose');
const URI = "mongodb+srv://admin:admin@cluster0-nncaq.mongodb.net/<dbname>?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const connectDB = async () => {
    await mongoose.connect(URI, options);
    console.log('DB connected...!')
}


module.exports = connectDB;
