import React, {useState} from 'react';
import {socket} from '../App'
// import './style.css';
import PropTypes from 'prop-types';


function ChatRoom({messages, chatroom}){
  const [messageValue, setMessageValue] = useState('');

  const messageDisplay = messages.map((message, i) => {
    return <li key={i}>{message.username}: {message.message} </li>
  });
  console.log(messageValue, chatroom)
  return (
      <div>
        <h1>{chatroom}</h1>
        <ul>
          {messageDisplay}
        </ul>
        <form onSubmit={e => {
          e.preventDefault();
          socket.emit('message', messageValue);
          setMessageValue('');
        }}>
          <input type='text' value={messageValue} onChange={(e) => setMessageValue(e.target.value)}/>
        </form>
      </div>
      )


}


// ChatRoom.propTypes = {
//   chatroom: PropTypes.string,
//   messages: PropTypes.array
// };



export default ChatRoom;
