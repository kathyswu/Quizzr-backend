// Imports
const express = require("express");
const cors = require("cors");
//const routes = require("./routes");

// Require database connection
require("./config/db.connection");

// Use .env variables
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();

// Middleware CORS
app.use(cors());

// Middleware JSON parsing
app.use(express.json());

// Listen
app.listen(port, () => console.log(`The server is running on Port: ${port}`));