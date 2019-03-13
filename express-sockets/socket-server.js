const io = require('socket.io');
const { addUser, handleChatMessage, handleRoomChange, disconnect } = require('./socketListeners');

module.exports = function(server){
  const socketServer = io(server);

  socketServer.on('connection', (socket) => {
    console.log('socket is connected')


    socket.on('addUser', (username) => addUser(username, socket, socketServer))
    socket.on('message', (message) => handleChatMessage(message, socket, socketServer));
    socket.on('change room', (room) => handleRoomChange(room, socket, socketServer));
    socket.on('disconnect', () => disconnect(socket, socketServer))


    // socket.on('disconnect', () => {
    //       // DELETE the user from our object
    //       delete usernames[socket.username]
    //       // the update the users list by firing an event to the react application
    //       // to update the current users
    //       socketServer.emit('users', Object.keys(usernames));
    // });






  });/// end of connection
};// end of the function
