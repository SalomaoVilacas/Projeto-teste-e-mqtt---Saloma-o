const userModel = {
    'id': {
        'type': Number,
        'required': true
    },
    'first_name': {
        'type': String,
        'required': true
    },
    'last_name': {
        'type': String,
        'required': true
    },
    'phone_number': {
        'type': String,
        'required': true
    }
};

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(userModel, {'versionKey': false});

mongoose.model('user', userSchema, 'user');