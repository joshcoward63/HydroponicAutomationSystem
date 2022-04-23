import React from 'react'
import ReactSpeedometer from "react-d3-speedometer"
const TDSSpeedometer = ({tds_value}) => {
    let val = "Current TDS Value".concat(": ");
    if(tds_value == null){
        tds_value = "000";
    }
    val=val.concat(tds_value);
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
              maxValue = {1200}
              width={250}
              height={350}
              ringWidth = {10}
              needleHeightRatio={0.7}
              maxSegmentLabels={6}
              segmentColors={["#ccffff", "#99ccff", "#1b97da","#5f52fe","#99cc00","#848200", "#993300","#932c00","#8c2a00", "#842800", "#7b2500", "#722200", "#651e00", "#451500", "#330f00"]}
              currentValueText = {val}
              startColor ={"#ee1c25"}
              endColor={"#462c83"}
              segments={14}
              value={tds_value}
              textColor={"white"}
            />
        </div>
    )
}

export default TDSSpeedometer