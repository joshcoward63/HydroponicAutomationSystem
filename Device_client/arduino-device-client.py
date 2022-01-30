
"""This Client connects directly to Misty and relays commands between Misty and Nodejs server"""
from Device_client.esp_server_controller import getGrowRoomTemp, getSurroundingAreaTemp, getWaterTemp
import socketio
import requests
import json
import threading
import time
from PIL import Image
from MistyAPI import Robot
from io import BytesIO
import base64
import av
from PIL import Image
import io
from collections import deque
import numpy as np
import selenium
import esp_server_controller

#Creates the client
sio = socketio.Client()

server_ip = "http://" + "192.168.0.214" + ":" +"5000"
#Connects to server
sio.connect(server_ip)

#Gets the temperature reading of the grow room
@sio.on("getRoomTemp")
def sendRoomTemp():
    roomTemp = getGrowRoomTemp()
    sio.emit("growRoomTemp", roomTemp)

#Gets the temperature reading of the water in the system
def sendWaterTemp():
    waterTemp = getWaterTemp()
    sio.emit("waterTemp", waterTemp)

#Gets the temperature reading of the surrounding area
@sio.on("getAreaTemp")
def sendAreaTemp():
    areaTemp = getSurroundingAreaTemp()
    sio.emit("growAreaTemp", areaTemp)

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