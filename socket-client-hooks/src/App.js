import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
export const socket = io.connect('http://localhost:4000');


const App = () => {

  

  useEffect(() => {

    socket.emit('something', 'taco')
    console.log(socket, ' this is sockete')
    socket.on('receive message', (data) => {
      console.log(data)
      console.log('hitting')
    })
  })

  return (
    <div>Hi</div>

    )
}

export default App;
