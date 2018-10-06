const client = require('../../config/cassandra');
const uuid = require('uuid/v1');

module.exports = function() {

    let dao = {};

    dao.create = async function(user) {

        let query = "INSERT INTO user (id, first_name, last_name, phone_number) VALUES (" + uuid() + ", '" + user.first_name + "', '" + user.last_name + "', '" + user.phone_number + "')";

        return await client.execute(query);
    };

    dao.read = function(callback) {

        let query = "SELECT * FROM user";

        client.execute(query, callback);
    };

    dao.update = function(id, user, callback) {

        let query = "";

        client.execute();
    };

    dao.delete = function(id, callback) {

        let query = "";

        client.execute();
    };

    return dao;
};