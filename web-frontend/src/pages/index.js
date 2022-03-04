import client from "../context/socket"
import React, {useState} from 'react';
import Speedometer from "../components/SensorDisplay/Speedometer";


const Home = () => {
 
  const [areaTemp, getAreaTemp] = useState(null); 
  const [growRoomTemp, getGrowRoomTemp] = useState(null); 
  const [waterTemp, getWaterTemp] = useState(null); 

  client.on("temperatureReadings", function(aTemp, rTemp, wTemp ){   
    getAreaTemp(aTemp);
    getGrowRoomTemp(rTemp);
    getWaterTemp(wTemp);
  });
  client.on("areaTemp", function (aTemp){   
    getAreaTemp(aTemp);
  });
  client.on("waterTemp", function (wTemp){   
    getWaterTemp(wTemp);
  });
  client.on("roomTemp", function ( rTemp ){   
    getGrowRoomTemp(rTemp);
  });

  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        position: 'absolute',
        zIndex: '2'
      }}>
      <Speedometer location ="Room Temp" temp ={areaTemp}/>
      <Speedometer location ="Water Temp" temp ={waterTemp}/>
      <Speedometer location ="Grow Room Temp" temp ={growRoomTemp}/>      
    </div>   
  );
};

export default Home;


