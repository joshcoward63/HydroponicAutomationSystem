import React, {useState} from 'react';
import Device from   '../Device/Device';
import './Card.css'

function fanState(){
    if (document.getElementById("button").innerHTML =='on'){
        document.getElementById("button").innerHTML = 'off';
    }
    else{
        document.getElementById("button").innerHTML = 'on';
    }
}
export default[ 
    [
    <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#edefea'

        }}>
        <div>
        {/* <h2>Devices:</h2>   */}
        </div>
        <Device/>
    </div>
    ],
    [<div>teosaki</div>]
];