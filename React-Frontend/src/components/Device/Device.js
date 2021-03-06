import React, {useState, useEffect} from 'react';
import "./Device.css"
import client from '../../context/socket'
    // client.emit("getExhaustStatus");
    // client.emit("getRegularStatus");
    // client.emit("getMainPumpStatus");
    // client.emit("getSupplyPumpStatus");




const Device = ({}) =>{    
    const [exhaustState, setExhaustState] = useState("Off");
    const [regularState, setRegularState] = useState("Off");
    const [mainPumpState, setMainPumpState] = useState("Off");
    const [supplyPumpState, setSupplyPumpState] = useState("Off");
    useEffect(()=>{
        client.emit("getExhaustStatus");
        client.emit("getRegularStatus");
        client.emit("getMainPumpStatus");
        client.emit("getSupplyPumpStatus");
    })

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

    // function onButtonClick1(){       
    //     let exhaustFanButton = document.getElementById("b1");

    //     if(exhaustFanButton.innerHTML === "On"){
            
    //         setExhaustState('Off');
    //         exhaustFanButton.setAttribute("style", "background-color: #f44336;");
    //         client.emit('turnExhaustFanOff');
    //     }
    //     else{
            
    //         setExhaustState('On');
    //         exhaustFanButton.setAttribute("style", "background-color: #24A0ED;");
    //         client.emit('turnExhaustFanOn');
    //     }
    // }

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
    client.on("mainPumpStatus", function(status){
        let button = document.getElementById("b3");
        if(status === "On"){
            button.setAttribute("style", "background-color: #24A0ED;");
        }
        else{
            button.setAttribute("style", "background-color: #f44336;");
        }
        setMainPumpState(status);
    })
    client.on("supplyPumpStatus", function(status){
        let button = document.getElementById("b4");
        if(status === "On"){
            button.setAttribute("style", "background-color: #24A0ED;");
        }
        else{
            button.setAttribute("style", "background-color: #f44336;");
        }
        setSupplyPumpState(status);
    })


    // function onButtonClick2(){ 
    //     let regularFanButton = document.getElementById("b2");
    //     if(regularFanButton.innerHTML === "On"){            
    //         setRegularState('Off');
    //         regularFanButton.setAttribute("style", "background-color: #f44336;");
    //         client.emit('turnRegularFanOff');
    //     }
    //     else{            
    //         setRegularState('On');
    //         regularFanButton.setAttribute("style", "background-color: #24A0ED;");
    //         client.emit('turnRegularFanOn');
    //     }
    // }



    function changeDeviceState(device, state){
        let string;
        switch(device) {
            case "Exhaust Fan":
                setExhaustState(state);
                string = "turnExhaustFan".concat(state);
                client.emit(string);
                break;
            case "Regular Fan":
                setRegularState(state);
                string = "turnRegularFan".concat(state);
                client.emit(string);
                break;
            case "Main Pump":
                setMainPumpState(state);
                string = "turnMainPump".concat(state);
                client.emit(string);
                break;
            case "Supply Pump":
                setSupplyPumpState(state);
                string = "turnSupplyPump".concat(state);
                client.emit(string);
                break;
            default:
                console.log("Error");
        }
    }
        
    function deviceStateToggle(id, name){
        let device = document.getElementById(id);
        if(device.innerHTML === "On"){            
            changeDeviceState(name,"Off");
            device.setAttribute("style", "background-color: #f44336;");
        }
        else{            
            changeDeviceState(name,"On");
            device.setAttribute("style", "background-color: #24A0ED;");
        }
    }


    function nutrientController(pump, quantity){
        let amount = document.getElementById(quantity).value;
        amount = (amount / 1.2);
        switch(pump){
            case "MasterBlend":
                client.emit("togglePump", ["MasterBlend", amount]);
                break;
            case "Epsom Salt":
                client.emit("togglePump",["Epsom Salt", amount]);
                break;
            case "Calcium Nitrate":
                client.emit("togglePump",["Calcium Nitrate", amount]);
                break;
            case "Ph Down":
                client.emit("togglePump",["Ph Down", amount]);
                break;         
        }
        document.getElementById(quantity).value = null;

    }

    return (
        <div className='device-panel'>
            <div className='device'>
                <h4>Exhaust Fan</h4>
                <button id = "b1" onClick={() =>setTimeout(deviceStateToggle("b1", "Exhaust Fan"),2000)}>{exhaustState}</button>
            </div>
            
            <div className='device'>
               <h4>Regular Fan</h4>
                <button id = "b2" onClick={() => deviceStateToggle("b2", "Regular Fan")}>{regularState}</button> 
            </div>
            <div className='device'>
                <h4>Main Pump</h4>
                <button id = "b3" onClick={() => deviceStateToggle("b3", "Main Pump")}>{mainPumpState}</button>
            </div>
            
            <div className='device'>
               <h4>Supply Pump</h4>
                <button id = "b4" onClick={() => deviceStateToggle("b4", "Supply Pump")}>{supplyPumpState}</button> 
            </div>
            <div className='pumps'>
                <h4>Nutrient and Ph Control</h4>
                <h5>Pumps:</h5>
                <ul id="grid-container">
                    <li class="item1">
                        <label>MasterBlend</label> 
                        <button className="pb" onClick={() => nutrientController("MasterBlend", "pi1")}>Dose</button>
                        <input id ="pi1" type="number"/>
                        <label>mL</label>
                    </li>
                    <li class="item2">
                        <label>Epsom Salt</label>
                        <button className="pb" onClick={() => nutrientController("Epsom Salt", "pi2")}>Dose</button>
                        <input id ="pi2" type="number"/>
                        <label>mL</label>
                    </li>
                    <li class="item3">
                        <label>Calcium Nitrate</label>
                        <button className="pb" onClick={() => nutrientController("Calcium Nitrate", "pi3")}>Dose</button>
                        <input id ="pi3" type="number"/>
                        <label>mL</label>
                    </li>
                    <li class="item4">
                        <label>Ph Down</label>
                        <button className="pb"  onClick={() => nutrientController("Ph Down", "pi4")}>Dose</button>
                        <input id ="pi4" type="number"/>
                        <label>mL</label>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default Device;