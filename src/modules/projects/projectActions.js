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

function getProject(data){

}

module.exports.tryCreateProject = tryCreateProject;
