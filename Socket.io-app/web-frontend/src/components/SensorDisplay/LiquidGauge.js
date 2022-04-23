import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';



const LiquidGauge = ({waterLevel}) => {
    
    let val = "Water Level".concat(": ");
    if(waterLevel == null){
        waterLevel = "000";
    }
    val=val.concat(waterLevel).concat(" Gallons");
    let state = {
        value: waterLevel
    };
    let startColor = '#6495ed'; // cornflowerblue
    let endColor = '#dc143c'; // crimson
    const radius = 80;
        const interpolate = interpolateRgb(startColor,endColor);
        const fillColor = interpolate(state.value/1000);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];
    return(
        <div
        style={{
            display: "block",
            paddingTop:"2%",
            float: 'top',
            paddingBottom: '3%',
            marginTop: '5%',
            marginRight: "1%",
            paddingRight: '1%',
            paddingLeft: '1%',
            width: '250px',
            height: '   100%',
            color: "white",
            background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box'
        }}>
 <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={state.value}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />
                <h1 style={{
                    fontSize: "100%",
                    textAlign: 'center'
                }}>{val}</h1>
        </div>
    );     
}

export default LiquidGauge