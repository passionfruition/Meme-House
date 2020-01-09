const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DB data structure
const DataSchema = new Schema(
    {
        id: Number,
        meme: String
    },
    {
        timestamps: true
    }
);

// export new Schema to modify using Node.js
module.exports = mongoose.model('meme', DataSchema);