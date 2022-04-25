import React from 'react';

const About = () => {
  return (
    <div
      style={{
        display: 'block',
        position: 'absolute',
        zIndex: '2',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '50vh',
        color: '#fff',
        border: 'solid',
        width: '80%',
        marginLeft: '10%',
        background: 'linear-gradient(127.09deg, #548b12 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box'
      }}
    >
      <h1>About</h1>
      <p>A big hobby of mine that I have recently gotten into is hydroponics, growing plants in a soilless medium, in my particular case I’m growing plants directly in water.

Hydroponics offers both the home gardener and large scale farmer numerous benefits when compared to growing crops/plants using traditional methods. The biggest benefits seen in using hydroponics over traditional methods are the following:

- Uses up to 98% less water
- When combined with vertcial farming techniques can use up to 99% less space to grow plants
- Plants can grow over 50% faster
- Drastically increases overall output
- Requires no soil
- Can be done anywhere
- Requires less labor
- Produces healthier plants and higher quality food
- Doesn't rely on seasons

Problem Statement

With hydroponics there is a lot of monitoring and user interaction that is required to successfully grow plants.
Things like measuring pH, water temperature, room temperature, electrical conductivity (EC) of the water (nutrient concentration) , humidity and a lot more. All of which as of now have to be measured and adjusted by hand.
This takes time out of one's day to do and requires the individual in charge of the hydroponic system to always have to be within the area in order to make changes when needed.
Not to mention through human interaction we introduce a high potential for errors to occur. This can potentially cause devistating effects on the plants which can offen be unreversable.</p>
    </div>
  );
};

export default About;