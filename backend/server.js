const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data')

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//MongoDB
const dbRoute = 'mongodb://memes';

//connects out back end with db
mongoose.connect(dbRoute, {useNewUrlParser: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to Mongo. Welcome to the Memes'));

//checks if connection with db is successful
db.on('error', console.error.bind(console, 'mongoDB connection error'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//GET METHOD
//fetches all available data in our DB
router.get('/getData', (req, res) => {
    Data.find((err,data) => {
        if(err) return res.json({success: false, error: err});
    });
});

//DELETE METHOD
//this method removes existing data in our DB
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if(err) return res.send(err);
        return res.json({ success:true });
    });
});