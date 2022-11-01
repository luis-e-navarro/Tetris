const path = require('path');
const express = require ('express');
const app = express();
const PORT = 3000;
const playerController = require('./controllers/playerController.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.resolve(__dirname,'../client')))

app.get('/spiderman', (req,res,next)=>{
  return res.status(200).sendFile(path.join(__dirname,'../dist/bundle.js'))
})

app.get('/api',
playerController.updatePlayer,
playerController.checkAmount,
(req,res)=>{
    return res.status(200).send(res.locals.players)
});


app.post('/api',
playerController.addPlayer, 
(req, res) => {
  return res.sendStatus(200)
})




//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, ()=>{
    console.log(`listening to PORT ${PORT}`)
})