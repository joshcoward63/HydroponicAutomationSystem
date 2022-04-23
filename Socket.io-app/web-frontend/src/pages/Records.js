import React from 'react';
import Chart from '../Charts/Chart';



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
        // paddingLeft: "20%"
      }}
    >
      <iframe 
      style={{
        background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        height: '50%',
        width: '50%'
      }}
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625e5cb7-0d65-48e1-89f6-aaf64e043487&maxDataAge=3600&theme=light&autoRefresh=true">
      </iframe>
      <iframe 
      style={{
        background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        height: '50%',
        width: '50%'
      }}
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f67d1-e19c-41e2-8174-753d22a95446&maxDataAge=3600&theme=light&autoRefresh=true">
      </iframe>
      <iframe 
      style={{
        background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        height: '50%',
        width: '50%'
      }}
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f693d-3c68-46b8-8815-955d8295d820&maxDataAge=3600&theme=light&autoRefresh=true">
      </iframe>
      <iframe 
      style={{
        background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        height: '50%',
        width: '50%'
      }}
       src="https://charts.mongodb.com/charts-sensor-logger-piyrp/embed/charts?id=625f6ade-da5f-4139-876d-3a187a74a334&maxDataAge=3600&theme=light&autoRefresh=true">
      </iframe>
    {
    /* <Chart chartId={"625e5cb7-0d65-48e1-89f6-aaf64e043487"} filter={"624f6f4713b921665ed369bd"} width={"250"} height={"250"} /> */}
    </div>
  );
};

export default Records;