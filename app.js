const app = require('./config/express')();

require('./config/database')('localhost:27017/iotech');
require('./config/cassandra')();

app.listen(3000, function() {

    console.log("IOTECH service running on port: " + 3000);
});