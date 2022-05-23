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
from databaseConnection import*
from pymongo import MongoClient
import pymongo
import datetime
CONNECTION_STRING = "mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test"
mongo_client = MongoClient(CONNECTION_STRING)
device_database = mongo_client['Devices']

#Creates the client1
sio = socketio.Client()

server_ip = "http://" + "192.168.0.89" + ":" +"5000"


# devices_list = ['192.168.0.201','192.168.0.46] pH/EC respectively 
devices_list = ['192.168.0.214', '192.168.0.219']
# devices_list = ['192.168.0.214']
#Connects to server
while True:
    try:
        sio.connect(server_ip)
        break
    except:
        print("Failed to connect to server trying again in 10 seconds")
    print("sleeping")
    time.sleep(10)

""" Searches for new devices that come online and add them to the the list """
def checkForNewDevices():
    # zconf = Zeroconf() 
    # serviceListener = MDNSListener.MDNSListener() 
    # zconf.add_service_listener("_http._tcp.local.", serviceListener)
    # time.sleep(2)
    # zconf.close()
    pass


@sio.on("getRoomTemp")
def sendRoomTempRequested():
    roomTemp = getRoomTempReading(device_database)
    sio.emit("growRoomTemp", roomTemp)

""" Sends the room temperature to the main server """
def sendRoomTemp():
    roomTemp = getRoomTempReading(device_database)
    sio.emit("growRoomTemp", roomTemp)

@sio.on("getWaterTemp")
def sendWaterTempRequested():
    waterTemp = getWaterTempReading(device_database)
    sio.emit("waterTemp", waterTemp)

""" Sends the reservoir water temperature to the main server """
def sendWaterTemp():
    waterTemp = getWaterTempReading(device_database)
    sio.emit("waterTemp", waterTemp)

@sio.on("getAreaTemp")
def sendAreaTempRequested():
    areaTemp = getRoomTempReading(device_database)
    sio.emit("getAreaTemp", areaTemp)

""" Sends the surrounding area temperature to the main server """
def sendAreaTemp():
    areaTemp = getAreaTempReading(device_database)
    sio.emit("getAreaTemp", areaTemp)

@sio.on("getPH")
def sendPHRequested():
    ph_value = getPHReading(device_database)
    sio.emit("phSensorReading", ph_value)

""" Sends the pH reading to the main server """
def sendPH():
    ph_value = getPHReading(device_database)
    sio.emit("phSensorReading", ph_value)

@sio.on("getEC")
def sendECRequested():
    ec_value = getECReading(device_database)
    sio.emit("ecSensorReading", ec_value)

""" Sends the Electrical Conductivity reading to the main server """
def sendEC():
    ec_value = getECReading(device_database)
    sio.emit("ecSensorReading", ec_value)

@sio.on("getTDS")
def sendTDSRequested():
    tds_value = getTDSReading(device_database)
    sio.emit("tdsSensorReading", tds_value)

""" Sends the TDS measurement in ppm to the main server """
def sendTDS():
    tds_value = getTDSReading(device_database)
    sio.emit("tdsSensorReading", tds_value)

@sio.on("getWaterLevel")
def sendScaleRequested():
    print("lajcak")
    scale_value = getScaleReading(device_database)
    sio.emit("waterLevelReading", scale_value)

""" Sends the Scale measurement in gallons to the main server """
def sendScale():
    scale_value = getScaleReading(device_database)
    sio.emit("waterLevelReading", scale_value)

""" Sends all temperature readings """
def sendTemperatureReadings():
    areaTemp = getAreaTempReading(device_database)
    roomTemp = getRoomTempReading(device_database)
    waterTemp = getWaterTempReading(device_database)
    sio.emit("getTempReadings", [areaTemp, roomTemp, waterTemp])

""" Turns off the exhaust fan when command sent """
@sio.on("turnOffExhaustFan")
def turnOffExhaustFan_():
    turnDeviceOff('Exhaust Fan')

""" Turns on the exhaust fan when command sent """
@sio.on("turnOnExhaustFan")
def turnOnExhaustFan_():
    turnDeviceOn("Exhaust Fan")

""" Gets the exhaust fan status when command sent """
@sio.on("getExhaustStatus")
def sendExhaustFanStatus():
    print("Getting status")
    status = getExhaustFanState()
    sio.emit("exhaustStatus", status)

