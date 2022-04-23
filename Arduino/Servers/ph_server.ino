#include <Arduino.h>
#include <WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include "DFRobot_ESP_PH_WITH_ADC.h"
#include <EEPROM.h>
//#include <OneWire.h>
//#include <DallasTemperature.h>
#include <WebSerial.h>
//#include <ESPAsyncWebServer.h>
#include "Adafruit_ADS1X15.h"
// Data wire is connected to GPIO 15
//#define ONE_WIRE_BUS 15


DFRobot_ESP_PH_WITH_ADC ph;
Adafruit_ADS1115 ads;

float voltage, phValue, temperature = 21;

// Setup a oneWire instance to communicate with any OneWire devices
//OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
//DallasTemperature sensors(&oneWire);



WebServer server(80);

StaticJsonDocument<250> jsonDocument;
char buffer[250];

void setup_routing() {     
  Serial.println("Routing setup!");
  server.on("/ph", getPH);
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

void create_json_ph(char *type, float value1) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = type;
  jsonDocument["value"] = value1;
  serializeJson(jsonDocument, buffer);
}

void getInfo(){
   Serial.println("Getting device info!");
   create_json_info("pH Sensor", 1, "pH");
   server.send(200, "application/json", buffer);
}

void getPH(){
  Serial.println("Getting pH reading!");
  create_json_ph("sensor 1", phValue);
  server.send(200, "application/json", buffer);
}


void setup() {
  Serial.begin(115200);
  EEPROM.begin(32);//needed EEPROM.begin to store calibration k in eeprom
  ph.begin();
//  sensors.begin();
  ads.setGain(GAIN_ONE);
  ads.begin();
  WiFiManager wifiManager;
  Serial.println("Conecting.....");
  wifiManager.autoConnect("pH Sensor");
  Serial.println("connected");

  if(!MDNS.begin("esp32")) {
     Serial.println("Error starting mDNS");
     return;
  }
  
// 
  MDNS.addService("http", "tcp", 80);
  //Name of Device and   
  MDNS.addServiceTxt("http", "tcp", "type", "pH Sensor");
  MDNS.addServiceTxt("http", "tcp", "Amount", "1");
  
  Serial.println(WiFi.localIP());
  setup_routing();
  
} 


void loop() {
  static unsigned long timepoint = millis();
  if (millis() - timepoint > 1000U) //time interval: 1s
  {
    timepoint = millis();
    /**
     * index 0 for adc's pin A0
     * index 1 for adc's pin A1
     * index 2 for adc's pin A2
     * index 3 for adc's pin A3
    */
    voltage = ads.readADC_SingleEnded(1) / 10; // read the voltage
    Serial.print("voltage:");
    Serial.println(voltage, 4);

//    temperature = readTemperature(); // read your temperature sensor to execute temperature compensation
    Serial.print("temperature:");
    Serial.print(temperature, 1);
    Serial.println("^C");

    phValue = ph.readPH(voltage, temperature); // convert voltage to pH with temperature compensation
    Serial.print("pH:");
    Serial.println(phValue, 4);
  }
  ph.calibration(voltage, temperature); // calibration process by Serail CMD
  
  server.handleClient();

}
