import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Login from './Login';
import ChatBoard from './ChatBoard';
export const socket = io.connect('http://localhost:4000');


const App = () => {

  const [username, setUsername] = useState('');
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {

    socket.on('receive message', (data) => {
      console.log(data)
      console.log('hitting')
    })
  });


  // const component = isLogged ?  <ChatBoard /> :  <Login setUsername={username => setUsername(username)} setLogged={logged => setLogged(logged)}/>
  // console.log(component, isLogged)

  return (
    <div>
      {isLogged ?  <ChatBoard /> :  <Login setUsername={username => setUsername(username)} setLogged={logged => setLogged(logged)}/>}
    </div>
    )

}


export default App;
