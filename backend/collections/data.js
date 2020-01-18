const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DB data structure
const MemeSchema = new Schema(
    {
        meme: {
            type: String,
            required: true
        },
        usersWhoLiked: {
            type: Array,
            default: []
        },
        totalLikes: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// export new Schema to modify using Node.js
module.exports = mongoose.model('Meme', MemeSchema);