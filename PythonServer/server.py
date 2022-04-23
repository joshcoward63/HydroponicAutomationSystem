import pymongo
import datetime
import requests
import MDNSListener
from zeroconf import Zeroconf
import time

username = "joshcoward63",
userId = "624f6f4713b921665ed369bd"
myclient = pymongo.MongoClient("mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test?authSource=admin&replicaSet=atlas-fsz3v6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")



"""" This function is used to periodically search for newly added sensors and devices """
def find_sensors():
    zconf = Zeroconf() 
    serviceListener = MDNSListener.MDNSListener() 
    zconf.add_service_listener("_http._tcp.local.", serviceListener) 
    zconf.close()
    

""" This function iterates through a list of sensor IP address  """
def get_sensor_info():
    pass

def post_sensor_info():
    pass

def get_device_status():
    pass

while True:
    find_sensors()
    print(connected_sensors)
    time.sleep(100)