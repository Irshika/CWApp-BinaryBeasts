'use strict'

const express = require('express');

const Router = express.Router();

const Author = require('../model/author.model.js');

Router.get('/authors-list', (req, res) => {
    Author.find()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({error: err});
        })
});

module.exports = Router;