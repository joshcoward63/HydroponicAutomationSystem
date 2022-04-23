from platform import python_branch
import socketio
import time
# from esp_server_controller import*
from pumpController import*
from HomebridgeRequest import*
from zeroconf import Zeroconf
import MDNSListener
from espServerInterface import*
from testSchemeBuilder import*
#Creates the client1
sio = socketio.Client()

server_ip = "http://" + "192.168.0.89" + ":" +"5000"

devices_list = ['192.168.0.201']
# devices_list = ['192.168.0.214', '192.168.0.219', '192.168.0.46']
#Connects to server
while True:
    try:
        sio.connect(server_ip)
        break
    except:
        print("Failed to connect to server trying again in 10 seconds")
    print("sleeping")
    time.sleep(10)


def checkForNewDevices():
    # zconf = Zeroconf() 
    # serviceListener = MDNSListener.MDNSListener() 
    # zconf.add_service_listener("_http._tcp.local.", serviceListener)
    # time.sleep(2)
    # zconf.close()
    pass


""" Gets the temperature reading of the grow room """
@sio.on("getRoomTemp")
def sendRoomTemp():
    roomTemp = 70
    sio.emit("growRoomTemp", roomTemp)

def sendRoomTemp2():
    roomTemp = 70
    sio.emit("growRoomTemp", roomTemp)

""" Gets the temperature reading of the water in the system """
@sio.on("getWaterTemp")
def sendWaterTemp():
    waterTemp = 70
    sio.emit("waterTemp", waterTemp)

def sendWaterTemp2():
    waterTemp = 70
    sio.emit("waterTemp", waterTemp)

""" Gets the temperature reading of the surrounding area """
@sio.on("getAreaTemp")
def sendAreaTemp():
    areaTemp = 70
    sio.emit("areaTemp", areaTemp)

def sendAreaTemp2():
    areaTemp = 70
    # print(areaTemp)
    sio.emit("getAreaTemp", areaTemp)


""" Sends all temperature readings """
def sendTemperatureReadings():
    areaTemp = 70
    roomTemp = 70
    waterTemp = 70
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

def getSensorData():
    for device in devices_list:
        device_info = getDeviceInfo(device)
        addDevice(device_info['sensor'], device)
        print(device_info)

def getSensorReading():
    for device in devices_list:
        device_info = getDeviceInfo(device)
        for i in range(0,device_info['quantity']):
            if i == 0 and device_info['quantity'] == 1:
                addDeviceReading(device_info['sensor'], None, getDeviceReading(device_info['sensor'],device)['value'], device_info['record-type'])
            else:
                addDeviceReading(device_info['sensor'], getDeviceReading(device_info['sensor'], device)['sensor'+str(i+1)], getDeviceReading(device_info['sensor'], device)['value'+str(i+1)], device_info['record-type'])
                

def getDeviceReading(sensor_type, ip_address):
    if sensor_type == "TDS Sensor":
        return getTDSValue(ip_address)
    elif sensor_type == "pH Sensor":
        return getPhValue(ip_address)
    elif sensor_type == "EC Sensor":
        return getECValue(ip_address)
    # elif sensor_type == "Temp Humidity Sensor":
    #     return "Temp-humidity-sensors"
    # elif sensor_type == "Main pump":
    #     return "Main-pumps"
    # elif sensor_type == "Supply pump":
    #     return "Supply-pumps"
    elif sensor_type == "Water Sensor":
        return getTempValues(ip_address)
    # elif sensor_type == "Water Level Sensor":
    #     return "Water-level-sensors"

if __name__ == '__main__':
    getSensorData()
    while True:
        print("test")
        sendAreaTemp2()
        sendRoomTemp2()
        sendWaterTemp2()
        checkForNewDevices()
        getSensorData()
        getSensorReading()
        time.sleep(30)
        
        