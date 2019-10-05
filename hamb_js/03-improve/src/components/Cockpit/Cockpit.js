import React, {useEffect} from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {

  // worked than we chnge some data in persons block
  useEffect(() => {
    console.log('[cockpit.js] useEffect ');
    setTimeout(() => {
      alert('Saved data to cloud!!!');
    }, 1000);

    return () => {
      console.log('[cockpit.js] useEffect clean up work');
    };
  }, []);

  useEffect(() => {
    console.log('[cockpit.js] 2nd useEffect ');
    return () => {
      console.log('[cockpit.js] 2nd useEffect clean up work');
    };
  });


  let btnClass='';
  if (props.showPersons) {
      btnClass = classes.Red;
  }
  
  // let classes = ['red', 'bold'].join(' ')
  // меняет стили в зависимости от количества словарей (человек) в persons
  const assignedClasses = [];
  if (props.persons.length <=2) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <=1) {
    assignedClasses.push(classes.bold);
  }

  return (
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')}>This is working!!!</p>
          <button
              className={btnClass}
              onClick={props.clicked}>Toggle Persons</button>
      </div>
  );
};

export default cockpit;