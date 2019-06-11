var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var axios = require('axios');

var port = process.env.PORT || 4001;
var index = require('./route/index');

var app = express();
app.use(index, function(req, res, next){
    next();
});

var server = http.createServer(app);

var io = socketIo(server);

let interval;

io.on('connection', socket => {
    console.log('New client connected'), setInterval(
        () => getApiAndEmit(socket),
        10000
    );
    socket.on('disconnect', () => console.log('Client disconnected'));
});

var getApiAndEmit = async socket => {
    try{
        var res = await axios.get(
            "https://api.darksky.net/forecast/e24482ab4b98af1c2e14679e13eee106/43.7695,11.2558"
        ); // Getting data from DarkSky
        socket.emit("FromAPI", res.data.currently.temperature);
        // Emitting a new message. Will be consumed by client
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

