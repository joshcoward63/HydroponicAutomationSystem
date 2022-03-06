import React, {useState} from 'react';
import "./Device.css"
import client from '../../context/socket'


client.on("exhaustStatus", function(status){
    setExhaustState(status);
})


const Device = ({}) =>{    
    const [exhaustState, setExhaustState] = useState("Off");

    function onButtonClick(){
        let button1 = document.getElementById("b1");
        
        if(button1.innerHTML === "On"){
            
            setExhaustState('Off');
            button1.setAttribute("style", "background-color: #f44336;");
            client.emit('turnExhaustFanOff');
        }
        else{
            client.emit('turnExhaustFanON');
            setExhaustState('On');
            button1.setAttribute("style", "background-color: #24A0ED;");
        }
    }
        
    return (
        <div className='device'>
            <h4>Exhaust Fan</h4>
            <button id = "b1" onClick={() => onButtonClick()}>{exhaustState}</button>
        </div>
    )
}

export default Device;