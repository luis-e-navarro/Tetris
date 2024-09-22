const sql = require ('../models/playerModels');

const playerController = {};

playerController.updatePlayer = async ( req, res, next) => {
    const charString = 'SELECT * FROM scores';
    try{ 
        await sql.query(charString)
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
    await sql.query(command)
      .then(data => {
        return next();
      })
      .catch(error => next({log:`Error in dbquery checkAmount function`}))
  }else{
    return next()
  }
}

playerController.addPlayer = async (req, res, next) => {
  try{
    const {alias, score} = req.body;

    if (alias !== '' && score > 0){
        const command = 'INSERT INTO scores (alias, score) VALUES ($1, $2);';
        await sql
          .query(command, [alias, score])
          .then(()=> next())
          .catch((error =>  next({log:'Error in addPlayer function', error})));
      }else{
        return next()
      }
    }catch(err){
      return next({message:'Something went wrong in server', log:'Something went wrong in addPlayer middleware function ' + err});
    }
};

module.exports = playerController