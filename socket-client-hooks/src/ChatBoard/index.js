import React, {useState, useEffect} from 'react';
import {socket} from '../App';
// import './style.css';
// import Rooms from '../Rooms';
// import Users from '../Users';
// import ChatRoom from '../ChatRoom';

// Smart Component
export default function ChatBoard(){

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


  // useEffect()
  //     socket.on('rooms', (rooms) => {
  //       console.log(rooms, 'rooms');
  //       setRooms(rooms);
  //   });



  return (
      <div className="wrapper">
       chatboard
      </div>
      )

}
