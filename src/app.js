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

//ALLE ROUTES HIERBOVEN PLAATSEN
app.get('*', (req,res) => {
    res.render('404', {
        page: req.url
    });
});

app.listen(server.config.PORT, () => console.log('De applicatie luistert op poort: ' + server.config.PORT));