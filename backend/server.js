const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");
const PORT = process.env.PORT || 9999;
const app = express();

// Initialize Axios and Cheerio
var axios = require("axios");

// Require all models
var db = require("./models/memes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("public"));
// }

// app.use(routes);

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/memedb"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});