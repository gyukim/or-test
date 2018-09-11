#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("./app.js");
var debug = require("debug")("backe:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "65080");
app.set("port", port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const SocketIO = require("socket.io");
var connectConter = 0;
var nowSelectPage = 0;
const io = require("socket.io")(server);

io.on("connect", socket => {
  const req = socket.request;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  connectConter++;
  socket.on("disconnect", function() {
    connectConter--;
  });
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
    nowSelectPage = data;
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
  socket.on("disconnect", function() {
    socket.broadcast.emit("connectCountDeliv", connectConter);
  });
});

// var io = require('socket.io')(server);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

//socket.io
// var io = require('socket.io')(server);

// io.on('connection', function(socket) {
//   console.log(socket.id)
//   socket.on('event_name', function(data) {
//       // io.emit('MESSAGE', data)
//       console.log('Message from Client: ' + data);
//     });
// });
