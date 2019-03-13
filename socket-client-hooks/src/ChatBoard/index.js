import React, {useState, useEffect} from 'react';
import {socket} from '../index'
import './style.css';
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

    socket.on('users', (usernames, roomname) => {
      setUsernames(usernames);
      setChatRoomName(roomname);

    });

    socket.on('messages', (messages) => {
      setMessages(messages)
    });

    socket.on('rooms', (rooms) => {
        setRooms(rooms);
    });
  })



  return (
      <div className="wrapper">
       hi
      </div>
      )

}
