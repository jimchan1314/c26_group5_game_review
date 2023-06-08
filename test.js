const { Socket } = require("socket.io")


const server = new http.Server(app)
const io = new SocketID(server)
const socket = io.connect();

app.app("",(req,res)=>{
    io.emit("hi")  //server sent to all client, boardcast

    io.to('room1').emit('new memo','there is new memo');  //from ts server to client side
    socket.emit('')  //client sent to server
    socket.on('')  //client receive fm server

})

SELECT post_id, name, like_count FROM (SELECT * FROM game WHERE game_type = 'Board Game') as table1 inner JOIN users ON users.id = table1.create_users_id  ORDER BY table1.like_count DESC LIMIT 10;
