import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';





class App extends Component {

  state = {
    persons: [
      {'name': 'Max', 'age':29},
      {'name': 'Max 2', 'age':40},
      {'name': 'Max 3', 'age':30},
    ]
  }

  switchNameHandler = (newName) => {
    // NOT WORK - this.state.persons[0].name = 'LALALAL'
    // update state method
    this.setState({
      persons: [
        {'name': newName, 'age': 25},
        {'name': 'Max 2', 'age': 40},
        {'name': 'Max 3', 'age': 130},
      ]
    })
  }

  // change value which we get from input  in Person
  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        {'name': 'Max', 'age': 29},
        {'name': event.target.value, 'age': 40},
        {'name': 'Max 3', 'age': 30},
      ]
    })
  }

  togglePersonsHandler = () => {
    
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


    return (
      <div className="App">
        <h1>Hallo</h1>
        <p>This is working!!!</p>
        {/* ()=>this.switchNameHandler('LOLOEV') the same as this.switchNameHandler.bind(this, 'WQWQWQ') */}
        {/*  BETTER use BIND  */}
        <button
            style={style} 
            // onClick={()=>this.switchNameHandler('LOLOEV')}>Switch Name</button>
            onClick={this.togglePersonsHandler}>Switch Name</button>
        <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
        <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}
            // change data if click on paragraph
            click={this.switchNameHandler.bind(this, 'WQWQWQ')}
            changed={this.nameChangeHandler}>My hobby is Coding</Person>
        <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age}/>
      </div>
    );
    // return React.createElement('div', null, 'h1', 'LALALAAL!!!');
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null ,'LALALAAL 12222!!!'));
  }
}

export default App;
