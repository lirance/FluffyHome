const crypto = require('crypto');
const { argv } = require('yargs');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

const adminSchema = new mongoose.Schema({
    // name
    name: { type: String, required: true, default: '' },

    //user type 0：manager，1：other users
    type: { type: Number, required: true, default: 1 },

    // phone
    phone: { type: Number, required: true, default: '' },

    // email
    email: { type: String,  required: true, default: '' },

    // password
    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update(argv.auth_default_password || 'root')
            .digest('hex'),
    },

    // create time
    create_time: { type: Date, default: Date.now },

    // last modify date
    update_time: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', adminSchema);
