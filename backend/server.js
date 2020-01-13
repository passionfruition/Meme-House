const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const Meme = require('./data.js');
const routes = require("./routes/index");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost:27017/memes';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let mdb = mongoose.connection;

mdb.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
mdb.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"))


// append /api for our http requests

// this is our get method
// this method fetches all available data in our database
// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });
// router.get('/api/data', function(req, res, next) {
//   db.find({}) 
//   .then(function(result) {
//     res.json(result);
//   })
//   .catch(function(error) {
//     res.json(error);
//   })
// });

app.get('/memes', function(req, res) {
  Meme.find({}, function(err, memes) {
    if(err) {
      res.send("errrror")
    }
    console.log("Success")
    res.json(memes);
  })
})

// router.get('/test', function(req, res, next) {
//   res.send('hi');
// })

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();
  console.log("TEST POST METHOD");

  const { meme } = req.body;

  if (!meme) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.meme = meme;
  data.save((err) => {
    console.log("post is ftested");
    if (err) return res.json({ success: false, error: err });
    return res.json({ data });
  });
});

app.use('/api', routes);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));