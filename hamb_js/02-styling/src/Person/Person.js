// with RADIUM

// import React from 'react';
// import Radium from 'radium';
// import './Person.css';


// const person = (props) => {
//     const style = {
//         '@media (min-width: 500px)': {
//             width: '450px'
//         }
//     };

//     return (
//         <div className='Person' style={style}>
//             <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!!!</p>
//             <p>{props.children}</p>
//             {/* change data in rel life */}
//             {/* value={props.name} - отображает в диве значение  NAME */}
//             <input type='text' onChange={props.changed} value={props.name} />
//         </div>
//     )
// };

// export default Radium(person);


//////////////////////////////////////////////////////////////
// without RADIUM
//////////////////////////////////////////////////////////////

import React from 'react';
import classes from './Person.module.css';


const person = (props) => {

    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!!!</p>
            <p>{props.children}</p>
            {/* change data in rel life */}
            {/* value={props.name} - отображает в диве значение  NAME */}
            <input type='text' onChange={props.changed} value={props.name} />
        </div>
    )
};

export default person;