""" Turns off the regular fan when command sent """
@sio.on("turnOffRegularFan")
def turnOffRegularFan_():
    print("Regular Fan Off")
    turnDeviceOff("Regular Fan")

""" Turns on the regular fan when command sent """
@sio.on("turnOnRegularFan")
def turnOnRegularFan_():
    print("Regular Fan On")
    turnDeviceOn("Regular Fan")

""" Gets the regular fan status when command sent """
@sio.on("getRegularStatus")
def sendRegularFanStatus():
    status = getRegularFanState()
    sio.emit("regularStatus", status)

""" Turns off the main pump when command sent """
@sio.on("turnOffMainPump")
def turnOffMainPump_():
    turnDeviceOff("Main Pump")
    print("Main Pump On")

""" Turns on the main pump when command sent """
@sio.on("turnOnMainPump")
def turnOnMainPump_():
    print("Main Pump On")
    turnDeviceOn("Main Pump")

""" Gets the main pump status when command sent """
@sio.on("getMainPumpStatus")
def sendMainPumpStatus():    
    status = getDeviceState("Main Pump")
    sio.emit("mainPumpStatus", status)

""" Turns off the supply pump when command sent """
@sio.on("turnOffSupplyPump")
def turnOffSupplyPump_():
    print("Supply Pump Off")
    turnDeviceOff("Supply Pump")

""" Turns on the supply pump when command sent"""
@sio.on("turnOnSupplyPump")
def turnOnSupplyPump_():
    print("Supply Pump On")
    turnDeviceOn("Supply Pump")

""" Gets the supply pump status when command sent """
@sio.on("getSupplyPumpStatus")
def sendSupplyPumpStatus():
    status = getDeviceState("Supply Pump")
    sio.emit("supplyPumpStatus", status)

""" Turns on the coresponding nutrient dispensing pump for a set duration when command sent """
@sio.on("togglePump")
def togglePump(data):
    pumpName = data[0]
    pumpDuration = int(data[1])
    turnOnPump(pumpName, pumpDuration)

""" Sends a error message to server when device can't connect """
def errorHandler(device, issue):
    sio.emit("device error", device, issue)
    

""" When the socket connects """
@sio.event 
def connect():
    print("I'm connected!")

""" When the socket has an error """
@sio.event
def connect_error():
    print("The connection failed!")

""" When the socket disconnects """
@sio.event
def disconnect():
    print("I'm disconnected!")    

""" Adds new Device to mongodb database """
def addSensorData():
    for device in devices_list:
        device_info = getDeviceInfo(device)
        addDevice(device_info['sensor'], device)
        print(device_info)

""" Adds sensor reading to mongodb database """
def addSensorReading():
    for device in devices_list:
        device_info = getDeviceInfo(device)
        for i in range(0,device_info['quantity']):
            # print(device_info)
            if i == 0 and device_info['quantity'] == 1:
                # print("kjdaodaj")
                addDeviceReading(device_info['sensor'], None, getDeviceReading(device_info['sensor'],device)['value'], device_info['record-type'])
            else:
                addDeviceReading(device_info['sensor'], getDeviceReading(device_info['sensor'], device)['sensor'+str(i+1)], getDeviceReading(device_info['sensor'], device)['value'+str(i+1)], device_info['record-type'])
                

""" Makes request to server to get value for selected sensor """
def getDeviceReading(sensor_type, ip_address):
    if sensor_type == "TDS Sensor":
        return getTDSValue(ip_address)
    elif sensor_type == "pH Sensor":
        return getPhValue(ip_address)
    elif sensor_type == "EC Sensor":
        return getECValue(ip_address)
    # elif sensor_type == "Temp Humidity Sensor":
    #     return "Temp-humidity-sensors"
    elif sensor_type == "Water Sensor":
        return getTempValues(ip_address)
    # elif sensor_type == "Water Level Sensor":
    #     return "Water-level-sensors"

if __name__ == '__main__':
    # addSensorData()
    while True:
        sendAreaTemp()
        sendRoomTemp()
        sendWaterTemp()
        sendPH()
        sendEC()
        sendTDS()
        sendScale()
        # checkForNewDevices()
        # addSensorData()
        # print("kjdak")
        addSensorReading()
        time.sleep(30*60)
        
        