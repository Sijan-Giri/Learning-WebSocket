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
        try {
            if(data) {
                const {bookName , description , bookPrice} = data;
                const book = await Book.create({
                    bookName,
                    description,
                    bookPrice
                })
                socket.emit("response",{
                    status : 200,
                    message : 'Book created successfully',
                    data : book
                })
            }
        } catch (error) {
            socket.emit("response",{status : 400 , message : "Something went wrong"})
        }
    })

    socket.on("getBooks",async() => {
         try {
            const book = await Book.find();
            socket.emit("response",{status : 200,message : "Books fetched successfully",data : book})
         } catch (error) {
            socket.emit("response",{status : 400 , message : "Something went wrong"})
         }
    })

    socket.on("updateBook",async(data) => {
        try {
            if(data) {
                const {bookName , description , bookPrice , bookId} = data
                const updatedBook = await Book.findByIdAndUpdate(bookId,{
                    bookName,
                    description,
                    bookPrice
            },{new:true});
                socket.emit("response",{status : 200, message : "Book updated successfully",data : updatedBook})
            }
        } catch (error) {
            socket.emit("response",{status : 400 , message : "Something went wrong"})
        }
    })

    socket.on("deleteBook",async(data) => {
        try {
            if(data) {
                const {bookId} = data;
                await Book.findByIdAndDelete(bookId);
                socket.emit("response",{status : 200 , message : "Book deleted successfully"})
            }
        } catch (error) {
            socket.emit("response",{status : 400 , message : "Something went wrong!!"})
        }
    })
})
