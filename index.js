const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser"); // Parse request body from form-encoded
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const systemConfig = require("./config/system.js");

require("dotenv").config()

const routeClient = require('./routes/client/index.route.js');
const routeAdmin = require('./routes/admin/index.route.js');
// Connect DB
const database = require("./config/database.js")
database.connect();


const app = express();
const port = process.env.PORT;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug'); // which template engine
app.use(express.static(`${__dirname}/public`));

//Overriding method 
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// Express flash
app.use(cookieParser('Thiskeyisprivate'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//Express TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
routeClient(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







