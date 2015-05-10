var httpServer = require('http').createServer(handler);
var mongoose = require('mongoose');
var io = require('socket.io')(httpServer);
var dbc = require('./dbconfig.json');
var User = require('./app/model/user');
function handler(req, res, next){
  res.end('hello');
}
if(!dbc.db_url){
  dbc.db_url = "mongodb://" + dbc.db_user + ':' + dbc.db_pass + '@' + dbc.db_host + ':' + dbc.db_port + '/' + dbc.db_name;
}
mongoose.connect(dbc.db_url);


var users = {};

io.on('connection', function(socket){
  console.log(new Date().getTime());
  socket.on('login', function(d){
    if (d.pass != "bobo") {
      socket.disconnect({});
    }
    if(d.username){
      if(!users.hasOwnProperty(d.username)){
        var user = new User({
          name: d.username
        });
        //user.save();
      }

    }
    console.log(users);
  });
  socket.on('msg', function(d){
    console.log('msg from client:', d);
  });
  socket.on('disconnect', function(d){
    console.log('user disconnected');
  });
  socket.on('reconnect', function(d) {
    console.log('user reconnected');
  });
  socket.on('reconnecting', function(d) {
    console.log('user reconnecting...');
  });
  socket.on('send', function(d) {
    console.log('user send:', d);
  });
});

httpServer.listen(81,'0.0.0.0');
