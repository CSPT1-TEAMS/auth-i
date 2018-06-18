import React, { Component } from 'react'
// import babel from 'babel';
import logo from './android-icon-72x72.png'
import './App.css'
// import Character from './Components/User'
// import CharacterCard from './CharacterCard/CharacterCard'
import Form from './components/Form'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Users Module by Glenn-David and John C</h1>
        </header>
        <div>
          <Form />
        </div>
      </div>
    )
  }
}

export default App
