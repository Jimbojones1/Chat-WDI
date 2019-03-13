const io = require('socket.io');
const { addUser } = require('./socketListeners');
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


module.exports = function(server){
  const socketServer = io(server);

  socketServer.on('connection', (socket) => {
    console.log('socket is connected')

    socketServer.emit('receive message', 'connected');
    socket.on('addUser', (username) => addUser(username, socket, socketServer))
    // socket.on('addUser', (username) => {

    //   usernames[username] = socket.id;
    //   socket.username = username;

    //   // Joining a Room named main Room
    //   socket.join('MainRoom');
    //   socket.room = 'MainRoom';

    //   rooms[0].users.push(username);


    //     socketServer.emit('rooms', rooms)
    //   // Emit a message called users, that sends along with
    //   // it all the usernames in the object, HINT: ALL THE KEYS
    //     socketServer.to('MainRoom').emit('users', rooms[0].users, 'MainRoom');


    //   // socketServer.emit('messages', messages);
    // });// end of addUser

    socket.on('message', (message) => {
      const obj = {};
      obj.username = socket.username;
      obj.message = message;
      messages.push(obj);
      socketServer.emit('messages', messages);

    });

    socket.on('change room', (room) => {
      // socket
      console.log('=------------------------------')
      console.log(socket.room, ' in change room')


      const previousRoom = rooms.find((element) => {
        console.log(socket.room, element.name, ' login previouseroom')
        return element.name === socket.room
      });
      socket.leave(socket.room);
      console.log(previousRoom)

     const indexOfUser = previousRoom.users.indexOf(socket.username);
     previousRoom.users.splice(indexOfUser, 1);

      socketServer.to(previousRoom.name).emit('users', previousRoom.users, previousRoom.name);
       //add the user to the room
      // find the object with the room that they were in

      // then remove the user from the array


      socket.join(room);
      // remove the user from the room that they are in
      const nextRoom = rooms.find((element) => {
        return element.name === room
      });

      nextRoom.users.push(socket.username);
      socketServer.to(nextRoom.name).emit('users', nextRoom.users, nextRoom.name)
      //remove the user from room array,
      // add them to the new room array

      // emit a message with the current Room name of


    });



    socket.on('disconnect', () => {
          // DELETE the user from our object
          delete usernames[socket.username]
          // the update the users list by firing an event to the react application
          // to update the current users
          socketServer.emit('users', Object.keys(usernames));
    });






  });/// end of connection
};// end of the function
