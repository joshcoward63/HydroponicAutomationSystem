;/*This file creates a Nodejs server that listens for command from Misty Client and frontend Web Client*/
const { Console, countReset } = require('console');
var express = require('express');
var app = express();

// console.log(config);
var serverPort = 5000
/*Server is listening on port 5000*/
var server = app.listen(serverPort);

app.use(express.static('public'));
console.log("Listening on port " + serverPort);

var socket = require('socket.io');

/*Starts socketio server*/ 
var io = socket(server);


/*List of connected clients and current selected Robot*/

io.sockets.on('connection', newConnection);
 function newConnection(socket){
 	console.log("new connection: " + socket.id);
	//   io.to(socket.id).emit("robotInfo", socket.id);
	  socket.emit("getAreaTemp");
	//   clients[socket.id] = null;
	//   console.log(JSON.stringify(clients))

	socket.on("getInfo", function getInfo(info){
		// robotCount++;
		// info = JSON.stringify(info);
		// clients[socket.id] = info;
		// robots[robotCount] = JSON.parse(info);
		// socket.broadcast.emit("robotInfoBrowser", robots, robotCount);
		// socket.broadcast.emit("getInfo", info);
	})

	
	socket.on('disconnecting', function(){	
	    socket.broadcast.emit("robotDisconnect", robotNumber);
		delete robots[robotNumber];		
	
	})

	socket.on("growRoomTemp", function(temperature){
		console.log(temperature);
	})
	socket.on("waterTemp", function(temperature){
		console.log(temperature);
	})
	socket.on("areaTemp", function(temperature){
		console.log(temperature);
	})

}
