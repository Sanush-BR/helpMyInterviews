const mongoose = require('mongoose');

const Google = mongoose.model('Google' , new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    year: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20 
    },
    resources: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    github_Profile: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    linkedIn_Profile: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }

}));

module.exports.Google = Google;