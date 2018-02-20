const io = require('socket.io');

const usernames = {};
const messages = [];
module.exports = function(server){
  const socketServer = io(server);

  socketServer.on('connection', socket => {
    console.log('socket is connected')

    socket.on('addUser', (username) => {
      //store thier name as the key and the socket.id as the value
      usernames[username] = socket.id;
      socket.username = username;
      // Emit a message called users, that sends along with
      // it all the usernames in the object, HINT: ALL THE KEYS
      socketServer.emit('users', Object.keys(usernames));
      socketServer.emit('messages', messages);
    })// end of addUser

    socket.on('message', (message) => {
      const obj = {};
      obj.username = socket.username;
      obj.message = message;
      messages.push(obj);
      socketServer.emit('messages', messages);

    })








  })/// end of connection
}// end of the function
