const app = require('express')();
const server = require('http').createServer(app);
var id = require('socket.io')(server);

// index.html 렌더
app.length('/',(req,res) =>{
    res.sendFile(__dirname + '/index-room.html');
})
// namespace /chat 접속
var chat = io.of('/chat').on('connection', (socket) =>{
        socket.on('chat Message',(data) =>{
        console.log('message from client : ', data);
        var name = socket.name = data.name;
        var room = socket.room = data.room;
        // room join
        socket.join(room);
        // room에 조인되어 있는 클라이언트에게 메시지를 전송
        chat.to(room).emit('chat message', data.msg);

    })
})

server.listen(3000, () =>{
    console.log('Socket IO server Listening on Port 3000');
})

