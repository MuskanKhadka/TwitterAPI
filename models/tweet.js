const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
    },
    tweettext: {
        type: String,
    },
   userimage: {
        type: String
    },
    tweetimage: {
        type: String
    }


});

module.exports = mongoose.model('Tweet', userSchema);