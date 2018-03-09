//Simple chat client for chatroom.

let socket;

$(function (){
	//Setup a WebSocket server connection at port 10001.
	socket = new WebSocket("ws://localhost:10001");

	//Upon successful connection.
	socket.onopen = function(message){
		
		//Request the chatroom history.
		socket.send(JSON.stringify({
			type: "history"
		}));
	}

	//When the server sends a message.
	socket.onmessage = function(message){
		message = JSON.parse(message.data);
		
		//The server sent the history of chatroom.
		if(message.type == "history"){
			console.log("history gotten");
			for(let i=0; i<message.data.length; i++){
				let tempMessage = JSON.parse(message.data[i]);
				addMessage(tempMessage.user, tempMessage.data, "green");
			}
		}else if(message.type == "message"){
			addMessage(message.user, message.data, "green");
		}
	}

	//The server closed the connection.
	socket.onclose = function(){
		console.log("Socket Closed");
	}

	//The client is sending the message.
	$('#submitmsg').on('click', function(){
		let message = document.getElementById('usermsg').value;

		//Add the current clients message to the chatroom.
		addMessage(userObject.getUserName(), message, "red");
		document.getElementById('usermsg').value = "";

		//Send the message to server as JSON object.
		socket.send(JSON.stringify({
			type: "message",
			user: userObject.getUserName(),
			data: message
		}));
	});

	//Adds the message sent by a user to the chatroom.
	//This function does not treat the message as an object.
	//So, it will parse html tag input as html query. Example: "<h1>Hello</h1>"
	function addMessage(user, message, colour){
		$("#chatbox").append('<p><span style="color:' + colour + '">' + user + "</span>" + ": " + message + "</p>");
	}

});
