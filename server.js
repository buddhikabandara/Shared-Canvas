var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(9900);
console.log("Paint Server up and running......");
app.use(express.static("public"))
var io = socket(server);

io.sockets.on("connection",newConnection);

function newConnection(socket){
  socket.broadcast.emit("newUser",socket.id);
  console.log("New Connection : "+socket.id);
  socket.on("mouse_",mouseMessage_);
  socket.on("color",colorMessage);
  socket.on("msg",incomingMsg);
  socket.on("cls",cls);
  socket.on("linesize",emitSize);
  socket.on("newRegister",newRegister);
  

  function mouseMessage_(data)
  {
      var out = {
          x:data.split(" ")[0],
          y:data.split(" ")[1]
      }
      socket.broadcast.emit("mouse",out);
      console.log(data);
  }
  function colorMessage(data)
  {
      socket.broadcast.emit("col",data);
      console.log("color "+data);
  }
  function cls()
  {
    socket.broadcast.emit("cls");
    console.log("clear");
  }
  function incomingMsg(data)
  {
   console.log(data);
   socket.broadcast.emit("msg",data);
 }
  function emitSize(data)
  {
    socket.broadcast.emit("lineSize",data);
  }
  function newRegister(data)
  {
      socket.broadcast.emit("userInfo",data);
  }



}
