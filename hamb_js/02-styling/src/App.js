// npm install --save radium - for working with pseudo classes such as hover
// with RADIUM

// npm run eject - create new 2 folder


// import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium';

// import './App.css';
// import Person from './Person/Person';



// class App extends Component {

//   state = {
//     persons: [
//       {id: 'id1', 'name': 'Max', 'age':29},
//       {id: 'id2', 'name': 'Max 2', 'age':40},
//       {id: 'id3', 'name': 'Max 3', 'age':30},
//     ],
//     showPersons: false
//   }

//   // change value which we get from input  in Person
//   nameChangeHandler = (event, id) => {

//     // find currect person to change data
//     const personIndex = this.state.persons.findIndex(p => {
//       return p.id === id;
//     });

//     const person = {
//       ...this.state.persons[personIndex] 
//     };
//     // const person = Object.assign({}, this.state.persons[personIndex]);

//     person.name = event.target.value;
//     const persons = [...this.state.persons];
//     persons[personIndex] = person;


//     this.setState({ persons: persons });
//   }

//   deletePersonHandler = (personIndex) => {
//     // const persons = this.state.persons.slice();
//     const persons = [...this.state.persons]
//     persons.splice(personIndex, 1);

//     // setState - меняет значения в state
//     this.setState({persons: persons});
//   }

  

//   togglePersonsHandler = () => {
//     const doesShow = this.state.showPersons;
//     // change setState for one variable
//     this.setState({showPersons: !doesShow});
//   }

//   render() {
//     // add custom style
//     const style = {
//       backgroundColor: 'green',
//       color: 'white',
//       font: 'inherit',
//       border: '1px solid blue',
//       padding: '8px',
//       cursor: 'pointer',

//       // hover effect
//       ':hover': {
//         backgroundColor: 'lightgreen',
//         color: 'black'
//       }
//     };
    
//     {/* TOGGLE - HIDE / SHOW */}
//     let persons = null;
//     if (this.state.showPersons) {
//       persons = (
//         <div >
//           {this.state.persons.map((person, index) => {
//             return <Person
//               click={() => this.deletePersonHandler(index)} 
//               name={person.name} 
//               age={person.age}

//               // only for mistake in console use
//               key={person.id}
              
//               changed = {(event) => this.nameChangeHandler(event, person.id)}/>
//           })}
//         </div>
//       );
//       style.backgroundColor = 'red';
//       style[':hover'] = {
//         backgroundColor: 'salmon',
//         color: 'black'
//       };
//     }

//     // let classes = ['red', 'bold'].join(' ')
//     // меняет стили в зависимости от количества словарей (человек) в persons
//     const classes = [];
//     if (this.state.persons.length <=2) {
//       classes .push('red');
//     }
//     if (this.state.persons.length <=1) {
//       classes.push('bold');
//     }

//     return (
//       // StyleRoot - use for working with css and media Radium
//       <StyleRoot>
//         <div className="App">
//           <h1>Hallo</h1>
//           <p className={classes.join(' ')}>This is working!!!</p>
//           <button
//               style={style} 
//               onClick={this.togglePersonsHandler}>Toggle Persons</button>
//           {persons}
//         </div>
//       </StyleRoot>
//     );
//   }
// }

// export default Radium(App);



//////////////////////////////////////////////////////////////
// without RADIUM
//////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


class App extends Component {

  state = {
    persons: [
      {id: 'id1', 'name': 'Max', 'age':29},
      {id: 'id2', 'name': 'Max 2', 'age':40},
      {id: 'id3', 'name': 'Max 3', 'age':30},
    ],
    showPersons: false
  }

  // change value which we get from input  in Person
  nameChangeHandler = (event, id) => {

    // find currect person to change data
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] 
    };
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);

    // setState - меняет значения в state
    this.setState({persons: persons});
  }

  

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    // change setState for one variable
    this.setState({showPersons: !doesShow});
  }

  render() {
    // add css
    let btnClass = '';

    /* TOGGLE - HIDE / SHOW */
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
                <Person
                click={() => this.deletePersonHandler(index)} 
                name={person.name} 
                age={person.age}

                // only for mistake in console use
                // key={person.id}
                
                changed={(event) => this.nameChangeHandler(event, person.id)}/>
              </ErrorBoundary>
          })}
        </div>
      );
      
      btnClass = classes.Red;
    }

    // let classes = ['red', 'bold'].join(' ')
    // меняет стили в зависимости от количества словарей (человек) в persons
    const assignedClasses = [];
    if (this.state.persons.length <=2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <=1) {
      assignedClasses.push(classes.bold);
    }

    return (
      // for using classes add some shit webpack
      <div className={classes.App}>
        <h1>Hallo</h1>
        <p className={assignedClasses.join(' ')}>This is working!!!</p>
        <button
            className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;