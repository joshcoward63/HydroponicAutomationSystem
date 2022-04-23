from zeroconf import Zeroconf
from requests import request
import os.path
import json

class  MDNSListener:

    def append_to_file(self, address):
        listEntry = {"sensor-number": 0, "ip-address": address}
        if os.path.exists("connectedSensors.json"):
            with open('connectedSensors.json', 'r') as file:
                json_file = json.load(file)                
                listEntry["sensor-number"] = len(json_file)
                file.close()

            with open('connectedSensors.json', 'a') as file:
                json.dump(listEntry, file)
        else:
            file = open("connectedSensors.json", "w")
            json.dump(listEntry, file)       
        file.close()

 
    def add_service(self, zeroconf, serviceType, name):
 
        info = zeroconf.get_service_info(serviceType, name)
        if len(info.properties) >= 1 :
            print("Address: " + str(info.parsed_addresses()))
            print("en: " + str(info.port))
            print("Service Name: " + info.name)
            print("Server: " + info.server)
            print("Properties: " + str(info.properties)) 
            self.append_to_file(info.parsed_addresses())
 
# zconf = Zeroconf()
 
# serviceListener = MDNSListener()
 
# zconf.add_service_listener("_http._tcp.local.", serviceListener)
 
# # input("Press enter to close... \n")
# zconf.close()