import React from 'react';

const Card = ({data, cardIndex}) => {
    return(
        <div
        // style={
        //     backgroundColor: 
        // }

        >
        {data[cardIndex].map(item => (
        <div className='card'>
                {item}
        </div>
        ))}
        </div>
    );
}

export default Card;