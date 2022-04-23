// Load Wi-Fi library
#include <WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <EEPROM.h>
#include "Arduino.h"
#include "Adafruit_ADS1X15.h"
#include "DFRobot_ESP_EC.h"
#include "EEPROM.h"

//#include <OneWire.h>
//#include <DallasTemperature.h>

//#include <ESPAsyncWebServer.h>

// Data wire is connected to GPIO 15
//#define ONE_WIRE_BUS 15

DFRobot_ESP_EC ec;
Adafruit_ADS1115 ads;

float voltage, ecValue, temperature = 22;


// Setup a oneWire instance to communicate with any OneWire devices
//OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
//DallasTemperature sensors(&oneWire);



WebServer server(80);

StaticJsonDocument<250> jsonDocument;
char buffer[250];

void setup_routing() {     \
  Serial.println("Routing setup!");
  server.on("/ec", getEC);
  server.on("/info", getInfo);    
  server.begin();    
}

void add_json_object(char *tag, String value) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["type"] = tag;
  obj["value"] = value;
}


void create_json_info(char* sensor, int quantity, char* record_type) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = sensor;
  jsonDocument["quantity"] = quantity;
  jsonDocument["record-type"] = record_type;
  serializeJson(jsonDocument, buffer);
}

void create_json_ec(char *type, float value) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = type;
  jsonDocument["value"] = value;
  serializeJson(jsonDocument, buffer);
}

void getInfo(){
   Serial.println("Getting device info!");
   create_json_info("EC Sensor", 1, "mS/cm");
   server.send(200, "application/json", buffer);
}

void getEC(){
  Serial.println("Getting EC reading!");
  create_json_ec("sensor 1", ecValue);
  server.send(200, "application/json", buffer);
}


void setup() {
  Serial.begin(115200);
  EEPROM.begin(32);//needed EEPROM.begin to store calibration k in eeprom
  ec.begin();//by default lib store calibration k since 10 change it by set ec.begin(30); to start from 30
  ads.setGain(GAIN_ONE);
  ads.begin();
  WiFiManager wifiManager;
  Serial.println("Conecting.....");
  wifiManager.autoConnect("EC Sensor");
  Serial.println("connected");

  if(!MDNS.begin("esp32")) {
     Serial.println("Error starting mDNS");
     return;
  }
  
// 
  MDNS.addService("http", "tcp", 80);
  //Name of Device and   
  MDNS.addServiceTxt("http", "tcp", "type", "EC Sensor");
  MDNS.addServiceTxt("http", "tcp", "Amount", "1");
  
  Serial.println(WiFi.localIP());
  setup_routing();
} 


void loop() {
  static unsigned long timepoint = millis();
  if (millis() - timepoint > 1000U) //time interval: 1s
  {

    timepoint = millis();
    voltage = ads.readADC_SingleEnded(0) / 10;
    Serial.print("voltage:");
    Serial.println(voltage, 4);

    //temperature = readTemperature();  // read your temperature sensor to execute temperature compensation
    Serial.print("temperature:");
    Serial.print(temperature, 1);
    Serial.println("^C");

    ecValue = ec.readEC(voltage, temperature); // convert voltage to EC with temperature compensation
    Serial.print("EC:");
    Serial.print(ecValue, 4);
    Serial.println("ms/cm");
  }
  ec.calibration(voltage, temperature); // calibration process by Serail CMD
  server.handleClient();

}
