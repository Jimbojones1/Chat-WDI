import React, {Component} from 'react';
import {socket} from '../App';
import PropTypes from 'prop-types';

function Rooms ({rooms}) {
    function handleRoomChange(e){
        // we want to send to the express server the name of our room
        console.log(e.target.value, e.target.innerText);
        socket.emit('change room', e.target.innerText);
    }


    const roomDisplay = rooms.map((room, i) => {
      return <li key={i} onClick={(e) => handleRoomChange(e)}>{room.name}</li>
    });

    return (
      <div>
        <h1>Rooms</h1>
        <ul>
          {roomDisplay}
        </ul>
      </div>
      )

};

Rooms.propTypes = {
  rooms: PropTypes.array
};

export default Rooms;
