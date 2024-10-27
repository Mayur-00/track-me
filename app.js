import express  from'express';
import http from 'http';
import { Server } from'socket.io';
import path from"path"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static("public"))

io.on('connection', (socket) => {

    socket.on('send-location', function(data){
        io.emit("recieve-location", {id:socket.id, ...data})
    })
    socket.on('disconnect', function(){
        io.emit("user-disconnected", socket.id)
    })
});
app.get("/", (req,res)=>{
    res.render("index")
})

server.listen(3000, () => {
});
