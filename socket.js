const SocketIO = require("socket.io");
var connectConter=0;
var nowSelectPage=0;
module.exports = server => {
  const io = SocketIO(server);
  io.on("connect", socket => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    connectConter++;
    socket.on('disconnect',function(){connectConter--;});
    console.log("connection!", ip, socket.id, req.ip);
    socket.broadcast.emit("otherConnect", socket.id);
    io.emit("connectCountDeliv", connectConter);
    socket.on("controlAction", data => {
      console.log(data);
      socket.broadcast.emit("displayControl", data);
    });

    socket.on("colorChange", data => {
      console.log(data);
      socket.broadcast.emit("colorChangeAct", data);
    });
    socket.on("pageNum", data => {
 
      nowSelectPage=data;
      
    });

    socket.on("pageNumYo", data => {
      console.log(nowSelectPage);
      io.sockets.emit("pageNumRe", nowSelectPage);
    });
    socket.on("startPage", data => {
      console.log(nowSelectPage);
      io.emit("startPageReceive", nowSelectPage);
    });
    
    
    socket.broadcast.emit("pageNumSend", nowSelectPage);
    socket.on('disconnect',function(){    socket.broadcast.emit("connectCountDeliv", connectConter);
  })
  });
};
