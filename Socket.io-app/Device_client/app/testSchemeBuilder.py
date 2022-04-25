import pymongo
import datetime

""" Connects to MongoDB instance """
username = "joshcoward63"
password = "Dexter.98"
myclient = pymongo.MongoClient("mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test?authSource=admin&replicaSet=atlas-fsz3v6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
mydb = myclient["Devices"]
mycol = mydb["Users"]

def getDeviceType(sensor_type):
    if sensor_type == "TDS Sensor":
        return "TDS-sensors"
    elif sensor_type == "pH Sensor":
        return "PH-sensors"
    elif sensor_type == "EC Sensor":
        return "EC-sensors"
    elif sensor_type == "Temp Humidity Sensor":
        return "Temp-humidity-sensors"
    elif sensor_type == "Main pump":
        return "Main-pumps"
    elif sensor_type == "Supply pump":
        return "Supply-pumps"
    elif sensor_type == "Water Sensor":
        return "Water-temp-sensors"
    elif sensor_type == "Water Level Sensor":
        return "Water-level-sensors"

def getDeviceTableName(sensor_type):
    if sensor_type == "TDS Sensor":
        return "TDS Level"
    elif sensor_type == "pH Sensor":
        return "pH Level"
    elif sensor_type == "EC Sensor":
        return "EC Level"
    elif sensor_type == "Temp Humidity Sensor":
        return "Air Temp and Humidity"
    elif sensor_type == "Water Sensor":
        return "Water Temp"
    elif sensor_type == "Water Level":
        return "Water Level"

""" Adds device to current user """
def addDevice(sensor_type,  ipAddress):
    userTable = mydb['Users']
    type_ = getDeviceType(sensor_type)
    userTable.update_one({'_id':'624f6f4713b921665ed369bd'}, {"$push":{"Sensors": {type_: {str(0):{"ip-address":ipAddress, "group": 0}}}}})
    # Check if user exists 
    # print("yup")

""" Adds Device reading to current user under its respective table """
def addDeviceReading(sensor_type, sensor_name, record, record_type):
    tableName = getDeviceTableName(sensor_type)
    sensorTable = mydb[tableName]
    entry = {}
    entry["userId"] = "624f6f4713b921665ed369bd"         
    if sensor_name == None: 
        entry["sensorName"] = sensor_type
    else:
        entry["sensorName"] = sensor_name

    entry[str(record_type)] = record
    entry["timestamp"] = datetime.datetime.utcnow()
    
    sensorTable.insert_one(entry)
    # print("done")
        