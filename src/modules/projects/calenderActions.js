const sqlHandler = require('../data/sqlHandler');

function tryCreateDeadline(data){
    createDeadline(data).then(function(result){
        return true;
    }).catch(function(error){
        console.log(error);
        return false;
    })
}

function createDeadline(data){
    return new Promise(function(resolve, reject){
        sqlHandler.createDeadline(data).then((result) => {
            console.log(result);
            resolve("Deadline is aangemaakt");
        }).catch((error) => {
            console.log(error);
            reject("Deadline kon niet worden aangemaakt");
        });
    });
}

function tryUpdateDeadline(data){
    updateDeadline(data).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    })
}

function updateDeadline(data){
    return new Promise(function(resolve, reject){
        sqlHandler.updateDeadline(data).then((result) => {
            resolve("De deadline is bijgewerkt");
        }).catch((error) => {
            console.log(error);
            reject("De deadline kon niet worden bijgewerkt");
        })
    })
}

function tryDeleteDeadline(id){
    deleteDeadline(id).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    })
}


function deleteDeadline(id){
    return new Promise(function(resolve, reject){
        sqlHandler.deleteDeadline(id).then((result) => {
            resolve("De deadline is verwijderd");
        }).catch((error) => {
            console.log(error);
            reject("De deadline kan niet worden verwijderd");
        })
    })
}

module.exports.tryCreateDeadline = tryCreateDeadline;
module.exports.tryUpdateDeadline = tryUpdateDeadline;
module.exports.tryDeleteDeadline = tryDeleteDeadline;
