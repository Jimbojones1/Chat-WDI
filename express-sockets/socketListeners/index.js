const usernames = {};
const messages = [];


const rooms = [{
                name: 'MainRoom',
                messages: [],
                users: []
              },
              {
                name: 'Crypto',
                messages: [],
                users: []
              },
              {
                name: 'Books',
                messages: [],
                users: []
              }];

module.exports = {
  addUser: function(username, socket, io){
      usernames[username] = socket.id;
      socket.username = username;

      // Joining a Room named main Room
      socket.join('MainRoom');
      socket.room = 'MainRoom';

      rooms[0].users.push(username);
      io.emit('rooms', rooms)
      // Emit a message called users, that sends along with
      // it all the usernames in the object, HINT: ALL THE KEYS
      io.to('MainRoom').emit('users', rooms[0].users, 'MainRoom');
  }
}
