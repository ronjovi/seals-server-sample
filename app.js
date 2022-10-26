/**
 * Root for our server
 */

// this port for our sever
const PORT = 3000;
// import express framework
const express = require("express");
// create instance of express so we can define our routes
const app = express();
// import body parser
const bodyParser = require("body-parser");
// import mongoose
const mongoose = require("mongoose");

async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect("mongodb+srv://robb1772:g00gle13@rob-cluster.cdw4zll.mongodb.net/?retryWrites=true&w=majority");
    console.log('we connected');
  } catch (error) {
    console.log(error);
    // add handler to deal with db connection error
  }
}

connectToDb();

// middleware
app.use(bodyParser.json());

// define a GET request endpoint/API/requests
app.get("/pizza", (req, res) => {
  res.send("hello julian");
});

// define a POST request
app.post("/add-pizza", (request, response) => {
  // grab the new pizza info
  const data = request.body;
  console.log(data);
  // return that same information
  response.status(200).send({
    message: "ok",
    payload: data,
  });
});

// server listens on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT);
  console.log(`localhost:${PORT}`);
});
