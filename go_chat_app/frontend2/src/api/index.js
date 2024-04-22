// api/index.js
var socket = new WebSocket('ws://localhost:9000/ws');

let currentUserID = null;

let connect = (cb) => {
  console.log("connecting")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    console.log("Message from WebSocket: ", msg);

    const message = JSON.parse(msg.data);
    if (message.type === 2) { // Mensaje especial que contiene el ID del usuario actual
      currentUserID = message.body;
      console.log('ID del usuario actual:', currentUserID);
    } else {
      cb(msg);
    }
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }
};

let sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg, currentUserID };
