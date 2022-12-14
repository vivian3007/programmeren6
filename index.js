// console.log('test');
//
// const express = require('express');
//
// const app = express();
//
// app.get("/", (req, res) =>{
//     res.send("Hello World");
// })
//
// app.listen(8000);


require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser")

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/tostis";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create webserver
const app = express();

// parse application x-form
app.use(bodyParser.urlencoded({ extended: false }))

// parse application json
app.use(bodyParser.json())

const tostisRouter = require("./routers/tostisRouter");

// Create route /
app.use("/tostis/", tostisRouter);


// Start webserver on port 8000
app.listen(8000, () => {
    console.log("Express Started");
})