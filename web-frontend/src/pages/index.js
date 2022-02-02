import React from 'react';
// import './guage.scss';
// import './guage.js';
// import GaugeChart from 'react-gauge-chart'
// import Speedometer from "svelte-speedometer"
// import SimpleGuageChart from 'simple-react-d3-guage-chart'
// import 'simple-react-d3-guage-chart/dist/index.css'
import ReactSpeedometer from "react-d3-speedometer"
const Home = () => {
  return (
    
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >


      {/* <ReactSpeedometer
        maxValue = {120}
        customSegmentStops={[0, 32, 38, 120, 900]}
        segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
        value={333}
      /> */}
      <ReactSpeedometer
        maxValue = {120}
        width={300}
        // height={100}
        ringWidth = {10}
        needleHeightRatio={0.7}
        maxSegmentLabels={5}
        segmentColors={["red", "yellow", "green", "yellow", "red"]}
        startColor ={"red"}
        endColor={"green"}
        segments={5555}
        value={72}
        // textColor={textColor}
      />
      <div class="gauge-container">
        <div class="gauge"></div>
        <div class="gauge"></div>
        <div class="gauge"></div>
      </div>



      
    </div>
    
    
  );
};

export default Home;


