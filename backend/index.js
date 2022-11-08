const express = require("express");
const app = express();
const cors = require('cors')

const bodyParser = require('body-parser')
require('./database/db');


// Import routes
const commonRoutes = require("./routes/commonroute");

// Middlewares
// parse application/x-www-form-urlencoded
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());

// route Middlewares
app.use("/", commonRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));
