module.exports = function(app) {

    let eventDAO = app.dao.eventDAO;
    let userDAO = app.dao.userDAO;

    app.post('/event', function(req, res) {

        let event = req.body;

        eventDAO.readByName(event.name, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                if(result) {
                    res.status(400).json({
                        "error": "já existe um evento com este nome"
                    });
                }else {
                    eventDAO.create(event, function(error, result) {

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

    app.get('/event', function(req, res) {

        eventDAO.read(function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                res.status(200).json({
                    "events": result
                });
            }
        });
    });

    app.patch('/event/:id', function(req, res) {

        let event = req.body;

        eventDAO.readByName(event.name, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                if(result) {
                    res.status(400).json({
                        "error": "já existe um evento com este nome"
                    });
                }else {
                    eventDAO.update(req.params.id, event, function(error, result) {

                        if(error) {
                            res.status(500).json({
                                "error": "erro no servidor"
                            });
                        }else {
                            res.status(200).json({
                                "id": result.id
                            });
                        }
                    });
                }
            }
        });
    });

    app.get('/event/:id', function(req, res) {

        eventDAO.readById(req.params.id, function(error, result) {

            if(error) {
                res.status(500).json({
                    "error": "erro no servidor"
                });
            }else {
                res.status(200).json(result);
            }
        });
    });

    app.delete('/event/:id', function(req, res) {

        eventDAO.delete(req.params.id, function(error, result) {

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