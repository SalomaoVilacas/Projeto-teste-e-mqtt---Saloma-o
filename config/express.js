const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');

module.exports = function() {

    let app = express();

    app.set('secret', 'iotechSecret');

    app.use(bodyParser.json({
        'limit': '10mb'
    }));
    app.use(bodyParser.urlencoded({
        'limit': '10mb',
        'extended': true
    }));
    app.use(cors());

    consign({'cwd': 'app'})
    .include('model')
    .then('dao')
    .then('route')
    .into(app);

    return app;
};