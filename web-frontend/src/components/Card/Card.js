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
            {/* <p>{item.title} </p>
             <p>{item.name}</p>  */}
        </div>
        ))}
        </div>
    );
}

export default Card;