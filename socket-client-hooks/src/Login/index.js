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
        console.log(setLogged)
        setLogged(true);
        setUsername(username);
        socket.emit('addUser', username.value);


      }}>
        <input type="text" placeholder="username" {...username}/>
        <button>Login</button>
      </form>
      )
};
