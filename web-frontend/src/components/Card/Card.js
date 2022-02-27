import React from 'react';
import Data from './Data';
const Card = ({data,title, cardIndex}) => {
    return(
        <div>
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