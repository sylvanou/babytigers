module.exports = function(app, tigers) {
  app.get("/", function(req, res) {
    if (!req.session.username) {
      res.render("index", {
        ptitle: "Tigers",
        tigers: tigers,
        username: req.session.username
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/add", function(req, res) {
    // console.log(req)
    res.render("add", { ptitle: "Add tiger" });
  });
  app.get("/add-submit", function(req, res) {
    // console.log(req.query.name);
    tigers.push(req.query.name);
    res.redirect("/");
  });
  app.get("/update", function(req, res) {
    // console.log(req)
    res.render("update", { ptitle: "Update tiger" });
  });
  app.get("/update-submit", function(req, res) {
    // console.log(req)
    tigers.splice(req.query.pos, 1, req.query.name);
    res.redirect("/");
  });
  app.get("/del", function(req, res) {
    // console.log(req)
    res.render("del", { ptitle: "Delete tiger" });
  });
  app.get("/del-submit", function(req, res) {
    // console.log(req)
    tigers.splice(req.query.name, 1);
    res.redirect("/");
  });
  app.get("/login", function(req, res) {
    // console.log(req)
    res.render("login", { ptitle: "login", username: req.session.username });
  });
  app.get("/login-submit", function(req, res) {
    // console.log(req)
    req.session.username = req.query.username;
    res.redirect("/");
  });
  app.get("/get-tigers", function(req, res) {
    // console.log(req)
    res.json({ tigers: tigers });
  });
};
