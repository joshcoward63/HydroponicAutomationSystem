import client from '../context/socket'
import React, {useState} from 'react';
// import './guage.scss';
// import './guage.js';
// import GaugeChart from 'react-gauge-chart'
// import Speedometer from "svelte-speedometer"
// import SimpleGuageChart from 'simple-react-d3-guage-chart'
// import 'simple-react-d3-guage-chart/dist/index.css'
import ReactSpeedometer from "react-d3-speedometer"
// const [areaTemp, getTemp] = useState( new getRandomArbitrary());

// client.on("areaTemp", function postAreaTemp(temp){
//   console.log("Temperature: ", temp);
// });
let areaTemp = 30;
var growRoomTemp;
var waterTemp;
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// useEffect(() => {
//   var timerID = setInterval(() => tick(), 1000);
//   return () => clearInterval(timerID);
// });

// function getTemp(){
//  areaTemp = getRandomArbitrary(60, 80);
//  setTimeout(() => {
//    getTemp();
//  }, 1000);
// }

function tick(){
  getTemp(getRandomArbitrary());
}


const Home = () => {
  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        // backgroundColor: '#fff',
        height: '10%'
      }}
    >

    <div     
     style={{
        display: "block",
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
        currentValueText = {"Room Temp: ${value}"}
        startColor ={"red"}
        endColor={"green"}
        segments={5555}
        value={areaTemp}
        // textColor={"white"}
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
        value={72}
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
              value={72}
              // textColor={textColor}
            />

        </div>

      
    </div>
    
    
  );
};
// setInterval(getTemp(),1000);

export default Home;


