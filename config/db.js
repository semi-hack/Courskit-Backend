const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const URI = "mongodb+srv://admin:admin@cluster0-nncaq.mongodb.net/<dbname>?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const connectDB = async () => {

    if (process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose)

        mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(URI, options);
            console.log('DB connected...!')
         }) 

    } else {
        await mongoose.connect(URI, options);
        console.log('DB connected...!')
    }

}


module.exports = connectDB;
