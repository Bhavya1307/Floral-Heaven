const express = require("express");
const path = require("path"); // Needed when setting up static/file paths
const dotenv = require("dotenv");

// Load the environment variables from .env
dotenv.config();

const db = require("./modules/flowers/db");

// Set up the Express app
const app = express();
const port = process.env.PORT || "8888";

// Set up application template engine
app.set("views", path.join(__dirname, "views"));
// The second value above is the path: __dirname/views
app.set("view engine", "pug");

// Set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (req, res) => {
  // Getting flowers from database into flowerlist
  let flowerList = await db.getFlowers();
  if (!flowerList.length) {
    await db.initializeFlowers();
    flowerList = await db.getFlowers();
  }
  res.render("index", { flowers: flowerList });
});

// Flowers page route
app.get("/flowers", async (req, res) => {
  let flowerList = await db.getFlowers();
  res.render("flowers", { flowers: flowerList });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about");
});

// Create flower page route
app.get("/flowers/create", (req, res) => {
  res.render("create");
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Adding a new flower to the database route
app.post("/flowers/create", async (req, res) => {
  // Extracting flower details from form
  const { name, description, price, image } = req.body;
  await db.createFlower(name, description, price, image);
  res.redirect("/flowers");
});

// Set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
