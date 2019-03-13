import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Login from './Login';
import Rooms from './Rooms';
import Users from './Users';
import ChatRoom from './ChatRoom';
export const socket = io.connect('http://localhost:4000');


const App = () => {

  const [username, setUsername] = useState('');
  const [isLogged, setLogged] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [chatRoomName, setChatRoomName] = useState('');

  useEffect(() => {
    console.log('something happening', socket)
    socket.on('users', (usernames, roomname) => {
      console.log(usernames, roomname, 'users')
      setUsernames(usernames);
      setChatRoomName(roomname);
    });

    socket.on('messages', (messages) => {
      console.log(messages, 'messages')
      setMessages(messages)
    });

    socket.on('rooms', (rooms) => {
        console.log(rooms, 'rooms');
        setRooms(rooms);
    });

  }, [usernames, setChatRoomName, rooms, messages]);



  return (
    <div>
      {isLogged ?

      <div className="wrapper">
       <Users usernames={usernames}/>
       <Rooms rooms={rooms}/>
       <ChatRoom messages={messages} chatroom={chatRoomName}/>
      </div>

      :

       <Login setUsername={username => setUsername(username)} setLogged={logged => setLogged(logged)}/>}
    </div>
    )

}


export default App;
