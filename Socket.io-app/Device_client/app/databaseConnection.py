from pymongo import MongoClient
import pymongo
import datetime


def getTDSReading(database):
    collection = database["TDS Level"]
    value = collection.find().sort('timestamp',-1)[0]
    return value['ppm']

def getPHReading(database):
    collection = database["pH Level"]
    value = collection.find().sort('timestamp',-1)[0]
    return value['pH']

def getECReading(database):
    collection = database["EC Level"]
    value = collection.find().sort('timestamp',-1)[0]
    return value['mS/cm']

def getAreaTempReading(database):
    collection = database["Water Temp"]
    value = collection.find({"sensorName":"sensor 2"}).sort('timestamp',-1)[0]
    return value['fahrenheit']

def getWaterTempReading(database):
    collection = database["Water Temp"]
    value = collection.find({"sensorName":"sensor 3"}).sort('timestamp',-1)[0]
    return value['fahrenheit']

def getRoomTempReading(database):
    collection = database["Water Temp"]
    value = collection.find({"sensorName":"sensor 1"}).sort('timestamp',-1)[0]
    return value['fahrenheit']

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['Devices']

