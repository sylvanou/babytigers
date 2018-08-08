module.exports = function(app, tigers) {
  app.get("/", function(req, res) {
    res.send(getTigers(tigers));
  });

  app.get("/add", function(req, res) {
    // console.log(req)
    res.render("add.html");
  });
  app.get("/add-submit", function(req, res) {
    console.log(req.query.name);
    tigers.push(req.query.name);
    res.send(getTigers(tigers));
  });
  app.get("/update-submit", function(req, res) {
    // console.log(req)
    tigers.splice(req.query.pos, 1, req.query.name);
    res.send(getTigers(tigers));
  });
  app.get("/update", function(req, res) {
    // console.log(req)
    res.render("update.html");
  });
  app.get("/del", function(req, res) {
    // console.log(req)
    res.render("del.html");
  });
  app.get("/del-submit", function(req, res) {
    // console.log(req)
    tigers.splice(req.query.name, 1);
    res.send(getTigers(tigers));
  });
  function getTigers(tigers) {
    let tgs = "";
    for (let i = 0; i < tigers.length; i++) {
      tgs += "<li>" + tigers[i] + "</li>";
    }
    return `<col>${tgs}</col>`;
  }
};
