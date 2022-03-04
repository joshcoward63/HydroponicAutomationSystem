import React from 'react'
import ReactSpeedometer from "react-d3-speedometer"
const Speedometer = ({temp, location}) => {
    let val = location.concat(": ");
    if(temp == null){
        temp = 0;
    }
    val=val.concat(temp);
    return(
        <div style={{
            display: "block",
            paddingTop:"2%",
            float: 'top',
            paddingBottom: '1%',
            // marginTop: '10%',
            marginRight: "1%",
            paddingRight: '1%',
            paddingLeft: '1%',
            height: '30%',
            background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box'
        }}>        
      <ReactSpeedometer style={{}}
              minValue = {50}
              maxValue = {95}
              width={250}
              height={350}
              ringWidth = {10}
              needleHeightRatio={0.7}
              maxSegmentLabels={6}
              segmentColors={["#ED2938", "#FF8C01", "#FFAA1C","#FFE733","#006B3E","#024E1B", "#006B3E","#FFE733","#FFAA1C", "#FF8C01", "#ED2938"]}
              currentValueText = {val}
              startColor ={"red"}
              endColor={"green"}
              segments={5555}
              value={temp}
              textColor={"white"}
            />
        </div>
    )
}

export default Speedometer