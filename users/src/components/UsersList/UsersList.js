import React, { Component } from 'react'

<div className='App'>
        <h1 className='Header'>REACTORS</h1>
        <div><h2>Characters from Science-Fiction and Super Hero Films</h2></div>
        <div className='Card-row'>
          <div className='Char-container'>
            {this.state.starwarsChars.map(char => <StarWarsChars key={char.name} char={char} />)}
          </div>
        </div>
      </div>
      export default UsersList
