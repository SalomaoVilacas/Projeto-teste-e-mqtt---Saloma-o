const app = require('./config/express')();

require('./config/database')('localhost:27017/iotech');

app.listen(3000, function() {

    console.log("IOTECH service running on port: " + 3000);
});