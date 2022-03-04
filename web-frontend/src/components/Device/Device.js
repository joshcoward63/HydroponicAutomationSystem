import React from 'react';
import "./Device.css"

function onButtonClick(){
    let button1 = document.getElementById("b1");
    if(button1.innerHTML === "On"){
        button1.innerHTML = "Off";
        button1.setAttribute("style", "background-color: #f44336;");
    }
    else{
        button1.innerHTML = 'On';
        button1.setAttribute("style", "background-color: #24A0ED;");
    }
}
    

const Device = ({}) =>{
    return (
        <div className='device'>
            <h4>Exhaust Fan</h4>
            <button id = "b1" onClick={() => onButtonClick()}>On</button>
        </div>
    )
}

export default Device;