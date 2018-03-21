import React, {Component} from 'react';
import {socket} from '../index.js';

export default class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: ''
    }
  }
  handleNameChange = (e) => {
    this.setState({username: e.currentTarget.value});
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit('addUser', this.state.username);
    this.props.addUser(this.state.username);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleNameChange}/>
        <button>Login</button>
      </form>
      )
  }
};
