const sqlHandler = require('../data/sqlHandler');

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

module.exports.tryCreateTask = tryCreateTask;
module.exports.tryUpdateTask = tryUpdateTask;
module.exports.tryDeleteTask = tryDeleteTask;