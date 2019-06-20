'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');

const app = express();
const PORT = 5000;

const bundler = new Bundler('./public/index.html');

const bookRoute = require('./app/api/book.controller');
const authorRoute = require('./app/api/authors.controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connect to DB
mongoose.connect('mongodb://localhost:27017/af-17', {useNewUrlParser: true})
    .then(() => console.log("Connected to DB."))
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });

app.use('/api/books', bookRoute);
app.use('/api/authors', authorRoute);

app.use(bundler.middleware());

app.use(express.static('./dist'));

app.get('/', (req, res) => {
   res.sendFile('./dist/index.html');
});

//Start server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }

    console.log("Server is up and listening in port " + PORT);
})