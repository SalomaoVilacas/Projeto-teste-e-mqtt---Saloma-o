const mongoose = require('mongoose');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('event');

    dao.create = function(event, callback) {

        model.find({}, 'id', function(error, result) {

            if(error) {
                return callback(error, result);
            }else {
                let events = result;
                let greater = 0;

                for(let i = 0; i < events.length; i++) {
                    if(events[i].id > greater) {
                        greater = events[i].id;
                    }
                }

                event.id = greater + 1;
                model.create(event, callback);
            }
        });
    };

    dao.read = function(callback) {

        model.find({}, async function(error, result) {

            if(error) {
                return callback(error, result);
            }else {
                let events = [];

                for(let i = 0; i < result.length; i++) {
                    events.push(result[i].toObject());
                }

                for(let i = 0; i < events.length; i++) {
                    await mongoose.model('user').findOne({'id': events[i].ownerId}, function(error, result) {

                        if(error) {
                            return callback(error, result);
                        }else {
                            if(result) {
                                events[i].owner = result.name;
                            }else {
                                events[i].owner = "usuario nao encontrado";
                            }
                            delete events[i].ownerId;
                            delete events[i]._id;
                        }
                    });
                }

                return callback(error, events);
            }
        });
    };

    dao.update = function(id, event, callback) {

        model.update({'id': id}, event, function(error, result) {

            if(error) {
                return callback(error, result);
            }else {
                model.findOne({'id': id}, callback);
            }
        });
    };

    dao.delete = function(id, callback) {

        model.remove({'id': id}, callback);
    };

    dao.readByName = function(name, callback) {

        model.findOne({'name': name}, callback);
    };

    dao.readById = function(id, callback) {

        model.findOne({'id': id}, async function(error, result) {

            if(error) {
                callback(error, result);
            }else {
                let event = result.toObject();

                await mongoose.model('user').findOne({'id': event.ownerId}, function(error, result) {

                    if(error) {
                        callback(error, result);
                    }else {
                        if(result) {
                            event.owner = result.name;
                        }else {
                            event.owner = "usuario nao encontrado";
                        }
                        delete event.ownerId;
                        delete event._id;
                    }
                });

                callback(error, event);
            }
        });
    };

    return dao;
};