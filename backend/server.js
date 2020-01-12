const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./data.js');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost:27017/memes';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

  const { meme } = req.body;

  if (!meme) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.meme = meme;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ data });
  });
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});