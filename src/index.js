const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();
const port = 8080;
const route = require("./routes");
const db = require("./config/db");

//Connection to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.use(methodOverride("_method"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resouces/views"));
app.use(morgan("combined"));

//routes init
route(app);

app.listen(port, () => {
  console.log("listening on port " + port);
});
