const express = require("express");
const app = express();
const tigers = ["tiger1", "tiger2", "tiger3", "tiger4", "tiger5"];
require("./router/main")(app, tigers);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const server = app.listen(3535, function() {
  console.log("Hello world");
});
