const userModel = {
    'id': {
        'type': Number,
        'required': true
    },
    'name': {
        'type': String,
        'required': true
    }
};

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(userModel, {'versionKey': false});

mongoose.model('user', userSchema, 'user');