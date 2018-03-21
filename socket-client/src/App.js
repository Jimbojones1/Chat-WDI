import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {socket} from './index';
import Login from './Login';
import ChatBoard from './ChatBoard';

class App extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      loggedIn: false
    }
  }
  addUser = (user) => {
    this.setState({username: user, loggedIn: !this.state.loggedIn});
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <ChatBoard /> : <Login addUser={this.addUser}/>}
      </div>
    );
  }
}

export default App;
