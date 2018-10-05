const mongoose = require('mongoose');

const eventModel = {
    'id': {
        'type': Number,
        'required': true
    },
    'name': {
        'type': String,
        'required': true
    },
    'ownerId': {
        'type': Number,
        'required': true
    }
};

const eventSchema = mongoose.Schema(eventModel, {'versionKey': false});

mongoose.model('event', eventSchema, 'event');