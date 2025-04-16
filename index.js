const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser"); // Parse request body from form-encoded
const systemConfig = require("./config/system.js");

require("dotenv").config()

const routeClient = require('./routes/client/index.route.js');
const routeAdmin = require('./routes/admin/index.route.js');
// Connect DB
const database = require("./config/database.js")
database.connect();


const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug'); // which template engine
app.use(express.static("public"));

//Overriding method 
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// App local variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
routeClient(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







