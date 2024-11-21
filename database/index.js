const mongoose = require("mongoose");

const connectToDatabase = async() => {
    await mongoose.connect("mongodb+srv://girisijan346:sijan@cluster0.e4nzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully!!")
}

module.exports = connectToDatabase;