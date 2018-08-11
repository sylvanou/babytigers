var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var fs = require("fs");
var app = express();

// var tigers = ["Joe", "Jack", "John", "Jason", "Jeff"];
// Load the tigers
var tigers = [];

fs.readFile(__dirname + "/tigers", "utf8", function(err, data) {
  // Load tigers if there are no errors
  if (!err) tigers = JSON.parse(data);
  // console.log("inside:", tigers);

  // include routers
  require("./router/main")(app, tigers, fs);

  // handle 404 errors
  app.use(function(req, res) {
    app.status(404).send("Error 404 not found");
  });
  // handle generic errors
  app.use(function(err, req, res, next) {
    res.status(500).send("The app found an error. Please try again later");
  });
});

// initialize the cookies and session
app.use(cookieParser());
app.use(session({ secret: 'qwerty' }));

// initialize the views using ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Start server
var server = app.listen(8585, function() {
  console.log("Listening on port: 8585");
});
