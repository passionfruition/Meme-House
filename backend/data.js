const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DB data structure
const DataSchema = new Schema(
    {
        meme: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// export new Schema to modify using Node.js
module.exports = mongoose.model('Meme', DataSchema);