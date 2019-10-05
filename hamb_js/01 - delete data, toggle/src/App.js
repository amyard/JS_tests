import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';



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
    // add custom style
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '3px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    
    {/* TOGGLE - HIDE / SHOW */}
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person
                    click={() => this.deletePersonHandler(index)} 
                    name={person.name} 
                    age={person.age}

                    // only for mistake in console use
                    key={person.id}
                    
                    changed = {(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
      );
    }


    return (
      <div className="App">
        <h1>Hallo</h1>
        <p>This is working!!!</p>
        <button
            style={style} 
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
