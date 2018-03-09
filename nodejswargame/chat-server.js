//WebSocket server for the chatroom.

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 10001});

let messages = [];

//Function to broadcast the messages to everyone except the 
//user who sent it.
wss.broadcast = function(clientws, message){
	this.clients.forEach(function (ws){ 
		//Don't send message to client who sent the message.
		if(clientws != ws){
			ws.send(message);
		}
	});
}

//When a client tries to connect to the WebSocket server.
wss.on('connection', function(ws){
	console.log("Socket Opened on ServerSide");

	//The client sent a message.
	ws.on('message', function(message){
		message = JSON.parse(message);

		//Send the chatroom history when the user first logs in.
		if(message.type == "history"){
			ws.send(JSON.stringify({
				type: "history",
				data: messages
			}));
		
		//Broadcast the message received.
		}else if(message.type == "message"){
			let newMessage = JSON.stringify({
				type: "message",
				user: message.user,
				data: message.data
			});

			//Broadcast and store the message in list.
			wss.broadcast(ws, newMessage);
			messages.push(newMessage);
		}
	});

	//The client closed the connection.
	ws.on('close', function(){
		console.log("Client Disconnected");
	});
});
