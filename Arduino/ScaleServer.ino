// Load Wi-Fi library
//#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <HX711_ADC.h>

//Wifi Info
const char *SSID = "ARRIS-555D";
const char *PWD = "621124665614"; 

//pins:
const int HX711_dout = 4; //mcu > HX711 dout pin
const int HX711_sck = 5; //mcu > HX711 sck pin

//HX711 constructor:
HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_calVal_eepromAdress = 0;
unsigned long t = 0;

WebServer server(80);

StaticJsonDocument<250> jsonDocument;
char buffer[250];


void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(SSID);
  
  WiFi.begin(SSID, PWD);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
    
  }
 
  Serial.print("Connected. IP: ");
  Serial.println(WiFi.localIP());
}

void setup_routing() {     
  server.on("/getWeight", HTTP_GET, getWeight);
  server.begin();    
}
 
void create_json(char *tag, String value) {  
  jsonDocument.clear();  
  jsonDocument["type"] = tag;
  jsonDocument["value"] = value;
  serializeJson(jsonDocument, buffer);
}
 
void add_json_object(char *tag, String value) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["type"] = tag;
  obj["value"] = value;
}

void getWeight(){
  Serial.println("Getting current load");
  static boolean newDataReady = 0;
  static boolean newDataReady = 0;
  if (newDataReady) {    
     float i = LoadCell.getData();
     Serial.print("Load_cell output val: ");
     Serial.println(i);
     newDataReady = 0;
     t = millis();  
     create_json("weight", i); 
     server.send(200,"application/json", buffer);
  }  
}

void setup() {     
  Serial.begin(57600);    
  Serial.println("Starting...");
  float calibrationValue; // calibration value
  calibrationValue = 9355.53;
  LoadCell.begin();
  unsigned long stabilizingtime = 2000;
  boolean _tare = true;
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
  }
  else {
    LoadCell.setCalFactor(calibrationValue); // set calibration factor (float)
    Serial.println("Startup is complete");
  }
  while (!LoadCell.update());
  Serial.print("Calibration value: ");
  Serial.println(LoadCell.getCalFactor());
  Serial.print("HX711 measured conversion time ms: ");
  Serial.println(LoadCell.getConversionTime());
  Serial.print("HX711 measured sampling rate HZ: ");
  Serial.println(LoadCell.getSPS());
  Serial.print("HX711 measured settlingtime ms: ");
  Serial.println(LoadCell.getSettlingTime());
  Serial.println("Note that the settling time may increase significantly if you use delay() in your sketch!");
  if (LoadCell.getSPS() < 7) {
    Serial.println("!!Sampling rate is lower than specification, check MCU>HX711 wiring and pin designations");
  }
  else if (LoadCell.getSPS() > 100) {
    Serial.println("!!Sampling rate is higher than specification, check MCU>HX711 wiring and pin designations");
  }
  
  connectToWiFi();  
  setup_routing();     
  
}

void loop() {    
  server.handleClient();     
}