//The express static server listening on port 10000.
//This is the backend component responsible for accessing user information
//from the MongoDB.

var listenPort = 10000;

var db = require('./database.js');
var dbinstance = new db();

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var jsonParser = bodyParser.json();


app.use('/',express.static('static_files')); // this directory has files to be returned

app.post('/login', jsonParser, function(req, res){
	dbinstance.logIn(req.body.id, req.body.userpass, function(output){

    if(output == 404){
      res.status(output).json({success: false});
    }else{
      res.status(output).json({success: true});
    }
  });
});

app.post('/register', jsonParser, function(req, res){
  dbinstance.registerUser(req.body.id, req.body.userpass, req.body.firstname, 
    req.body.lastname, req.body.email, function(output){
      if(output == 404){
        res.status(output).json({success: false});
      }else{
        res.status(output).json({success: true});
      }
    });
});

app.put('/update', jsonParser, function(req, res){
  dbinstance.updateInfo(req.body.id, req.body.userpass, req.body.firstname, req.body.lastname, 
    req.body.email, function(output){
      if(output == 404){
        res.status(output).json({success: false});
      }else{
        res.status(output).json({success: true});
      }
    });
});

app.get('/getInfo', urlencodedParser, function(req, res){
  dbinstance.getUserInfo(req.query.id, req.query.userpass, function(output){
    res.status(200).json(output);
  });
});

app.delete('/deleteaccount', jsonParser, function(req, res){
  dbinstance.deleteUser(req.body.username, req.body.userpass, function(output){
    if(output == 404){
      res.status(output).json({success: false});
    }else{
      res.status(output).json({success: true});
    }
  });
});

app.put('/registerScore', jsonParser, function(req, res){
  dbinstance.putScore(req.body.userid, req.body.userpass, req.body.currentScore, function(output){
    res.status(200).json(output);
  });
});

app.get('/topScores', jsonParser, function(req, res){
  dbinstance.getTopScores(function(output){
    res.status(200).json(output);
  });
});

app.listen(listenPort, function () {
  console.log('Listening on port 10000!');
});
