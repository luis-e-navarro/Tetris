const db = require ('../models/playerModels');

const playerController = {};

playerController.updatePlayer = ( req, res, next) => {
    const charString = 'SELECT * FROM scores';

    db.query(charString)
    .then(data => {
    res.locals.players = data.rows
    const all = res.locals.players.sort()
    all.sort(function(a, b) {
        return b.score - a.score;
    });
    return next();
    })
    .catch(err => {
        return next({log: 'Express error handler caught updatePlayer middleware error'})
    })  
    
}

playerController.checkAmount = (req,res,next) => {
    if(res.locals.players.length > 5){
        const total = res.locals.players.reduce((acc, curr) => {
            if (curr.score < acc.score){
                return curr
            }
        });
        
        const charString = `DELETE FROM scores WHERE score = '${total.score}';`;
        db.query(charString, (err, res)=>{
            return next();
        })
        .catch((error) => next({log:`Error in checkAmount function`}))
    }else{
        return next()
    }
}


playerController.addPlayer = (req, res, next) => {

    const {name, score} = req.body;
    const command = `INSERT INTO scores (name, score) VALUES ('${name}', '${score}');`;
    db
      .query(command)
      .then(()=> next())
      .catch((error =>  next({log:'Error in addCharacter function'})));
  
  };

module.exports = playerController