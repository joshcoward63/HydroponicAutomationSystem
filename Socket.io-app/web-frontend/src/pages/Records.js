import React from 'react';
import Chart from '../Charts/Chart';
import './index.css'


const Records = () => {
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
        paddingTop: '5%',
        paddingLeft: "10%",
        alignContent: "space-between"
      }}
    >
      <iframe className='chart'
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625e5cb7-0d65-48e1-89f6-aaf64e043487&maxDataAge=3600&theme=dark&autoRefresh=true">
      </iframe>

      <iframe className='chart'
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f67d1-e19c-41e2-8174-753d22a95446&maxDataAge=3600&theme=dark&autoRefresh=true">
      </iframe>

      <iframe className='chart'      
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f693d-3c68-46b8-8815-955d8295d820&maxDataAge=3600&theme=dark&autoRefresh=true">
      </iframe>
      
      <iframe className='chart'
      src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f6ade-da5f-4139-876d-3a187a74a334&maxDataAge=3600&theme=dark&autoRefresh=true">
      </iframe>
    {
    /* <Chart chartId={"625e5cb7-0d65-48e1-89f6-aaf64e043487"} filter={"624f6f4713b921665ed369bd"} width={"250"} height={"250"} /> */}
    </div>
  );
};

export default Records;