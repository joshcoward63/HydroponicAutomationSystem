import React from 'react'
import ReactSpeedometer from "react-d3-speedometer"
const PhSpeedometer = ({ph_value}) => {
    let val = "Current PH".concat(": ");
    if(ph_value == null){
        ph_value = "000";
    }
    val=val.concat(ph_value);
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
              maxValue = {14}
              width={250}
              height={350}
              ringWidth = {10}
              needleHeightRatio={0.7}
              maxSegmentLabels={14}
              segmentColors={["#ee1c25", "#f26724", "#f8c611","#f5ed1c","#b5d333","#84c341", "#4db749","#33a94b","#22b46b", "#0ab8b6", "#4690cd", "#3853a4", "#5a51a2", "#63459d", "#462c83"]}
              currentValueText = {val}
              startColor ={"#ee1c25"}
              endColor={"#462c83"}
              segments={14}
              value={ph_value}
              textColor={"white"}
            />
        </div>
    )
}

export default PhSpeedometer