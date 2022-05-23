import React from 'react';
import Chart from '../components/Charts/Chart'
import './index.css'


const Records = () => {
  
  return (
    <div
      style={{
        display: 'block',
        gridRowGap: '-50%',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        position: 'absolute',
        zIndex: '2',
        float: 'top',
        paddingTop: '2.5%',
        paddingLeft: "10%",
      }}
    >

    
      <div className='charts'>      
      <Chart  chartId={"625e5cb7-0d65-48e1-89f6-aaf64e043487"} filter={{"timestamp":{$gte:ISODate(new Date()-7),$lt:ISODate(new Date())}}} width={"100%"} height={"100%"} />

        {/* <Chart  chartId={"625e5cb7-0d65-48e1-89f6-aaf64e043487"} filter={{ "timestamp": { $gt: new Date()}}} width={"100%"} height={"100%"} /> */}
        <Chart chartId={"625f67d1-e19c-41e2-8174-753d22a95446"} filter={'null'} width={"100%"} height={"100%"}/>
      </div>
      
      <div className='charts'> 
        <Chart  chartId={"625f693d-3c68-46b8-8815-955d8295d820"} filter={'null'} width={"100%"} height={"100%"} />
        <Chart chartId={"625f6ade-da5f-4139-876d-3a187a74a334"} filter={'null'} width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default Records; 