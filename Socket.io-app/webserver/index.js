;/*This file creates a Nodejs server that listens for commands and data being streamed
 between the Device Controller and the Frontend UI Display*/
var express = require('express');
var app = express();

var serverPort = 5000
var server = app.listen(serverPort);

console.log("Listening on port " + serverPort);

var socket = require('socket.io');

/*Starts socketio server*/ 
var io = socket(server);


/*List of connected clients and current selected Robot*/

io.sockets.on('connection', newConnection);
 function newConnection(socket){
 	console.log("new connection: " + socket.id);

	// The following is from the Device Controller to the UI 

	socket.on("getAreaTemp", function getAreaTemp(temp){
		socket.broadcast.emit("areaTemp",temp);
	});;

	socket.on("waterTemp", function getGrowRoomTemp(temp){
		socket.broadcast.emit("waterTemp",temp);
		
	});
	socket.on("growRoomTemp", function getWaterTemp(temp){
		socket.broadcast.emit("roomTemp",temp);
	});
	socket.on("phSensorReading", function getWaterTemp(phReading){
		phReading = Math.round((phReading + Number.EPSILON) * 100) / 100;
		socket.broadcast.emit("phReading",phReading);
	});
	socket.on("ecSensorReading", function getECReading(ecReading){
		ecReading = Math.round((ecReading + Number.EPSILON) * 100) / 100;
		socket.broadcast.emit("ecReading",ecReading);
	});
	socket.on("tdsSensorReading", function getTDSReading(tdsReading){
		tdsReading = Math.round((tdsReading + Number.EPSILON) * 100) / 100;
		socket.broadcast.emit("tdsReading",tdsReading);
	});
	socket.on("waterLevelReading", function getWaterLevelReading(waterLevelReading){
		waterLevelReading = Math.round((waterLevelReading + Number.EPSILON) * 100) / 100;
		socket.broadcast.emit("waterLevelReading",waterLevelReading);
	});
	
	socket.on("getTempReadings", function getWaterTemp(temps){
		let aTemp = temps[0];
		let rTemp = temps[1];
		let wTemp = temps[2];
		socket.broadcast.emit("temperatureReadings",aTemp, rTemp, wTemp);	
		console.log(aTemp);
	});

	// The following is from the UI to the Device Controller
	socket.on("turnExhaustFanOn", function turnOnExhaustFan(){
		socket.broadcast.emit("turnOnExhaustFan");
		console.log("on");
	});

	socket.on("turnExhaustFanOff", function turnOffExhaustFan(){
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
	

	socket.on("areaTemp", function(){
		socket.broadcast.emit("getAreaTemp");
	})
	socket.on("roomTemp", function (){
		socket.broadcast.emit("getRoomTemp");
	})
	socket.on("waterTemp", function (){
		socket.broadcast.emit("getWaterTemp");
	})
	socket.on("waterLevel", function (){
		socket.broadcast.emit("getWaterLevel");
	})
	socket.on("pH", function (){
		socket.broadcast.emit("getPH");
	})
	socket.on("TDS", function (){
		socket.broadcast.emit("getTDS");
	})
	socket.on("EC", function (){
		socket.broadcast.emit("getEC");
	})

	
	socket.on('disconnecting', function(){	
	    // socket.broadcast.emit("Client disconnected");
		console.log("client disconnected: ", socket.id);
	
	})


}
