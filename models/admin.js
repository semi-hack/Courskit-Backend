const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10

const AdminSchema = new Schema({
    adminNumber: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String,
        default: ''
    }
})

AdminSchema.pre('save', async function save(next) {
    //if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

AdminSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
}

const Admin = mongoose.model('Admin', AdminSchema);

module.exports =  Admin