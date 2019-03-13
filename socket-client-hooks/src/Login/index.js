import React, {useState, useEffect} from 'react';
import {socket} from '../App';

export default function Login({setUsername, setLogged}){

    const useInputValue = (initialState) => {
      const [value, setVal] = useState(initialState);

      return {
        value,
        onChange: e => setVal(e.target.value)
      }
    }

    const username = useInputValue('');



    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        socket.emit('addUser', username.value);
        setUsername(username);
        setLogged(true);
      }}>
        <input type="text" placeholder="username" {...username}/>
        <button>Login</button>
      </form>
      )
};
