#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const char *SSID = "ARRIS-555D";
const char *PWD = "621124665614"; 

// Auxiliar variables to store the current output state
String output1State = "off";
String output2State = "off";
String output3State = "off";
String output4State = "off";

// Assign output variables to GPIO pins
const int output1 = 15;
const int output2 = 2;
const int output3 = 4;
const int output4 = 5;

WebServer server(80);
 

//Adafruit_BME280 bme;

//Adafruit_NeoPixel pixels(NUM_OF_LEDS, PIN, NEO_GRB + NEO_KHZ800);
 

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
  server.on("/pumpState", HTTP_POST, getPumpState);
  server.on("/togglePump", HTTP_POST , togglePump);    
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

//void read_sensor_data(void * parameter) {
//   for (;;) {
//     temperature = 24;
//     humidity = 32;
//     pressure = 88;
//     Serial.println("Read sensor data");
// 
//     
//     vTaskDelay(60000 / portTICK_PERIOD_MS);
//   }
//}


void getPumpState(){
  Serial.println("Get Pump state");
  if (server.hasArg("plain") == false) {
    server.send(200, "text/plain", "Body not received");
   }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body); 
 
  int pump = jsonDocument["pump"];
  Serial.println(body);
  Serial.println(pump);
  if(pump == 1){
    create_json("pump1State", output1State);
  }
  else if(pump == 2){
    create_json("pump2State", output2State);
    Serial.println("test inside");
  }
  else if(pump == 3){
    create_json("pump3State", output3State);
  }
  else if(pump == 4){
    create_json("pump4State", output4State);
  }
  Serial.println("test2");
  server.send(200,"application/json", buffer);
}


void togglePump(){
  if (server.hasArg("plain") == false) {
    server.send(200, "text/plain", "Body not received");
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  
  
  int pump = jsonDocument["pump"];
  String state = jsonDocument["state"];
  int val;
  if(state == "on"){
    val = 0;
  }
  else{
    val = 1;
  }
  
  
  if(pump == 1){
    output1State = state;
    digitalWrite(output1, val);
  }
  else if(pump == 2){
    output2State = state;
    digitalWrite(output2, val);
  }
  else if(pump == 3){
    output3State = state;
    digitalWrite(output3, val);
  }
  else if(pump == 4){
    output4State = state;
    digitalWrite(output4, val);
  }
  server.send(200, "application/json", "{}");
}



 



//void setup_task() {    
//  xTaskCreate(     
//  read_sensor_data,      
//  "Read sensor data",      
//  1000,      
//  NULL,      
//  1,     
//  NULL     
//  );     
//}

void setup() {     
  Serial.begin(9600);    
  // Initialize the output variables as outputs
  pinMode(output1, OUTPUT);
  pinMode(output2, OUTPUT);
  pinMode(output3, OUTPUT);
  pinMode(output4, OUTPUT);
  digitalWrite(output1, HIGH);
  digitalWrite(output2, HIGH);
  digitalWrite(output3, HIGH);
  digitalWrite(output4, HIGH);
  
//  if (!bme.begin(0x76)) {    
//    Serial.println("Problem connecting to BME280");    
//  }    
  connectToWiFi();     
//  setup_task();    
  setup_routing();     
  
//  pixels.begin();    
}    
       
void loop() {    
  server.handleClient();     
}