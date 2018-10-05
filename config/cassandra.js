const cassandra = require('cassandra-driver');
const client = new cassandra.Client({'contactPoints': ['localhost'], 'keyspace': 'test' });

module.exports = function() {

    const query = 'SELECT * FROM user';

    client.execute(query, function (error, result) {

        if(!error) {
            if(result.rows.length > 0) {
                var users = [];

                result.rows.forEach(user => {

                    users.push(user);
                });

                console.log(JSON.stringify({'users': users}));
            }else {
                console.log("Sem usuários cadastrados no banco");
            }
        }else {
            console.log(error);
        }
    });
}