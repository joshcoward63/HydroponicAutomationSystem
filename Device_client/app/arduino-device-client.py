import socketio
import time
from esp_server_controller import*
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

""" Gets the temperature reading of the water in the system """
@sio.on("getWaterTemp")
def sendWaterTemp():
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

def sendRoomTemp2():
    roomTemp = getGrowRoomTemp()
    sio.emit("growRoomTemp", roomTemp)

def sendWaterTemp2():
    waterTemp = getWaterTemp()
    sio.emit("waterTemp", waterTemp)

def sendTemperatureReadings():
    areaTemp = getSurroundingAreaTemp()
    roomTemp = getGrowRoomTemp()
    waterTemp = getWaterTemp()
    # print(areaTemp)
    sio.emit("getTempReadings", [areaTemp, roomTemp, waterTemp])

@sio.on("turnOffExhaustFan")
def turnOffExhaustFan_():
    turnDeviceOff('Exhaust Fan')

@sio.on("turnOnExhaustFan")
def turnOnExhaustFan_():
    turnDeviceOn("Exhaust Fan")

@sio.on("getExhaustStatus")
def sendExhaustFanStatus():
    status = getExhaustFanState()
    sio.emit("exhaustStatus", status)

@sio.on("turnOffRegularFan")
def turnOffRegularFan_():
    turnDeviceOff("Regular Fan")

@sio.on("turnOnRegularFan")
def turnOnRegularFan_():
    turnDeviceOn("Regular Fan")

@sio.on("getRegularStatus")
def sendRegularFanStatus():
    status = getRegularFanState()
    sio.emit("regularStatus", status)


@sio.on("turnOffMainPump")
def turnOffMainPump_():
    turnDeviceOff("Main Pump")

@sio.on("turnOnMainPump")
def turnOnMainPump_():
    turnDeviceOn("Main Pump")

@sio.on("getMainPump")
def sendMainPumpStatus():
    status = getDeviceState("Main Pump")
    sio.emit("mainPumpStatus", status)

@sio.on("turnOffSupplyPump")
def turnOffSupplyPump_():
    turnDeviceOff("Supply Pump")

@sio.on("turnOnSupplyPump")
def turnOnSupplyPump_():
    turnDeviceOn("Supply Pump")

@sio.on("getSupplyPump")
def sendSupplyPumpStatus():
    status = getDeviceState("Supply Pump")
    sio.emit("supplyPumpStatus", status)



# @sio.on("testClient")
# def test1():
#     # areaTemp = getSurroundingAreaTemp()
#     sio.emit("test", 12)

# def test():
#     # areaTemp = getSurroundingAreaTemp()
#     sio.emit("test", 12)

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
        # sendTemperatureReadings()
        sendAreaTemp2()
        sendRoomTemp2()
        sendWaterTemp2()
        # test()
        # print("sent")
        time.sleep(5)
        
        