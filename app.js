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

/**
 * Handles db connection
 */
async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(
      "mongodb+srv://robb1772:g00gle13@rob-cluster.cdw4zll.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("we connected");
  } catch (error) {
    console.log(error);
    // add handler to deal with db connection error
  }
}

// run the function to connect
connectToDb();

/**
 * Define what data our pizza object will hold
 */
const pizzaSchema = new mongoose.Schema({
  price: { type: Number, required: false }, // required =false
  toppings: [],
  sides: [],
});

const pizzaModel = mongoose.model("pizza", pizzaSchema);

// middleware - does things for us that save time and code
app.use(bodyParser.json());

// define a GET request endpoint/API/requests
// CRUD - READ
app.get("/pizza", (req, res) => {
  async function getAllPizza() {
    try {
      // find will ALWAYS RETURN ARRAY
      const allPizzas = await pizzaModel.find({ price: 10000 });
      // send back pizza data and status ok
      res.status(200).send({
        message: "ok",
        payload: allPizzas,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getAllPizza();
});

app.post("/get-single-pizza", (req, res) => {
  const data = req.body;

  console.log(data.id);

  async function getPizza() {
    try {
      // findOne will alwasy return one item or null
      const pizza = await pizzaModel.findOne({
        price: 10055555500
      });

      // send back pizza data and status ok
      res.status(200).send({
        message: "ok",
        payload: pizza,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getPizza();
});

// define a POST request
// CRUD - C
app.post("/add-pizza", (request, response) => {
  // grab the new pizza info
  const data = request.body;

  async function makePizza() {
    try {
      // create a new pizza in the database
      const newPizza = await pizzaModel.create({
        price: data.price,
        toppings: data.toppings,
        sides: data.sides,
      });

      // send back pizza data and status ok
      response.status(200).send({
        message: "ok",
        payload: newPizza,
      });
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  makePizza();
});

// server listens on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT);
  console.log(`localhost:${PORT}`);
});
