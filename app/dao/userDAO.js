const mongoose = require('mongoose');

module.exports = function(app) {

    let dao = {};
    const model = mongoose.model('user');

    dao.create = async function(user) {

        let result = await model.create(user);
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