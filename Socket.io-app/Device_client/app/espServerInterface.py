import requests
import time 



def getDeviceInfo(ip_address):
    ip_address = "http://" + ip_address
    r = requests.get(ip_address+ "/info")
    return r.json()

def getPhValue(ip_address):
    ip_address = "http://" + ip_address
    r = requests.get(ip_address+"/ph")
    return r.json()

def getECValue(ip_address):
    ip_address = "http://" + ip_address
    r = requests.get(ip_address+"/ec")
    return r.json()

def getTDSValue(ip_address):
    ip_address = "http://" + ip_address
    r = requests.get(ip_address+"/tds")
    return r.json()

def getTempValues(ip_address):
    ip_address = "http://" + ip_address
    r = requests.get(ip_address+"/temperature")
    return r.json()

def getSensorReading(type, ip_address):
    ip_address = "http://" + ip_address
    # if s
    if type == "Water Sensor":
         r = requests.get(ip_address+"/temperature")
         return r.json()
    elif type == "pH sensor":
        pass
    elif type == "EC sensor":
        pass
    elif type == "TDS Sensor":
        r = requests.get(ip_address+"/tds")
        return r.json()
    else:
        pass

# print(getDeviceInfo("192.168.0.46"))