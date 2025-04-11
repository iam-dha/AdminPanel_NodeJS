const express = require("express");
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

// App local variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;


// Routes
routeClient(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







