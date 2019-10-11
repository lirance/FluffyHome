const consola = require('consola');
const CONFIG = require('../app.config.js');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// remove DeprecationWarning
mongoose.set('useFindAndModify', false);


// mongoose Promise
mongoose.Promise = global.Promise;

// mongoose
exports.mongoose = mongoose;

// connect
exports.connect = () => {
    // console.log('CONFIG.MONGODB.uri :', CONFIG.MONGODB.uri)

    // connect database
    mongoose.connect(CONFIG.MONGODB.uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    });

    // connect failed
    mongoose.connection.on('error', error => {
        consola.warn('database connected failed!', error)
    });

    // connect success
    mongoose.connection.once('open', () => {
        consola.ready('database connected!')
    });

    // 自增 ID 初始化
    autoIncrement.initialize(mongoose.connection);

    // 返回实例
    return mongoose
};
