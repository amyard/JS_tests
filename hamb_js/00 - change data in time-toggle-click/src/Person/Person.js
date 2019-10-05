import React from 'react';
import './Person.css';


const person = (props) => {
    return (
        <div className='Person'>
            <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!!!</p>
            <p>{props.children}</p>
            {/* change data in rel life */}
            {/* value={props.name} - отображает в диве значение  NAME */}
            <input type='text' onChange={props.changed} value={props.name} />
        </div>
    )
};

export default person;