from platform import python_branch
import socketio
import time
from esp_server_controller import*
from pumpController import*
from HomebridgeRequest import*
#Creates the client
sio = socketio.Client()

server_ip = "http://" + "192.168.0.91" + ":" +"5000"

#Connects to server
while True:
    try:
        sio.connect(server_ip)
        break
    except:
        print("Failed to connect to server trying again in 10 seconds")
    print("sleeping")
    time.sleep(10)



""" Gets the temperature reading of the grow room """
@sio.on("getRoomTemp")
def sendRoomTemp():
    roomTemp = getGrowRoomTemp()
    sio.emit("growRoomTemp", roomTemp)

def sendRoomTemp2():
    roomTemp = getGrowRoomTemp()
    sio.emit("growRoomTemp", roomTemp)

""" Gets the temperature reading of the water in the system """
@sio.on("getWaterTemp")
def sendWaterTemp():
    waterTemp = getWaterTemp()
    sio.emit("waterTemp", waterTemp)

def sendWaterTemp2():
    waterTemp = getWaterTemp()
    sio.emit("waterTemp", waterTemp)

""" Gets the temperature reading of the surrounding area """
@sio.on("getAreaTemp")
def sendAreaTemp():
    areaTemp = getSurroundingAreaTemp()
    sio.emit("areaTemp", areaTemp)

def sendAreaTemp2():
    areaTemp = getSurroundingAreaTemp()
    sio.emit("getAreaTemp", areaTemp)


""" Sends all temperature readings """
def sendTemperatureReadings():
    areaTemp = getSurroundingAreaTemp()
    roomTemp = getGrowRoomTemp()
    waterTemp = getWaterTemp()
    sio.emit("getTempReadings", [areaTemp, roomTemp, waterTemp])

@sio.on("turnOffExhaustFan")
def turnOffExhaustFan_():
    turnDeviceOff('Exhaust Fan')

@sio.on("turnOnExhaustFan")
def turnOnExhaustFan_():
    turnDeviceOn("Exhaust Fan")

@sio.on("getExhaustStatus")
def sendExhaustFanStatus():
    print("Getting status")
    status = getExhaustFanState()
    sio.emit("exhaustStatus", status)

@sio.on("turnOffRegularFan")
def turnOffRegularFan_():
    print("Regular Fan Off")
    turnDeviceOff("Regular Fan")

@sio.on("turnOnRegularFan")
def turnOnRegularFan_():
    print("Regular Fan On")
    turnDeviceOn("Regular Fan")

@sio.on("getRegularStatus")
def sendRegularFanStatus():
    status = getRegularFanState()
    sio.emit("regularStatus", status)


@sio.on("turnOffMainPump")
def turnOffMainPump_():
    turnDeviceOff("Main Pump")
    print("Main Pump On")

@sio.on("turnOnMainPump")
def turnOnMainPump_():
    print("Main Pump On")
    turnDeviceOn("Main Pump")

@sio.on("getMainPumpStatus")
def sendMainPumpStatus():    
    status = getDeviceState("Main Pump")
    sio.emit("mainPumpStatus", status)

@sio.on("turnOffSupplyPump")
def turnOffSupplyPump_():
    print("Supply Pump Off")
    turnDeviceOff("Supply Pump")

@sio.on("turnOnSupplyPump")
def turnOnSupplyPump_():
    print("Supply Pump On")
    turnDeviceOn("Supply Pump")

@sio.on("getSupplyPumpStatus")
def sendSupplyPumpStatus():
    status = getDeviceState("Supply Pump")
    sio.emit("supplyPumpStatus", status)

@sio.on("togglePump")
def togglePump(data):
    pumpName = data[0]
    pumpDuration = int(data[1])
    turnOnPump(pumpName, pumpDuration)

def errorHandler(device, issue):
    sio.emit("device error", device, issue)
    

# When the socket connects    
@sio.event
def connect():
    print("I'm connected!")

# When the socket has an error
@sio.event
def connect_error():
    print("The connection failed!")

# When the socket disconnects
@sio.event
def disconnect():
    print("I'm disconnected!")    

if __name__ == '__main__':
    while True:
        sendAreaTemp2()
        sendRoomTemp2()
        sendWaterTemp2()
        time.sleep(5)
        
        