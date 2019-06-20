'use strict'

const mongoose = require('mongoose');

const bookModel = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    year:{
        type: Number
    },
    publisher:{
        type: String
    }
})

module.exports = mongoose.model('Book', bookModel);