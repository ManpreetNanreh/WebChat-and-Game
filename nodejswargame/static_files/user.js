//User object class.
//Store the information here when the user login or register.
//This is just to test and learn how class Objects work in javascript.
//DO NOT store personal information such as password in a javascript object.

function User(userName, userPass){
	this.userName = userName;
	this.userPass = userPass;
	this.userFName = null;
	this.userLName = null;
	this.userEmail = null;
}

//Setters and getters for parameters.
User.prototype.getUserName=function(){ return this.userName; }

User.prototype.getUserPass=function(){ return this.userPass; }

User.prototype.setUserPass=function(newUserPass){ this.userPass = newUserPass; }

User.prototype.getFName=function(){ return this.userFName; }

User.prototype.setFName=function(fName){ this.userFName = fName; }

User.prototype.getLName=function(){ return this.userLName; }

User.prototype.setLName=function(lName){ this.userLName = lName; }

User.prototype.getUserEmail=function(){ return this.userEmail; }

User.prototype.setUserEmail=function(email){ this.userEmail = email; }
