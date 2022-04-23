from zeroconf import Zeroconf
from requests import request
import os.path

class  MDNSListener:

    def append_to_file(self, properties, address):
        print(properties)
        for key in properties.keys():
            print(key, properties[key])
        listEntry = {"sensor-name": str(properties[b'type']).replace("b'", '').replace("'", ''), "ip-address": address, "sensor-count": str(properties[b'Amount']).replace("b'", '').replace("'", '')}
        if "Sensor" in str(properties[b'type']):
            if os.path.exists("connectedSensors.txt"):
                print("kdhkljakdlka")
                with open('connectedSensors.txt', 'a') as file:
                    file.write("%s\n" % listEntry)
            else:
                file = open("connectedSensors.txt", "w")
                file.write("%s\n" % listEntry)
        elif "Device" in str(properties[b'type']):
            if os.path.exists("connectedDevices.txt"):
                with open('connectedDevices.txt', 'a') as file:
                    file.write("%s\n" % listEntry)
            else:
                file = open("connectedDevices.txt", "w")
                file.write("%s\n" % listEntry)             
        file.close()

 
    def add_service(self, zeroconf, serviceType, name):
 
        info = zeroconf.get_service_info(serviceType, name)
        if len(info.properties) >= 1 :
            print("Address: " + str(info.parsed_addresses()))
            print("en: " + str(info.port))
            print("Service Name: " + info.name)
            print("Server: " + info.server)
            print("Properties: " + str(info.properties)) 
            self.append_to_file(info.properties, info.parsed_addresses())
 
zconf = Zeroconf()
 
serviceListener = MDNSListener()
 
zconf.add_service_listener("_http._tcp.local.", serviceListener)
 
input("Press enter to close... \n")
zconf.close()