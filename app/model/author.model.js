'use strict'

const mongoose = require('mongoose');

const authorModel = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        nationality: String
    },
    {
        collection: 'authors'
    }
);

module.exports = mongoose.model('Author', authorModel);