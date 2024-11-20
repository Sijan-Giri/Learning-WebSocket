const express = require("express");
const app = express();
const {Server} = require("socket.io");

const server = app.listen(3000,() => {
    console.log("Server started at port 3000...")
})

const io = new Server(server)

io.on("connection",(socket) => {

    socket.emit("hello",{
        "greeting" : "Good Morning!"
    })
    // console.log("Someone has connected");
    // socket.on("disconnect",()=> {
    //     console.log("User is disconnected")
    // })
    // socket.on("sendData",(data) => {
    //     console.log(data)
    // })
})
