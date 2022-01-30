#ifdef ESP32
  #include <WiFi.h>
  #include <ESPAsyncWebServer.h>
#else
  #include <Arduino.h>
  #include <ESP8266WiFi.h>
  #include <Hash.h>
  #include <ESPAsyncTCP.h>
  #include <ESPAsyncWebServer.h>S
#endif
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is connected to GPIO 2
#define ONE_WIRE_BUS 2

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

DeviceAddress sensor1 = { 0x28, 0xFF, 0x24, 0xE, 0xA0, 0x16, 0x3, 0xE8 };
DeviceAddress sensor2 = { 0x28, 0xFF, 0xE4, 0xC, 0xA0, 0x16, 0x3, 0xCD };
DeviceAddress sensor3= { 0x28, 0xFF, 0x79, 0x9, 0xA0, 0x16, 0x3, 0x17 };

// Variables to store temperature values
String temperatureF1 = "";
String temperatureF2 = "";
String temperatureF3 = "";
String temperatureC1 = "";

// Timer variables
unsigned long lastTime = 0;  
unsigned long timerDelay = 30000;

// Replace with your network credentials
const char* ssid = "ARRIS-555D";
const char* password = "621124665614";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);


// Set your Static IP address
IPAddress local_IP(192, 168, 1,185;
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8); // optional
IPAddress secondaryDNS(8, 8, 4, 4); // optional

String readDSTemperatureC(int num) {
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  float tempC = NULL;
  if(num == 1){
    tempC = sensors.getTempC(sensor1);
  }
  else if(num == 2){
    tempC = sensors.getTempC(sensor2);
  }
  else{
    tempC = sensors.getTempC(sensor3);
  }
  
  
  if(tempC == -127.00) {
    Serial.println("Failed to read from DS18B20 sensor");
    Serial.print("Reading: ");
    Serial.println(tempC);

    return "--";
  } else {
    Serial.print("Temperature Celsius: ");
    Serial.println(tempC); 
  }
  return String(tempC);
}

String readDSTemperatureF(int num) {
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  float tempF = NULL;
  if(num == 1){
    tempF = sensors.getTempF(sensor1);
  }
  else if(num == 2){
    tempF = sensors.getTempF(sensor2);
  }
  else{
    tempF = sensors.getTempF(sensor3);
  }

  if(int(tempF) == -196){
    Serial.println("Failed to read from DS18B20 sensor");
    return "--";
  } else {
    Serial.print("Temperature Fahrenheit: ");
    Serial.println(tempF);
  }
  return String(tempF);
}

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <style>
    html {
     font-family: Arial;
     display: inline-block;
     margin: 0px auto;
     text-align: center;
    }
    h2 { font-size: 3.0rem; }
    p { font-size: 3.0rem; }
    .units { font-size: 1.2rem; }
    .ds-labels{
      font-size: 1.5rem;
      vertical-align:middle;
      padding-bottom: 15px;
    }
  </style>
</head>
<body>
  <h2>ESP DS18B20 Server</h2>
  <h3>Sensor 1</h3>
  <p>
    <i class="fas fa-thermometer-half" style="color:#059e8a;"></i> 
    <span class="ds-labels">Temperature Celsius 1</span> 
    <span id="temperaturec1">%TEMPERATUREC1%</span>
    <sup class="units">&deg;C</sup>
  </p>
  <p>
    <i class="fas fa-thermometer-half" style="color:#059e8a;"></i> 
    <span class="ds-labels">Temperature Fahrenheit 1</span>
    <span id="temperaturef1">%TEMPERATUREF1%</span>
    <sup class="units">&deg;F</sup>
  </p>
   <h3>Sensor 2</h3>
  <p>
    <i class="fas fa-thermometer-half" style="color:#059e8a;"></i> 
    <span class="ds-labels">Temperature Fahrenheit 2</span>
    <span id="temperaturef2">%TEMPERATUREF2%</span>
    <sup class="units">&deg;F</sup>
  </p>
   <h3>Sensor 3</h3>
  <p>
    <i class="fas fa-thermometer-half" style="color:#059e8a;"></i> 
    <span class="ds-labels">Temperature Fahrenheit 3</span>
    <span id="temperaturef3">%TEMPERATUREF3%</span>
    <sup class="units">&deg;F</sup>
  </p>
</body>
<script>
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperaturec1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperaturec1", true);
  xhttp.send();
}, 10000) ;
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperaturef1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperaturef1", true);
  xhttp.send();
}, 10000) ;
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperaturef2").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperaturef2", true);
  xhttp.send();
}, 10000) ;
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperaturef3").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperaturef3", true);
  xhttp.send();
}, 10000) ;
</script>
</html>)rawliteral";

// Replaces placeholder with DS18B20 values
String processor(const String& var){
  if(var == "TEMPERATUREC1"){
//    return temperatureC1;
  }
  else if(var == "TEMPERATUREF1"){
    return temperatureF1;
  }
  else if(var == "TEMPERATUREF2"){
    return temperatureF2;
  }
  else if(var == "TEMPERATUREF3"){
    return temperatureF3;
  }
  return String();
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(115200);
  Serial.println();
  
  // Start up the DS18B20 library
  sensors.begin();

  temperatureC1 = readDSTemperatureC(1);
  temperatureF1 = readDSTemperatureF(1);
  temperatureF2 = readDSTemperatureF(2);
  temperatureF3 = readDSTemperatureF(3);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  
  // Print ESP Local IP Address
  Serial.println(WiFi.localIP());

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });
  server.on("/temperaturec1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", temperatureC1.c_str());
  });
  server.on("/temperaturef1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", temperatureF1.c_str());
  });
  server.on("/temperaturef2", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", temperatureF2.c_str());
  });
  server.on("/temperaturef3", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", temperatureF3.c_str());
  });
  // Start server
  server.begin();
}
 
void loop(){
  if ((millis() - lastTime) > timerDelay) {
    temperatureC1 = readDSTemperatureC(1);
    temperatureF1 = readDSTemperatureF(1);
    temperatureF2 = readDSTemperatureF(2);
    temperatureF3 = readDSTemperatureF(3);
    lastTime = millis();
  }  
}
