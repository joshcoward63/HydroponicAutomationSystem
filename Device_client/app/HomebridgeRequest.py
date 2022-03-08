from email import header
from re import A
from webbrowser import get
import requests
import time

global bearer_token
global headers
global devices



def homebridgeLogin():
    json = {
        "username": "admin", 
        "password": 'admin'
    }
    r = requests.post("http://192.168.0.18:8581/api/auth/login", json=json)
    # print(r.status_code)
    if(r.status_code != 201):
        print("Homebridge login request failed with status code ",r.status_code,"\n") 
    else:
        bearer_token = r.json()['access_token']
        # print(bearer_token)
        return bearer_token

def restartHombridge():
    r = requests.put("http://192.168.0.18:8581/api/server/restart", headers=headers)
    if r.status_code != 200:
        print("Unable to restart Homebridge, status code: " + r.status_code)

def getAccessories():
    r = requests.get("http://192.168.0.18:8581/api/accessories", headers=headers)
    # print(r.json())

def getAccessoriesLayout():
    r = requests.get("http://192.168.0.18:8581/api/accessories/layout", headers=headers)
    devices = {}
    devices_dict = r.json()[0]['services']
    for device in devices_dict: 
        try:
            devices[device['customName']] = device['uniqueId']
        except:
            pass
    return devices



def turnOnExhaustFan():
    id = devices["Exhaust Fan"]    
    json = {
        "characteristicType": "On",
        "value": "True"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)

def turnOffExhaustFan():
    id = devices["Exhaust Fan"]    
    json = {
        "characteristicType": "On",
        "value": "False"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)

def turnOnRegularFan():
    id = devices["Regular Fan"]    
    json = {
        "characteristicType": "On",
        "value": "True"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)

def turnOffRegularFan():
    id = devices["Regular Fan"]    
    json = {
        "characteristicType": "On",
        "value": "False"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)


def getExhaustFanState():
    id = devices["Exhaust Fan"]
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.get(url, headers=headers)
    fan_state =r.json()['serviceCharacteristics'][0]['value']
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)
        return
    if fan_state == 0:
        return 'Off'
    else:
        return "On"

def getRegularFanState():
    id = devices["Regular Fan"]
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.get(url, headers=headers)
    fan_state =r.json()['serviceCharacteristics'][0]['value']
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)
        return
    if fan_state == 0:
        return 'Off'
    else:
        return "On"




def turnDeviceOn(device_name):
    id = devices[device_name]    
    json = {
        "characteristicType": "On",
        "value": "True"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)

def turnDeviceOff(device_name):
    id = devices[device_name]    
    json = {
        "characteristicType": "On",
        "value": "False"
    }
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.put(url, headers=headers, json=json)
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)


def getDeviceState(device_name):
    id = devices[device_name]
    url = "http://192.168.0.18:8581/api/accessories/" + id
    r = requests.get(url, headers=headers)
    # print(r.json()['serviceCharacteristics'])
    state = r.json()['serviceCharacteristics'][0]['value']
    if r.status_code != 200:
        print('Unable to make request to turn on fan status code: ' + r.status_code)
        return
    if state == 0:
        return 'Off'
    else:
        return "On"

bearer_token = homebridgeLogin()
headers = {"Authorization": 'Bearer ' + bearer_token}
# time.sleep(10)
# restartHombridge()
devices = getAccessoriesLayout()