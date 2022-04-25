import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({filter, chartId, height, width}) => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-sensor-logger-piyrp'});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "dark", background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box'}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div className='chart'
  // style={{
  //   background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
  //   border: "none",
  //   borderRadius: '2px',
  //   boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
  //   height: "45%",
  //   width: "45%",
  // }}
 ref={chartDiv}/>;
};

export default Chart;