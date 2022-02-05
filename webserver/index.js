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
	//   clients[socket.id] = null;
	//   console.log(JSON.stringify(clients))

	socket.on("getAreaTemp", function getAreaTemp(temp){
		// console.log(temp);
		socket.broadcast.emit("areaTemp",temp);
	});

	socket.on("getWaterTemp", function getGrowRoomTemp(temp){
		socket.broadcast.emit("waterTemp",temp);
	});
	socket.on("getRoomTemp", function getWaterTemp(temp){
		socket.broadcast.emit("roomTemp",temp);
	});
	
	socket.on("getTempReadings", function getWaterTemp(temps){
		let aTemp = temps[0];
		let rTemp = temps[1];
		let wTemp = temps[2];
		socket.broadcast.emit("temperatureReadings",aTemp, rTemp, wTemp);	
		console.log(aTemp);
	});
	// socket.on("areaTemp", function postAreaTemp(temp){

	// })
	// socket.on("waterTemp", function postGrowRoomTemp(temp){

	// })
	// socket.on("growRoomTemp", function postWaterTemp(temp){

	// })

	
	socket.on('disconnecting', function(){	
	    // socket.broadcast.emit("Client disconnected");
		console.log("client disconnected: ", socket.id);
	
	})


}
