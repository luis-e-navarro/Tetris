const db = require ('../models/playerModels');

const playerController = {};

playerController.updatePlayer = async ( req, res, next) => {
    const charString = 'SELECT * FROM scores';
    try{
        await db.query(charString)
        .then(data => {
        data.rows.sort((a, b) => b.score - a.score);
        res.locals.players = data.rows
        return next();
        })
        .catch(err => {
            return next({log: 'Express error handler caught updatePlayer middleware error'})
        })  
    }catch(err){
        return next({message:'Something went wrong in server', log:'Something went wrong in addPlayer middleware function'});
    }
}

playerController.checkAmount = async (req,res,next) => {
    if(res.locals.players.length > 5){
        const lowest = res.locals.players.pop()
        const command = `DELETE FROM scores WHERE score = '${lowest.score}';`;
        await db.query(command)
            .then(data => {
                console.log(data)
                return next()
            })
            .catch(error => next({log:`Error in dbquery checkAmount function`}))
    }else{
        return next()
    }
}


playerController.addPlayer = async (req, res, next) => {
    try{
        const {name, score} = req.body;
        if (name !== '' && score > 0){
            const command = `INSERT INTO scores (name, score) VALUES ('${name}', '${score}');`;
            await db
               .query(command)
               .then(()=> next())
               .catch((error =>  next({log:'Error in addCharacter function'})));
        }else{
            return next()
        }
       
    }catch(err){
        return next({message:'Something went wrong in server', log:'Something went wrong in addPlayer middleware function'});
    }
  
  };

module.exports = playerController