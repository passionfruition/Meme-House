const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const MongoSessionStore = require("connect-mongo")(session);
const Data = require('./models/data.js');
const router = express.Router();
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const passport = require("./config/passport");

// connects our back end code with the database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/memes",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());


if (process.env.NODE_ENV === "production") {
  app.use(helmet.hsts()); //use https
}

if (process.env.NODE_ENV !== "production") {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

//Set up our session
const sessionConfig = {
  store: new MongoSessionStore({ mongooseConnection: mongoose.connection }), //this line says we're going to use the connection to the db we already have
  secret: "process.env.COOKIE_SECRET",
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: "/"
  },
  name: "id" //make session cookie name generic so it's harder to tell what tech we are using
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig.cookie.secure = true;  // serve secure cookies
  sessionConfig.cookie.httpOnly = true; // ensure front end js cannot touch cookie 
}

app.use(session(sessionConfig));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Route for getting all Memes from the db
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

// Define API routes here
const routes = require("./routes");
app.use(routes);
app.use('/api', router);

// Default behavior: send every unmatched route request to the React app (in production)
app.get("*", (req, res) => {
/*   if (process.env.NODE_ENV === "production") {
    return res.sendFile(path.join(__dirname, "./client/build/index.html"));
  } */
  res.sendStatus(404);
});



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));