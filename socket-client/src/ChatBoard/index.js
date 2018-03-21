import React, {Component} from 'react';
import {socket} from '../index'
import './style.css';
import Rooms from '../Rooms';
import Users from '../Users';
import ChatRoom from '../ChatRoom';

// Smart Component
export default class ChatBoard extends Component {
  constructor(){
    super();

    this.state = {
      usernames: [],
      messages: [],
      rooms: [],
      chatroom: 'Main Room'
    }
  }
  componentDidMount(){
    // set up the listener for the users,
    socket.on('users', (usernames, roomname) => {
      this.setState({usernames: [...usernames], chatroom: roomname});
    });

    socket.on('messages', (messages) => {
      this.setState({messages: [...messages]});
    });

    socket.on('rooms', (rooms) => {
        this.setState({rooms: [...rooms]});
    });

  }
  render(){
    return (
      <div className="wrapper">
        <Users usernames={this.state.usernames}/>
        <Rooms rooms={this.state.rooms}/>
        <ChatRoom messages={this.state.messages} chatroom={this.state.chatroom}/>
      </div>
      )
  }
}
