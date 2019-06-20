'use strict'

const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Book = require('../model/book.model');

Router.get('/all-books', (req, res) => {
    Book.find()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({error: err});
        })
});

Router.post('/new-book', (req, res) => {
    const book = new Book({
        name: req.body.name,
        ISBN: req.body.isbn,
        author: req.body.author,
        price: req.body.price,
        year: req.body.year,
        publisher: req.body.publisher
    });

    book.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

Router.get('/get-books', (req, res) => {
    const query = {
        author: req.body.author
    }
    Book.find(query)
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({error: err});
        })
});

module.exports = Router;