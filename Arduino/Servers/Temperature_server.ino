// Load Wi-Fi library
#include <WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

//#include <ESPAsyncWebServer.h>

// Data wire is connected to GPIO 15
#define ONE_WIRE_BUS 15

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

//The following address correspond to a ds18b20 sensor these need to be dynamically found 
DeviceAddress sensor1 = { 0x28, 0xFF, 0x38, 0x5E, 0xA3, 0x16, 0x5, 0x54 };
DeviceAddress sensor2 = { 0x28, 0xFF, 0x24, 0xE, 0xA0, 0x16, 0x3, 0xE8 };
DeviceAddress sensor3= { 0x28, 0xFF, 0x45, 0xB, 0xA0, 0x16, 0x3, 0xB5 };


// Variables to store temperature values
String temperatureF1 = "";
String temperatureF2 = "";
String temperatureF3 = "";

// Timer variables
unsigned long lastTime = 0;  
unsigned long timerDelay = 5000;

//AsyncWebServer server(80);
WebServer server(80);

StaticJsonDocument<250> jsonDocument;
char buffer[250];

void setup_routing() {     
  server.on("/temperature", getTemperature);
  server.on("/info", getInfo);    
  server.begin();    
}

void add_json_object(char *tag, String value) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["type"] = tag;
  obj["value"] = value;
}

void create_json_info(char* sensor, int quantity, char * record_type) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = sensor;
  jsonDocument["quantity"] = quantity;
  jsonDocument["record-type"] = record_type;
  serializeJson(jsonDocument, buffer);
}

void create_json_temperature(char * tag1, String value1, char *tag2, String value2, char *tag3, String value3) {  
  jsonDocument.clear();  
  jsonDocument["sensor1"] = tag1;
  jsonDocument["value1"] = value1;
  jsonDocument["sensor2"] = tag2;
  jsonDocument["value2"] = value2;
  jsonDocument["sensor3"] = tag3;
  jsonDocument["value3"] = value3;
  serializeJson(jsonDocument, buffer);
}

float readDSTemperatureF(int id) {
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  float temp;
  if(id == 1){      
    temp =sensors.getTempF(sensor1);
    Serial.print(" Sensor 1(*F): ");
    Serial.println(sensors.getTempF(sensor1));
  }
  else if( id == 2){
    temp = sensors.getTempF(sensor2);
    Serial.print(" Sensor 2(*F): ");
    Serial.println(sensors.getTempF(sensor2));
  }
  else{
    temp = sensors.getTempF(sensor3);
    Serial.print(" Sensor 3(*F): ");
    Serial.println(sensors.getTempF(sensor3));
  }
  return temp;
}

void getInfo(){
   Serial.println("Getting device info!");
   create_json_info("Water Sensor", 3, "fahrenheit");
   server.send(200, "application/json", buffer);
}

void getTemperature(){
  Serial.println("Getting temperature reading!");
  create_json_temperature("sensor 1", temperatureF1, "sensor 2", temperatureF2, "sensor 3", temperatureF3);
  server.send(200, "application/json", buffer);
}

void setup() {
  Serial.begin(115200);
  WiFiManager wifiManager;
  Serial.println("Conecting.....");
  wifiManager.autoConnect("Water Sensor");
  Serial.println("connected");

  if(!MDNS.begin("esp32")) {
     Serial.println("Error starting mDNS");
     return;
  }
 
  MDNS.addService("http", "tcp", 80);
  //Name of Device and   
  MDNS.addServiceTxt("http", "tcp", "type", "Water Sensor");
  MDNS.addServiceTxt("http", "tcp", "Amount", "3");
 
  Serial.println(WiFi.localIP());
   
//  server.on("/hello", HTTP_GET, [](AsyncWebServerRequest *request){
//    request->send(200, "text/plain", "Hello World");
////  });
//  server.on("/hello", HTTP_GET , "Hello World"); 
//  server.begin();
setup_routing();
}


void loop() {
    if ((millis() - lastTime) > timerDelay) {
    temperatureF1 = readDSTemperatureF(1);
    temperatureF2 = readDSTemperatureF(2); 
    temperatureF3 = readDSTemperatureF(3);
    lastTime = millis();
  }  
  server.handleClient();

}
