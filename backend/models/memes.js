const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DB data structure
const DataSchema = new Schema({
    meme: {
        type: String,
        required: true,
        timestamps: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
});

// export new Schema to modify using Node.js
module.exports = mongoose.model('Meme', DataSchema);