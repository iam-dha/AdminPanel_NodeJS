const express = require("express");

const route = require('./routes/client/index.route.js')

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug'); // which template engine
app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







