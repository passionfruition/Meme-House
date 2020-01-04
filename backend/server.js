const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data')

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
const router = express.Router();

//MongoDB
const dbRoute = 'mongodb://localhost:27017/memes';
//connecting back end code with DB
mongoose.connect(dbRoute, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

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

//CREATE METHOD
//this method adds new data in our DB
router.post('/addData', (req, res) => {
    let data = new Data();

    const { id, meme } = req.body;

    if ((!id && id !==0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS'
        });
    }
    data.meme = meme;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(PORT, () => console.log(`Connected to Router! Listening on port ${PORT}`));