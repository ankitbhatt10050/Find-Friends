const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise;

//adding static file
app.use(express.static('public'));

//import router
const routes=require('./routes/api');


//using body parser before route cause only before route body can be done
app.use(bodyParser.json());

//now expres will use all routes
//anything starts with api will use these routes
app.use('/api',routes);

//middle ware for handling error
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});




//listen port
app.listen(process.env.port||4000,function(){
    console.log("I am ON");
});

