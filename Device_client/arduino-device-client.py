
"""This Client connects directly to Misty and relays commands between Misty and Nodejs server"""
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


#Creates the client
sio = socketio.Client()




server_ip = "http://" + "192.168.0.214" + ":" +"5000"
#Connects to server
sio.connect(server_ip)


#Recieves text and converts it to speech for Misty
@sio.on("text")
def textToSpeech(text):
    global robot
    print(text)
    robot.say(text)

#Sends Individual Robot info
@sio.on("robotInfo")
def message4(sid):
    info = {"SID": sid, "Name": name, "IP": robot_ip}
    print(info)
    sio.emit("getInfo", info)

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