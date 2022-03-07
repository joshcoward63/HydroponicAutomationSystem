import React, {useState} from 'react';
import "./Device.css"
import client from '../../context/socket'


<<<<<<< HEAD

=======
client.on("exhaustStatus", function(status){
    setExhaustState(status);
})
>>>>>>> 3ae1616389e5c6b64d618200ec51687041daacd2


const Device = ({}) =>{    
    const [exhaustState, setExhaustState] = useState("Off");
<<<<<<< HEAD
    const [regularState, setRegularState] = useState("Off");
    const [mainPumpState, setMainPumpState] = useState("Off");
    const [supplyPumpState, setSupplyPumpState] = useState("Off");
    client.emit("getExhaustStatus");
    client.emit("getRegularStatus");


    client.on("exhaustStatus", function(status){
        let exhaustFanButton = document.getElementById("b1");

        if(status === "On"){
            exhaustFanButton.setAttribute("style", "background-color: #24A0ED;");
        }
        else{
            exhaustFanButton.setAttribute("style", "background-color: #f44336;");
        }
        setExhaustState(status);
    })

    function onButtonClick1(){       
        let exhaustFanButton = document.getElementById("b1");

        if(exhaustFanButton.innerHTML === "On"){
            
            setExhaustState('Off');
            exhaustFanButton.setAttribute("style", "background-color: #f44336;");
            client.emit('turnExhaustFanOff');
        }
        else{
            
            setExhaustState('On');
            exhaustFanButton.setAttribute("style", "background-color: #24A0ED;");
            client.emit('turnExhaustFanOn');
        }
    }

    client.on("regularStatus", function(status){
        let regularFanButton = document.getElementById("b2");
        if(status === "On"){
            regularFanButton.setAttribute("style", "background-color: #24A0ED;");
        }
        else{
            regularFanButton.setAttribute("style", "background-color: #f44336;");
        }
        setRegularState(status);
    })


    function onButtonClick2(){ 
        let regularFanButton = document.getElementById("b2");
        if(regularFanButton.innerHTML === "On"){            
            setRegularState('Off');
            regularFanButton.setAttribute("style", "background-color: #f44336;");
            client.emit('turnRegularFanOff');
        }
        else{            
            setRegularState('On');
            regularFanButton.setAttribute("style", "background-color: #24A0ED;");
            client.emit('turnRegularFanOn');
        }
    }

    function onButtonClick3(){

    }
    function onButtonClick4(){
        
    }
        
    return (
        <div >
            <div className='device'>
                <h4>Exhaust Fan</h4>
                <button id = "b1" onClick={() => onButtonClick1()}>{exhaustState}</button>
            </div>
            
            <div className='device'>
               <h4>Regular Fan</h4>
                <button id = "b2" onClick={() => onButtonClick2()}>{regularState}</button> 
            </div>
            <div className='device'>
                <h4>Main Pump</h4>
                <button id = "b3" onClick={() => onButtonClick3()}>{mainPumpState}</button>
            </div>
            
            <div className='device'>
               <h4>Supply Pump</h4>
                <button id = "b4" onClick={() => onButtonClick4()}>{supplyPumpState}</button> 
            </div>
            
=======

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
>>>>>>> 3ae1616389e5c6b64d618200ec51687041daacd2
        </div>
    )
}

export default Device;