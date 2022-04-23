import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
 
const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-sensor-logger-piyrp'
});

const chart1 = sdk.createChart({chartId: "625e5cb7-0d65-48e1-89f6-aaf64e043487"});

chart1.render(document.getElementById("chart1"));