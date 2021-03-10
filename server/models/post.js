const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    content: {
        type: {},
        min: 3,
        max: 160,
        required: true
    },
    user: {
        type: String,
        defult:'Admin' 
    }
});

module.exports = mongoose.model('Post', postSchema);    