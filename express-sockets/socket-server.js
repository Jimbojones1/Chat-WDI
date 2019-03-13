const io = require('socket.io');
const {addUser, handleChatMessage, handleRoomChange, disconnect} = require('./socketListeners');

module.exports = function(server){
  const socketServer = io(server);

  const setUpListener = (socketServer, socket) => {
    return (fn, ...theArgs) => {
      return fn.bind(null, socketServer, socket, ...theArgs)
    }
  }


  socketServer.on('connection', (socket) => {

    const setListener = setUpListener(socketServer, socket)

    socket.on('addUser', (username) => setListener(addUser, username)());
    socket.on('message', (message) => setListener(handleChatMessage, message)());
    socket.on('change room', (room) => setListener(handleRoomChange, room)());
    socket.on('disconnect', () => setListener(disconnect)());

  });/// end of connection
};// end of the function
