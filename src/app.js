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
const tasks = require('./modules/projects/taskActions');
const calender = require('./modules/projects/calenderActions');
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

/////////////=================== BASIC-ROUTES ============================
app.get('', (req,res) =>{
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about_us');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})
/////////////=================== LOGIN/REGISTER ============================
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
/////////////=================== PROJECTS ============================
app.get('/projects', (req, res) => {
    sqlHandler.getAllProjectsUser("JonathanDM").then((result) => {
        res.render('project/projects', {
            projects: result
        })
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/projects/:id', (req,res) => {
        sqlHandler.getProjectId(req.params.id).then((result) => {
            res.send({result: result});
        }).catch((error) => {
            console.log(error);
            console.log("Kon geen informatie ophalen over project");
        })
});

app.put('/projects/:id', (req, res) => {
    try{   
        projects.tryUpdateProject(req.body);
    } catch{
        console.log("Het project kon niet worden bijgewerkt");
    }
});

app.get('/scrum/:id', (req, res) => {
    sqlHandler.getAllTasks(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
    });
});

app.delete('/projects/:id', (req, res) => {
    try{
        projects.tryDeleteProject(req.params.id);
        res.redirect('/projects');
    } catch {
        console.log("De taak kan niet worden verwijderd");
    }
});

app.get('/newproject', (req, res) => {
    res.render('project/addProject');
});

app.post('/newproject', (req,res) => {
    try{
        projects.tryCreateProject(req.body);
        res.json({status: "OK"});
    } catch {
        console.log("Kan niet maken");
        res.json({status: "NOK"});
    }
});
/////////////=================== TASKS ============================
app.get('/newtask', (req,res) => {
    res.render('project/scrum');
});

app.post('/newTask', async (req, res) => {
    try{
        tasks.tryCreateTask(req.body);
        res.redirect('/projects/' + req.body.project_id + '/scrum')
    } catch{
        console.log("Taak kan niet gemaakt worden");
    }
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
        tasks.tryUpdateTask(req.body);
    } catch {
        console.log("De taak kan niet bijgewerkt worden");
    }
});

app.delete('/task/:id', (req, res) => {
    try{
        tasks.tryDeleteTask(req.params.id);
    } catch {
        console.log("De taak kan niet verwijderd worden.");
    }
});

/////////////=================== CALENDER ============================
app.get('/calender/:id', (req, res) => {
    res.render('project/calender', {
        //hier komen later de resutlaten van de kalender ID is hier projectID
    });

});

app.post('/calender', (req, res) => {
    try{
        console.log(req.body);
        calender.tryCreateDeadline(req.body);
    } catch {
        console.log("De deadline kon niet aangemaakt worden.");
    }
});

app.put('/calender/:id', (req, res) => {
    try{
        calender.tryUpdateDeadline(req.body);
    } catch {
        console.log("De deadline kon niet worden aangepast");
    }   
});

app.delete('/calender/:id', (req, res) => {
    try{
        calender.tryDeleteDeadline(req.params.id);
    } catch {
        console.log("De deadline kon niet verwijderd worden");
    }
});

/////////////=================== NOT FOUND ============================
app.get('*', (req,res) => {
    res.render('404', {
        page: req.url
    });
});

/////////////=================== SERVER STARTS ============================
app.listen(server.config.PORT, () => console.log('De applicatie luistert op poort: ' + server.config.PORT));