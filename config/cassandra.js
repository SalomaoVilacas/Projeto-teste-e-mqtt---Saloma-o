const cassandra = require('cassandra-driver');
const client = new cassandra.Client({'contactPoints': ['ec2-18-224-185-89.us-east-2.compute.amazonaws.com'], 'keyspace': 'test' });

module.exports = function() {
 
    const query = 'SELECT * FROM users';
    client.execute(query, ['someone'])
        .then(result => console.log(result));
}