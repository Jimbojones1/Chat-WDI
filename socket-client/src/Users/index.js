import React from 'react';
import './style.css';

const Users = ({usernames}) => {


    const users = usernames.map((username, i) => {
      return <li key={i}>{username}</li>
    });

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users}
        </ul>
      </div>
      )
};

export default Users;
