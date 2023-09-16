const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    createdAt: {
         type: Date,
         default: Date.now 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }
});

const BLOG = mongoose.model('blog', blogSchema);

module.exports = BLOG;