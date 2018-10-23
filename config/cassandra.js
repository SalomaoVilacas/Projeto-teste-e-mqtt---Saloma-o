const cassandra = require('cassandra-driver');
const client = new cassandra.Client({'contactPoints': ['localhost'], 'keyspace': 'test'});

module.exports = client;

// const cassandra = require('cassandra-driver');
// const databaseConstant = require('../resource/constant/database');

// const client = new cassandra.Client({'contactPoints': [databaseConstant.IP_DB], 'keyspace': databaseConstant.DB});

// module.exports = function() {

//     return client;
// };