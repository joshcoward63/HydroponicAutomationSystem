;/*This file creates a Nodejs server that listens for command from Misty Client and frontend Web Client*/
const { Console, countReset } = require('console');
var express = require('express');
const { stat } = require('fs');
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
		socket.emit("testClient");

	socket.on("getAreaTemp", function getAreaTemp(temp){
		socket.broadcast.emit("areaTemp",temp);
	});
	socket.on("test", function test(temp){
		console.log(temp);
		// socket.broadcast.emit("areaTemp",temp);
	});

	socket.on("waterTemp", function getGrowRoomTemp(temp){
		socket.broadcast.emit("waterTemp",temp);
	});
	socket.on("growRoomTemp", function getWaterTemp(temp){
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

	socket.on("turnExhaustFanOn", function turnOnExahustFan(){
		socket.broadcast.emit("turnOnExhaustFan");
		console.log("on");
	});

	socket.on("turnExhaustFanOff", function turnOffExahustFan(){
		socket.broadcast.emit("turnOffExhaustFan");
		console.log("off");
	});


	socket.on("turnRegularFanOn", function turnOnRegularFan(){
		socket.broadcast.emit("turnOnRegularFan");
		console.log("on");
	});

	socket.on("turnRegularFanOff", function turnOffRegularFan(){
		socket.broadcast.emit("turnOffRegularFan");
		console.log("off");
	});

	socket.on("turnMainPumpOn", function turnOnMainPump(){
		socket.broadcast.emit("turnOnMainPump");
		console.log("off");
	});
	socket.on("turnMainPumpOff", function turnOffMainPump(){
		socket.broadcast.emit("turnOffMainPump");
		console.log("off");
	});
	socket.on("turnSupplyPumpOn", function turnOnSupplyPump(){
		socket.broadcast.emit("turnOnSupplyPump");
		console.log("off");
	});
	socket.on("turnSupplyPumpOff", function turnOffSupplyPump(){
		socket.broadcast.emit("turnOffSupplyPump");
		console.log("off");
	});
	//Status

	socket.on("getRegularStatus", function getRegularStatus(){
		socket.broadcast.emit("getRegularStatus");
	});

	socket.on("getExhaustStatus", function getExhaustStatus(){
		socket.broadcast.emit("getExhaustStatus");
	});

	socket.on("regularStatus", function regularStatus(status){
		socket.broadcast.emit("regularStatus", status);
		console.log("getting status");
	});

	socket.on("exhaustStatus", function exhaustStatus(status){
		socket.broadcast.emit("exhaustStatus", status);
		console.log(status)
		console.log("getting status");
	});


	socket.on("getMainPumpStatus", function getRegularStatus(){
		socket.broadcast.emit("getMainPumpStatus");
	});

	socket.on("mainPumpStatus", function regularStatus(status){
		socket.broadcast.emit("mainPumpStatus", status);
		console.log("getting main status");
	});

	socket.on("getSupplyPumpStatus", function getRegularStatus(){
		socket.broadcast.emit("getSupplyPumpStatus");
	});

	socket.on("supplyPumpStatus", function regularStatus(status){
		socket.broadcast.emit("supplyPumpStatus", status);
		console.log("getting supply status");
	});

	socket.on("togglePump", function togglePump(pump){
		socket.broadcast.emit("togglePump", pump);
	})

	socket.on('disconnecting', function(){	
	    // socket.broadcast.emit("Client disconnected");
		console.log("client disconnected: ", socket.id);
	
	})


}
