//DOWNLOADED MODULES
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const hbs = require('hbs');

//OWN MODULES
const server = require('./config/serverConfig');
const users = require('./modules/users/loginregister');

//DIRECTORIES
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../views');
const partialsDirectory = path.join(__dirname, '../views/partials');

hbs.registerPartials(partialsDirectory);
app.use(express.json());
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

app.use(session({
    secret: 'Dit is een sleutel',
    resave: false,
    saveUninitialized: false
}));
///---------------- ROUTES --------------///
app.get('', (req,res) =>{
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/loginregister', (req, res) => {
    res.render('user/loginregister');
});

app.post('/login', (req,res) => {
    try{
        users.tryLogIn(req.body);
        res.json({status: "OK"});
        req.session.username = req.body.username;
    } catch{
        res.json({status: "NOK"});
    }
    
});

app.post('/register', (req, res) => {
    try{
        users.tryRegister(req.body);
        res.json({status: "OK"});
    }catch{
        res.json({status: "NOK"});
    }
});

app.get('/settings', (req, res) => {
    res.render('user/settings');
});

//ALLE ROUTES HIERBOVEN PLAATSEN
app.get('*', (req,res) => {
    res.render('404', {
        page: req.url
    });
});

app.listen(server.config.PORT, () => console.log('De applicatie luistert op poort: ' + server.config.PORT));