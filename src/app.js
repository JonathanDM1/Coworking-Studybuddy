require('dotenv').config();
//DOWNLOADED MODULES
const express = require('express');
//const session = require('express-session');
const app = express();
const path = require('path');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');

//OWN MODULES
const server = require('./config/serverConfig');
const users = require('./modules/users/loginregister');
const projects = require('./modules/projects/projectActions');
const sqlHandler = require('./modules/data/sqlHandler');


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

app.get('/projects', (req, res) => {
    sqlHandler.getAllProjectsUser("JonathanDM").then((result) => {
        console.log(result);
        res.render('project/projects', {
            projects: result
        })
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/projects/:id', (req,res) => {
    //GET PROJECT WITH ID AND RENDER
        sqlHandler.getProjectId(req.params.id).then((result) => {
            res.render('project/projectDetail', {
                id: result[0].id,
                project_name: result[0].project_name,
                owner: result[0].owner,
                description: result[0].description,
                collab: result[0].collab
            });
        }).catch((error) => {
            console.log(error);
            console.log("Kon geen informatie ophalen over project");
        })
});

app.get('/newtask', (req,res) => {
    res.render('project/scrum');
});

app.post('/newTask', async (req, res) => {
    let test = 1;
    try{
        projects.tryCreateTask(req.body);
    } catch{
        console.log("Taak kan niet gemaakt worden");
    }
    res.redirect('/projects/' + test + '/scrum');
});

app.get('/task/:id', (req, res) => {
    sqlHandler.getTaskId(req.params.id).then((result) => {
        res.json(result[0]);
    }).catch((error) => {
        console.log(error);
        console.log("Kon geen informatie ophalen over taak");
    })
})

app.put('/task/:id', (req, res) => {
    try{
        projects.tryUpdateTask(req.body);
    } catch {
        console.log("De taak kan niet bijgewerkt worden");
    }
});

app.delete('/task/:id', (req, res) => {
    try{
        projects.tryDeleteTask(req.params.id);
    } catch {
        console.log("De taak kan niet verwijderd worden.");
    }
})

app.get('/projects/:id/scrum', (req, res) => {
    sqlHandler.getAllTasks(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/projects/:id/settings', (req,res) => {
    console.log("Hier komen de settings voor het project");
});

app.delete('/projects/:id', (req, res) => {
    try{
        projects.tryDeleteProject(req.params.id);
        res.json({status: "OK"});
    } catch {
        console.log("De taak kan niet worden verwijderd");
    }
});

app.get('/newproject', (req, res) => {
    res.render('project/addProject');
});

app.post('/newproject', (req,res) => {
    console.log(req.body);
    try{
        projects.tryCreateProject(req.body);
        res.json({status: "OK"});
        console.log("Er is een nieuw project aangemaakt");
    } catch {
        console.log("Kan niet maken");
        res.json({status: "NOK"});
    }
});


//ALLE ROUTES HIERBOVEN PLAATSEN
app.get('*', (req,res) => {
    res.render('404', {
        page: req.url
    });
});


app.listen(server.config.PORT, () => console.log('De applicatie luistert op poort: ' + server.config.PORT));