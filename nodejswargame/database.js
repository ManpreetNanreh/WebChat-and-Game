//The Database class which uses MongoDB to store user data.
function Database(){
	var MongoClient = require('mongodb').MongoClient;
	//Connection string for MongoDB. Example:
	//mongodb://[Host Location]:[MongoDB Port]/[Database Name]
	let connectionString = "mongodb://localhost:27017/nodejsdatabase";

	MongoClient.connect(connectionString,
		function(err, client){
	  	if(!err){
				console.log("Database Connected.");
				this.db = client.db('nodejsdatabase');
  		}else{
    		console.log("Database Connection Failed.");
  		}
	});
}

//Register the user into the database.
Database.prototype.registerUser = function(userName, userPass, uFirstName, uLastName, uEmail, callback){
	var collection = db.collection('userinfo');

	var doc = {username: userName, userpass: userPass, firstname: uFirstName, 
		lastname: uLastName, email: uEmail};

	//Check if user already exists, if they don't then allow them to register.
	collection.findOne({username: userName}, function(err, items){
		if(items != null && items.username == userName){
			callback(404);
		}else{
			collection.insert(doc, function(err, result){});
			callback(200);
		}
	});
}

//Check Login information and respond appropriately.
Database.prototype.logIn = function(userName, userPass, callback){
	var collection = db.collection('userinfo');

	collection.findOne({username: userName, userpass: userPass}, function(err, items){
		if(items != null && items.username == userName && items.userpass == userPass){
			callback(200);
		}else{
			callback(404);
		}
	});
}

//Update the user information in the Database.
Database.prototype.updateInfo = function(userName, userPass, uFirstName, uLastName, uEmail, callback){
	var collection = db.collection('userinfo');

	collection.update({username: userName}, {$set: {userpass: userPass, firstname: uFirstName,
		lastname: uLastName, email: uEmail}}, function(req, res) {});

	callback(200);
}

//Get the missing user information to use in the frontend.
Database.prototype.getUserInfo = function(userName, userPass, callback){
	var collection = db.collection('userinfo');
	collection.findOne({username: userName, userpass: userPass}, function(err, items){
		var result = {"firstname": items.firstname, "lastname": items.lastname, "email": items.email};
		callback(result);
	});
}

//Delete the user from the Database.
Database.prototype.deleteUser = function(userName, userPass, callback){
	var collection = db.collection('userinfo');

	collection.remove({username: userName, userpass: userPass}, function(err, items){
		callback(200);
	});
}

//Put the user's HighScore into the Dabase.
Database.prototype.putScore = function(userName, userPass, highscore, callback){
	var collection1 = db.collection('userinfo');
	var collection2 = db.collection('highscore');

	collection2.insert({username: userName, score: highscore}, function(err, items){
		callback(200);
	});
}

//Get the top 10 HighScores.
Database.prototype.getTopScores = function(callback){
	var collection = db.collection('highscore');

	collection.find().sort({score: -1}).limit(10).toArray( function(err, items){
		callback(items);
	});
}

module.exports = Database;
