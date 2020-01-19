const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./backend/collections/data');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '/build', 'index.html'));
});

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost:27017/memes';
const MONGODB_URI = process.env.MONGODB_URI || dbRoute;

// connects our back end code with the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for getting all Memes from the db

app.get('/'), function (req,res) {
  res.render('root');
}

app.get('/api/memes', function(req, res) {
  Data.find({}, null, {sort: '-createdAt'}, function(err, memes) {
    if(err) {
      res.send("errrror")
    }
    console.log("Success")
    res.json(memes);
  })
})

app.get('/api/leaders', function(req, res) {
  Data.find({}, null, {sort: '-likes', limit: 5}, function(err, memes) {
    if(err) {
      res.send("errrror")
    }
    console.log("Success")
    res.json(memes);
  })
})

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
app.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(
    { _id: id }, 
    { likes: update })
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    res.json(err);
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

app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));