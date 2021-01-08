const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

// Connecting to the created DB
const db = require("./models");
db.sequelize.sync();


//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes


//Set PORT to listen for requests
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("No errors listening on port ", server.address().port);
    }
  });