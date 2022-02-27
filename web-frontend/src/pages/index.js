import client from '../context/socket'
import React, {useState} from 'react';
import ReactSpeedometer from "react-d3-speedometer"


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
        // backgroundColor: 'rgb(0,0,0)',
        // backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        zIndex: '2'
        // height: '10%'
      }}
    >

    <div     
     style={{
        display: "block",
        paddingTop:"2%",
        // paddingBottom: "0%",
        marginTop: '10%',
        marginRight: "1%",
        paddingRight: '1%',
        paddingLeft: '1%',
        backgroundColor: "#517a04",
      }}>  
    <ReactSpeedometer
        minValue = {50}
        maxValue = {95}
        width={250}
        height={350}
        ringWidth = {10}
        needleHeightRatio={0.7}
        maxSegmentLabels={6}
        segmentColors={["#ED2938", "#FF8C01", "#FFAA1C","#FFE733","#006B3E","#024E1B", "#006B3E","#FFE733","#FFAA1C", "#FF8C01", "#ED2938"]}
        currentValueText = {"Room Temp: ${value}"}
        startColor ={"red"}
        endColor={"green"}
        segments={5555}
        value={areaTemp}
        textColor={"white"}
        
      />
      {/* <h1>Room Temp</h1> */}
      </div>
      <div    
      style={{
        paddingTop:"5%",
        paddingRight: '50px'
      }}>
      <ReactSpeedometer
        minValue = {50}
        maxValue = {95}
        width={250}
        height={350}
        ringWidth = {10}
        needleHeightRatio={0.7}
        maxSegmentLabels={6}
        segmentColors={["#ED2938", "#FF8C01", "#FFAA1C","#FFE733","#006B3E","#024E1B", "#006B3E","#FFE733","#FFAA1C", "#FF8C01", "#ED2938"]}
        currentValueText = {"Water Temp: ${value}"}
        startColor ={"red"}
        endColor={"green"}
        segments={5555}
        value={waterTemp}
        // textColor={textColor}
      />
      </div>
      <div
          style={{
            paddingTop:"5%",
            paddingRight: '50px'
          }}>
        
      <ReactSpeedometer
              minValue = {50}
              maxValue = {95}
              width={250}
              height={350}
              ringWidth = {10}
              needleHeightRatio={0.7}
              maxSegmentLabels={6}
              segmentColors={["#ED2938", "#FF8C01", "#FFAA1C","#FFE733","#006B3E","#024E1B", "#006B3E","#FFE733","#FFAA1C", "#FF8C01", "#ED2938"]}
              currentValueText = {"Grow Room Temp: ${value}"}
              startColor ={"red"}
              endColor={"green"}
              segments={5555}
              value={growRoomTemp}
              // textColor={textColor}
            />

        </div>

      
    </div>
    
    
  );
};
// setInterval(getTemp(),1000);

export default Home;


