import React, {useState} from 'react';
import Card from '../components/Card/Card';
import Data from '../components/Card/Data';
// import '../index.css'
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
          width: '25%'
          }} 
          onClick={() => setActive("Manual")}
          >
          Control Manually
        </button>

        <button style={{
          backgroundColor: '#62BD69',
          width: '25%'
          }}
          onClick={() => setActive("Automatic")}
          >Control Automatically
          </button>
      </nav>


      <div style={{
        width: '80%',
        marginLeft: '10%',
        justifyContent: 'center',
        // position: 'absolute',
        // zIndex: "3"
        // height: '100%',
        backgroundColor: '#edefec'
      }}>
          {active === "Manual" && <Card data={Data} title='0' cardIndex={0}/>}
          {active === "Automatic" && <Card data={Data} title='1' cardIndex={1}/>}
      </div>
    </div>
  );
};

export default Program;