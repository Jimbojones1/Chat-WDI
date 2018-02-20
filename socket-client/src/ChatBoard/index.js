import React, {Component} from 'react';
import {socket} from '../index'
import './style.css';
import Rooms from '../Rooms';
import Users from '../Users';
import ChatRoom from '../ChatRoom'

// Smart Component
export default class ChatBoard extends Component {
  constructor(){
    super();

    this.state = {
      usernames: [],
      messages: []
    }
  }
  componentDidMount(){
    // set up the listener for the users,
    socket.on('users', (usernames) => {
      this.setState({usernames: [...usernames]})
    })

    socket.on('messages', (messages) => {
      this.setState({messages: [...messages]})
    })
  }
  render(){
    return (
      <div className="wrapper">
        <Users usernames={this.state.usernames}/>
        <Rooms />
        <ChatRoom messages={this.state.messages}/>
      </div>
      )
  }
}
