import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({chartId, height, width}) => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-sensor-logger-piyrp'});
  // const chartDiv = useRef(null);
  // const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "dark"}));
  // chart.render(document.getElementById("chart"));
  // useEffect(() => {
  //   chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  // }, [chart]);

  // useEffect(() => {
  //   // if (rendered) {
  //   //   chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
  //   // }
  // }, [chart, rendered]);

  return <div className="chart" ref={chart.render()}/>;
};

export default Chart;




// const chart = sdk.createChart({
//     chartId: "625e5cb7-0d65-48e1-89f6-aaf64e043487",
//     width: '25%',
//     height: '25%',
//     theme: 'dark'
// });

// chart.render(document.getElementById('chart'));