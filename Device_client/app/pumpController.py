import requests
import time

""" Gets the  current ON/OFF states of the nutrient dispensing pumps """
def getPumpStates():
    states = {
        0: "",
        1: "",
        2: "",
        3: ""
    }
    r = requests.post("http://192.168.0.142/pumpState", json={"pump": 1})
    states[0] = r.json()['value']
    r = requests.post("http://192.168.0.142/pumpState", json={"pump": 2})
    states[1] = r.json()['value']
    r = requests.post("http://192.168.0.142/pumpState", json={"pump": 3})
    states[2] =r.json()['value']
    r = requests.post("http://192.168.0.142/pumpState", json={"pump": 4})
    states[3] = r.json()['value']
    
    return states

""" Turns on a nutrient/ph controlling pump for a set duration """
def turnOnPump(pump, duration):
    if pump == "MasterBlend":
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":1, "state": "on"})
        time.sleep(duration)
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":1, "state": "off"})
 
    elif pump == "Epsom Salt":
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":2, "state": "on"})
        time.sleep(duration)
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":2, "state": "off"})
 
    elif pump == "Calcium Nitrate":
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":3, "state": "on"})
        time.sleep(duration)
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":3, "state": "off"})
 
    elif pump == "Ph Down":
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":4, "state": "on"})
        time.sleep(duration)
        r = requests.post("http://192.168.0.142/togglePump", json={"pump":4, "state": "off"})
 
    else:
        print("Error Pump does not exist!") 
    return 'success'