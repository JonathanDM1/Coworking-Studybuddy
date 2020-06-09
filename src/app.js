//DOWNLOADED MODULES
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

//OWN MODULES
const server = require('./config/serverConfig');

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

app.post('/login', (req,res) => {
    //Probeer de user in te loggen. if(user == true) -> succes else -> error
    if(req.body != 0){
        res.send({status: "OK"});
        console.log(req.body);
    } else {
        res.send({status: "NOK"});
    }
});

app.post('/register', (req, res) => {
    if(req.body != 0){
        res.send({status: "OK"});
        console.log(req.body);
    } else {
        res.send({status: "NOK"});
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