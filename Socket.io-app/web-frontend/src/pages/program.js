import React, {useState} from 'react';
import Card from '../components/Card/Card';
import Data from '../components/Card/Data';
import './index.css'
const Program = () => {
  const [active, setActive] = useState('Manual');

  return (
    <div
      style={{
        // display: 'flex',
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        position: 'absolute',
        zIndex: '2',
        height: '100%'
      }}
    >
      <nav
      style={{
        width: '100%',
        justifyContent: 'center',
        display: 'flex'
      }}>
        <button style={{
          backgroundColor: '#62BD69',
          width: '25%' ,
          fontWeight: 'bold',
          color: '#060b26'
          }} 
          onClick={() => setActive("Manual")}
          >
          Control Manually
        </button>

        <button style={{
          backgroundColor: '#62BD69',
          width: '25%',
          // height: '35%',
          fontWeight: 'bold',
          color: '#060b26'
          }}
          onClick={() => setActive("Automatic")}
          >Control Automatically
          </button>
      </nav>


      <div style={{
        width: '100%',
        paddingLeft: '2.5%',
        justifyContent: 'center',
        // position: 'absolute',
        // zIndex: "3"
        // height: '100%',
        borderStyle: 'none',
        
        // background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box',
        // backgroundColor: 'green'
      }}>
          {active === "Manual" && <Card data={Data} title='0' cardIndex={0}/>}
          {active === "Automatic" && <Card data={Data} title='1' cardIndex={1}/>}
      </div>
    </div>
  );
};

export default Program;