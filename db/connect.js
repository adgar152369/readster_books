const mongoose = require('mongoose');

const connectToDB = (uri) => {
    return mongoose.connect(uri)
        .then(console.log('Connected to MongoDB database!'));
}

module.exports = connectToDB;