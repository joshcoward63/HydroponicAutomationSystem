import React, {useState} from 'react';
// const [fanState, setFanState] = useState("On");
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
    // [{
    //   title:  "test1",
    //   name:  "test1"
    // }],
    // [{
    //     title:  "test2",
    //     name:  "test2"
    // }]   
    [
        <div style={{
            // justifyContent: 'center
            // alignItems: 'center',
            // backgroundColor: 'green'

        }}>
            <div >
                {/* <button onClick={()=>fanState()}id="button" style={{
                    width: '5%',
                    height: '5%'
                }}text ="on" 
                >on</button> */}

<label style={{
    float: 'right'
}}
class="switch">
 <input type="checkbox" id="togBtn"/>
 <div class="slider round">
  <span class="on">ON</span>
  <span class="off">OFF</span>
 </div>
</label>
            </div>
        </div>
    ],
    [<div>teosaki</div>]
];