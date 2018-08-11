module.exports = function(app, tigers, fs)
{
    //
    // index file
    //
    app.get('/', function(req, res){
        if(req.session.username) {
            res.render('index', {ptitle:"Tigers", tigers: tigers, username: req.session.username});
        }
        else res.redirect('/login');
    });

    //
    // add a new tiger
    //
    app.get('/add', function(req, res){
        if(req.session.username) {
            res.render('add', {ptitle:"Add tiger", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/add-submit', function(req, res){
        // save tiger to the array
        tigers.push(req.query.name);

        // save tiger to the file
        fs.writeFile(__dirname+'/../tigers', JSON.stringify(tigers), 'utf8');

        // redirect to home
        res.redirect('/');
    });

    // 
    // update a tiger
    //
    app.get('/update', function(req, res){
        if(req.session.username) {
            res.render('update', {ptitle:"Update tiger", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/update-submit', function(req, res){
        // update tiger array
        tigers.splice(req.query.pos, 1, req.query.name);

        // update tiger from the file
        fs.writeFile(__dirname+'/../tigers', JSON.stringify(tigers), 'utf8');

        // redirect to home
        res.redirect('/');
    });

    //
    // delete a tiger
    //
    app.get('/del', function(req, res){
        if(req.session.username) {
            res.render('delete', {ptitle:"Delete tiger", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/del-submit', function(req, res){
        // delete from array
        tigers.splice(req.query.pos, 1);

        // delete tiger from the file
        fs.writeFile(__dirname+'/../tigers', JSON.stringify(tigers), 'utf8');

        // redirect to home
        res.redirect('/');
    });

    app.get('/login', function(req, res){
        res.render('login', {ptitle: "Login", hideLogin: true});
    });

    //
    // login and logout a user
    //
    app.get('/login-submit', function(req, res){
        req.session.username = req.query.name;
        res.redirect('/');
    });

    app.get('/logout-submit', function(req, res){
        req.session.username = false;
        res.send('You ended your session correctly');
    });

    //
    // ajax calls
    //
    app.get('/get-tigers', function(req, res){
        res.json({tigers: tigers});
    });
}
