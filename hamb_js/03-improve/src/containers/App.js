import React, { Component } from 'react';

import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';




class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }

  state = {
    persons: [
      {id: 'id1', 'name': 'Max', 'age':29},
      {id: 'id2', 'name': 'Max 2', 'age':40},
      {id: 'id3', 'name': 'Max 3', 'age':30},
    ],
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    console.log('[App.js] render')
    /* TOGGLE - HIDE / SHOW */
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangeHandler}/>;
    }


    return (
      <div className={classes.App}>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>
          Remove Cockpit
        </button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle} 
          showPersons={this.state.showPersons}
          persons={this.state.persons} 
          clicked={this.togglePersonsHandler}/> : null }  
        {persons}
      </div>
    );
  }
}

export default App;