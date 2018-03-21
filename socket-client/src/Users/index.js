import React, {Component} from 'react';
import {socket} from '../index';
import './style.css';

export default class Users extends Component {
  render(){

    const usernames = this.props.usernames.map((username, i) => {
      return <li key={i}>{username}</li>
    });

    return (
      <div>
        <h1>Users</h1>
        <ul>
          {usernames}
        </ul>
      </div>
      )
  }
}
