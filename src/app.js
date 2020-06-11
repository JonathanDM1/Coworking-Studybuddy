require('dotenv').config();
//DOWNLOADED MODULES
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');

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

app.get('/projects', (req,res) => {
    res.render('project/projects');
});

app.post('/login', (req,res) => {
    try{
        users.tryLogIn(req.body);
        //create and assign token
        const token = jwt.sign(req.body.username, process.env.JWT_TOKEN_SECRET);
        res.json({status: "OK", accessToken: token});
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