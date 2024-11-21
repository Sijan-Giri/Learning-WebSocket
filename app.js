const express = require("express");
const app = express();
const {Server} = require("socket.io");
const connectToDatabase = require("./database");
const Book = require("./model/bookModel");

connectToDatabase();

const server = app.listen(3000,() => {
    console.log("Server started at port 3000...")
})

const io = new Server(server)

io.on("connection",(socket) => {
    socket.on("addBook",async(data) => {
        if(data) {
            const {bookName , description , bookPrice} = data;
            const book = await Book.create({
                bookName,
                description,
                bookPrice
            })
            socket.emit({
                status : 200,
                message : 'Book created successfully',
                data : book
            })
        }
    })
})
