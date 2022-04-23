import client from "../context/socket"
import React, {useState} from 'react';
import Speedometer from "../components/SensorDisplay/Speedometer";
import LiquidGauge from "../components/SensorDisplay/LiquidGauge";
import PhSpeedometer from "../components/SensorDisplay/PhSpeedometer";
import ECSpeedometer from "../components/SensorDisplay/ECSpeedometer";
import TDSSpeedometer from "../components/SensorDisplay/TDSSpeedometer";
import HumiditySpeedometer from "../components/SensorDisplay/HumiditySpeedometer";
// import LiquidFillGauge from "react-liquid-gauge";
import "./index.css";

const Home = () => {
 
  const [areaTemp, setAreaTemp] = useState(null); 
  const [growRoomTemp, setGrowRoomTemp] = useState(null); 
  const [waterTemp, setWaterTemp] = useState(null); 
  const [phReading, setPHReading] = useState(null); 
  const [ecReading, setECReading] = useState(null); 
  const [tdsReading, setTDSReading] = useState(null); 
  const [waterLevelReading, setWaterLevelReading] = useState(null); 
  const [humidityReading, setHumidityReading] = useState(null); 



  client.on("temperatureReadings", function(aTemp, rTemp, wTemp ){   
    setAreaTemp(aTemp);
    setGrowRoomTemp(rTemp);
    setWaterTemp(wTemp);
  });
  client.on("areaTemp", function (aTemp){   
    console.log(aTemp);
    setAreaTemp(aTemp);
  });
  client.on("waterTemp", function (wTemp){   
    setWaterTemp(wTemp);
  });
  client.on("roomTemp", function (rTemp){   
    setGrowRoomTemp(rTemp);
  });
  client.on("phReading", function (phReading){   
    setPHReading(phReading);
  });
  client.on("ecReading", function (ecReading){   
    setECReading(ecReading);
  });
  client.on("tdsReading", function (tdsReading){   
    setTDSReading(tdsReading);
  });
  client.on("waterLevelReading", function (waterLevelReading){   
    setWaterLevelReading(waterLevelReading);
  });

  return (
    
    <div
      style={{
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        position: 'absolute',
        zIndex: '2',
        float: 'top',
        paddingLeft: "20%"
      }}>
      <div
      style={{
        display: 'inline-flex',
        width: '100%',
        height: '30%',
        alignItems: 'center',
        paddingBottom: '-10%'
        // display: 'grid',
        // gridTemplateColumns: '30% 30% 30%',
        // gridTemplateRows: '30% 30% 30%',
      }}>
        <Speedometer location ="Room Temp" temp ={areaTemp}/>
      <Speedometer location ="Water Temp" temp ={waterTemp}/>
      <Speedometer location ="Grow Room Temp" temp ={growRoomTemp}/>  
      </div>
      <div
      style={{
        display: 'inline-flex',
        width: '100%',
        height: '30%',
        alignItems: 'center',
        paddingBottom: '-10%'
        // display: 'grid',
        // gridTemplateColumns: '30% 30% 30%',
        // gridTemplateRows: '30% 30% 30%',
      }}>
      <PhSpeedometer ph_value={phReading}/> 
      <ECSpeedometer ec_value={ecReading}/>
      <TDSSpeedometer tds_value={tdsReading}/>
      </div>

      <div
      style={{
        display: 'inline-flex',
        width: '100%',
        height: '30%',
        alignItems: 'center',
        paddingBottom: '-10%'
      }}>
      <HumiditySpeedometer humidity_value={humidityReading} />  
      <LiquidGauge  waterLevel={waterLevelReading}/>

      </div>
    </div>   
  );
};

export default Home;


