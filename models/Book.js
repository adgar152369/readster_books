const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide a title'],
        trim: true
    },
    author: {
        type: String,
        default: 'Unkown',
        trim: true
    },
    year: {
        type: String,
        required: true,
        default: "Unknown"
    },
    edition: {
        type: String,
        default: "First Edition"
    },
    hasRead: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookSchema);