import React from 'react'
import ReactSpeedometer from "react-d3-speedometer"
const ECSpeedometer = ({ec_value}) => {
    let val = "Current EC Level".concat(": ");
    if(ec_value == null){
        ec_value = "000";
    }
    val=val.concat(ec_value);
    return(
        <div style={{
            display: "block",
            paddingTop:"2%",
            float: 'top',
            paddingBottom: '1%',
            marginTop: '5%',
            marginRight: "1%",
            paddingRight: '1%',
            paddingLeft: '1%',
            height: '100%',
            background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box'
        }}>        
      <ReactSpeedometer style={{}}
              minValue = {0}
              maxValue = {5000}
              width={250}
              height={350}
              ringWidth = {10}
              needleHeightRatio={0.7}
              maxSegmentLabels={7}
              currentValueText = {val}
              startColor ={"white"}
              endColor={"blue"}
              segments={555}
              value={ec_value}
              textColor={"white"}
            />
        </div>
    )
}

export default ECSpeedometer