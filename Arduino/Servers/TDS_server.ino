// Load Wi-Fi library
//#include <WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <ArduinoJson.h>
//#include <OneWire.h>
//#include <DallasTemperature.h>

//#include <ESPAsyncWebServer.h>

// Data wire is connected to GPIO 15
//#define ONE_WIRE_BUS 15

#define TdsSensorPin 33
#define VREF 3.3              // analog reference voltage(Volt) of the ADC
#define SCOUNT  30            // sum of sample point

// Setup a oneWire instance to communicate with any OneWire devices
//OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
//DallasTemperature sensors(&oneWire);
const char* ssid = "ARRIS-555D";
const char* password =  "621124665614";


WebServer server(80);

StaticJsonDocument<250> jsonDocument;
char buffer[250];

void setup_routing() {     \
  Serial.println("Routing setup!");
  server.on("/tds", getTDS);
  server.on("/info", getInfo);    
  server.begin();    
}

void add_json_object(char *tag, String value) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["type"] = tag;
  obj["value"] = value;
}

void create_json_info(char* sensor,int num, char * record_type) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = sensor;
  jsonDocument["quantity"] = num;
  jsonDocument["record-type"] = record_type;
  serializeJson(jsonDocument, buffer);
}

void create_json_tds(char *type, float value1) {  
  jsonDocument.clear();  
  jsonDocument["sensor"] = type;
  jsonDocument["value"] = value1;
  serializeJson(jsonDocument, buffer);
}

int analogBuffer[SCOUNT];     // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0;
int copyIndex = 0;

float averageVoltage = 0;
float tdsValue = 0;
float temperature = 20;       // current temperature for compensation


void getInfo(){
   Serial.println("Getting device info!");
   create_json_info("TDS Sensor", 1, "ppm");
   server.send(200, "application/json", buffer);
}

void getTDS(){
  Serial.println("Getting TDS reading!");
  create_json_tds("sensor 1", tdsValue);
  server.send(200, "application/json", buffer);
}



void setup() {
  Serial.begin(115200);
  
  WiFiManager wifiManager;
  Serial.println("Conecting.....");
  wifiManager.autoConnect("TDS Sensor");
  Serial.println("connected");

 
  if(!MDNS.begin("esp32")) {
     Serial.println("Error starting mDNS");
     return;
  }
  
// 
  MDNS.addService("http", "tcp", 80);
  //Name of Device and   
  MDNS.addServiceTxt("http", "tcp", "type", "TDS Sensor");
  MDNS.addServiceTxt("http", "tcp", "Amount", "1");
  
  Serial.println(WiFi.localIP());
  setup_routing();
} 


void loop() {pinMode(TdsSensorPin,INPUT);
  static unsigned long analogSampleTimepoint = millis();
  if(millis()-analogSampleTimepoint > 40U){     //every 40 milliseconds,read the analog value from the ADC
    analogSampleTimepoint = millis();
    analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);    //read the analog value and store into the buffer
    analogBufferIndex++;
    if(analogBufferIndex == SCOUNT){ 
      analogBufferIndex = 0;
    }
  }   
  
  static unsigned long printTimepoint = millis();
  if(millis()-printTimepoint > 800U){
    printTimepoint = millis();
    for(copyIndex=0; copyIndex<SCOUNT; copyIndex++){
      analogBufferTemp[copyIndex] = analogBuffer[copyIndex];
      
      // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF / 4096.0;
      
      //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0)); 
      float compensationCoefficient = 1.0+0.02*(temperature-25.0);
      //temperature compensation
      float compensationVoltage=averageVoltage/compensationCoefficient;
      
      //convert voltage value to tds value
      tdsValue=(133.42*compensationVoltage*compensationVoltage*compensationVoltage - 255.86*compensationVoltage*compensationVoltage + 857.39*compensationVoltage)*0.5;
      
      //Serial.print("voltage:");
      //Serial.print(averageVoltage,2);
      //Serial.print("V   ");
      Serial.print("TDS Value:");
      Serial.print(tdsValue,0);
      Serial.println("ppm");
    }
  }
  
  server.handleClient();

}

// median filtering algorithm
int getMedianNum(int bArray[], int iFilterLen){
  int bTab[iFilterLen];
  for (byte i = 0; i<iFilterLen; i++)
  bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0){
    bTemp = bTab[(iFilterLen - 1) / 2];
  }
  else {
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  }
  return bTemp;
}
