import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state ={
      scooters: []
    }
  }

  componentDidMount(){
    fetch("/api/v1/scooters")
    .then((response)=>{
      return response.json()
    })
    .then((scooters)=>{
        console.log(scooters)
        this.setState({
          scooters: scooters
        })
    })
  }
  render(){
    const scooterList = this.state.scooters.map((scooter,i)=>{
      return <li key={i}>{scooter.scooterId}</li>
    })
  return (
    <div className="App">
      <h1>Scooters List</h1>
      <ul>
        {scooterList}
      </ul>
    </div>
  )
  }
}

export default App;
