import React, {useState, useEffect} from 'react';
import {socket} from '../index.js';

export default function Login(){

    const useInputValue = (initialState) => {
      const [value, setVal] = useState(initialState);

      return {
        value,
        onChange: e => setVal(e.target.value)
      }
    }

    const username = useInputValue('');



    return (
      <form onSubmit={() => {
        socket.emit('addUser', username);
      }}>
        <input type="text" placeholder="username" {...username}/>
        <button>Login</button>
      </form>
      )
  }
};
