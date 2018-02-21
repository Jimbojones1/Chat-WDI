const io = require('socket.io');

const usernames = {};
const messages = [];


const rooms = [{
                name: 'Main Room',
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

  socketServer.on('connection', socket => {
    console.log('socket is connected')

    socket.on('addUser', (username) => {
      //store thier name as the key and the socket.id as the value
      usernames[username] = socket.id;
      socket.username = username;

      // Joining a Room named main Room
      socket.join('Main Room');
      socket.room = 'Main Room';

      rooms[0].users.push(username);

      socketServer.emit('rooms', rooms)
      // Emit a message called users, that sends along with
      // it all the usernames in the object, HINT: ALL THE KEYS
      socketServer.to('Main Room').emit('users', rooms[0].users, 'Main Room');
      // socketServer.emit('messages', messages);
    })// end of addUser

    socket.on('message', (message) => {
      const obj = {};
      obj.username = socket.username;
      obj.message = message;
      messages.push(obj);
      socketServer.emit('messages', messages);

    })

    socket.on('change room', (room) => {
      // socket
      console.log('=------------------------------')
      console.log(socket, ' in change room')
      socket.leave(socket.room);

      const previousRoom = rooms.find((element) => {
        return element.name === socket.room
      });

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


    })



    socket.on('disconnect', () => {
          // DELETE the user from our object
          delete usernames[socket.username]
          // the update the users list by firing an event to the react application
          // to update the current users
          socketServer.emit('users', Object.keys(usernames));
    })






  })/// end of connection
}// end of the function
