const fs = require('fs');

module.exports = function(app) {

    let userDAO = app.dao.userDAO;
    let userDAOC = app.dao.userDAOC;

    app.post('/user', async function(req, res) {

        let user = req.body.user;
        let quant = req.body.quant;
        let inicio;
        let fim;
        let cont = 0;

        inicio = new Date().getTime();
        for(let i = 0; i < quant; i++) {
            await userDAOC.create(user);
        }
        fim = new Date().getTime();

        fs.appendFileSync('testeVelocidadeCassandra.txt', quant + ' ' + (fim - inicio) + '\n');

        user.id = 24;
        inicio = new Date().getTime();
        for(let i = 0; i < quant; i++) {
            await userDAO.create(user);
        }
        fim = new Date().getTime();

        fs.appendFile('testeVelocidadeMongo.txt', quant + ' ' + (fim - inicio) + '\n');
        console.log("OK");

        res.send("ok");
    });

    app.get('/user', function(req, res) {

        userDAO.read(function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                let users = [];

                for(let i = 0; i < result.length; i++) {
                    users.push(result[i].toObject());
                }

                for(let i = 0; i < users.length; i++) {
                    delete users[i]._id;
                }

                res.status(200).json({
                    "users": users
                });
            }
        });
    });

    app.patch('/user/:id', function(req, res) {

        let user = req.body;

        userDAO.update(req.params.id, user, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                console.log(result);
                res.status(200).json({
                    "id": result.id
                });
            }
        });
    });

    app.get('/user/:id', function(req, res) {

        userDAO.readById(req.params.id, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                let user = result.toObject();
                delete user._id;

                res.status(200).json(user);
            }
        });
    });

    app.delete('/user/:id', function(req, res) {

        userDAO.delete(req.params.id, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                res.status(204).send();
            }
        });
    });
};