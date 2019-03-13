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
  },
  handleChatMessage: function(message, socket, io){
    const obj = {};
    obj.username = socket.username;
    obj.message = message;
    messages.push(obj);
    io.emit('messages', messages);
  },
  handleRoomChange: function(room, socket, io){
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

      io.to(previousRoom.name).emit('users', previousRoom.users, previousRoom.name);
       //add the user to the room
      // find the object with the room that they were in

      // then remove the user from the array


      socket.join(room);
      // remove the user from the room that they are in
      const nextRoom = rooms.find((element) => {
        return element.name === room
      });

      nextRoom.users.push(socket.username);
      console.log(nextRoom)
      io.to(nextRoom.name).emit('users', nextRoom.users, nextRoom.name)
      //remove the user from room array,
      // add them to the new room array

      // emit a message with the current Room name of
  },
  disconnect: function(socket, io){
     delete usernames[socket.username]
    //       // the update the users list by firing an event to the react application
    //       // to update the current users
    io.emit('users', Object.keys(usernames));

  }
}
