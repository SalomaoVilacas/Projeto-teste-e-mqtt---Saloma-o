module.exports = function(app) {

    let userDAO = app.dao.userDAO;

    app.post('/user', function(req, res) {

        let user = req.body;

        userDAO.readByName(user.name, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                if(result) {
                    res.status(400).json({
                        "error": "já existe um usuário com este nome"
                    });
                }else {
                    userDAO.create(user, function(error, result) {

                        console.log(error);
                        if(error) {
                            res.status(500).json({
                                "error": "erro no servidor"
                            });
                        }else {
                            res.status(201).json({
                                "id": result.id
                            });
                        }
                    });
                }
            }
        });
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