import React, {Component} from 'react';
import {socket} from '../index';
import './style.css';

export default class Rooms extends Component {
  handleRoomChange = (e) => {
      // we want to send to the express server the name of our room
      console.log(e.currentTarget.value, e.currentTarget.innerText);
      socket.emit('change room', e.currentTarget.innerText);

  }
  render(){

    const rooms = this.props.rooms.map((room, i) => {
      return <li key={i} onClick={this.handleRoomChange}>{room.name}</li>
    });


    return (
      <div>
        <h1>Rooms</h1>
        <ul>
          {rooms}
        </ul>
      </div>
      )
  }
}
