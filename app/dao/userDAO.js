const mongoose = require('mongoose');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('user');

    dao.create = function(user, callback) {

        model.find({}, 'id', function(error, result) {

            if(error) {
                return callback(error, result);
            }else {
                let users = result;
                let greater = 0;

                for(let i = 0; i < users.length; i++) {
                    if(users[i].id > greater) {
                        greater = users[i].id;
                    }
                }

                user.id = greater + 1;
                model.create(user, callback);
            }
        });
    };

    dao.read = function(callback) {

        model.find({}, callback);
    };

    dao.update = function(id, user, callback) {

        model.update({'id': id}, user, function(error, result) {

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

        model.findOne({'id': id}, callback);
    };

    return dao;
};