const sqlHandler = require('../data/sqlHandler');


function tryCreateProject(data){
    createProject(data).then(function(result){
        return true;
    }).catch(function(error){
        console.log(error);
        return false;
    })
}

function createProject(data){
    return new Promise(function(resolve, reject){
        sqlHandler.createProject(data).then((result) => {
            console.log(result);
            resolve("Project is aangemaakt");
        }).catch((error) => {
            reject("Project kon niet worden aangemaakt");
        });
    });
}

function getInfoForProject(id){
    let projData = [];
    getProjectInfo(id).then(function(result){
        projData.push(result[0]);
        return projData;
    }).catch(function(error){
        console.log("Geen resultaat");
        return false;
    })
}

function getProjectInfo(id){
    return new Promise(function(resolve, reject){
        sqlHandler.getProjectId(id).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

function tryCreateTask(data){
    createTask(data).then(function(result){
        return true;
    }).catch(function(error){
        console.log(error);
        return false;
    })
}

function createTask(data){
    return new Promise(function(resolve, reject){
        sqlHandler.createTask(data).then((result) => {
            resolve("Taak is aangemaakt");
        }).catch((error) => {
            reject("Taak kon niet worden aangemaakt");
        });
    });
}

function tryUpdateTask(data){
    updateTask(data).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    });
}

function updateTask(data){
    return new Promise(function(resolve, reject){
        sqlHandler.updateTask(data).then((result) => {
            resolve("De taak is aangepast");
        }).catch((error) => {
            console.log(error);
            reject("De taak kon niet worden aangepast.");
        })
    });
}

function tryDeleteTask(id){
    deleteTask(id).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    })
}

function deleteTask(id){
    return new Promise(function(resolve, reject){
        sqlHandler.deleteTask(id).then((result) => {
            resolve("de taak is verwijderd");
        }).catch((error) => {
            console.log(error);
            reject("De taak kon niet verwijderd worden");
        })
    })
}

module.exports.tryCreateProject = tryCreateProject;
module.exports.getInfoForProject = getInfoForProject;
module.exports.tryCreateTask = tryCreateTask;
module.exports.tryUpdateTask = tryUpdateTask;
module.exports.tryDeleteTask = tryDeleteTask;
