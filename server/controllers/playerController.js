const db = require ('../models/playerModels');

const playerController = {};

playerController.updatePlayer = ( req, res, next) => {
    const charString = 'SELECT * FROM scores';

    db.query(charString)
    .then(data => {
        res.locals.players = data.rows
        return next();
    })
    .catch(err => {
        return next({log: 'Express error handler caught unknown middleware error'})
    })
}