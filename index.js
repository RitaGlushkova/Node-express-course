const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const logger = require("./middleware/logger.js");
const members = require('./Members');
//init middleware
// app.use(logger);

//Handlebars middleware
//
app.engine(
  "handlebars",
  engine({ extname: ".handlebars", defaultLayout: "main" })
);
app.set("view engine", "handlebars");

//Homepage route
app.get("/", (req, res) => res.render("index", {
  title: 'Member App',
  members
}));

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Members API Routes
app.use("/api/members", require("./routes/api/members"));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
