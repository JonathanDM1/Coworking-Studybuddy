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

function tryUpdateProject(data){
    updateProject(data).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    })
}

function updateProject(data){
    return new Promise(function(resolve, reject){
        sqlHandler.updateProject(data).then((result) => {
            resolve("Het project is bijgewerkt");
        }).catch((error) => {
            console.log(error);
            reject("Het project kon niet worden bijgewerkt");
        })
    })
}

function tryDeleteProject(id){
    deleteProject(id).then(function(result){
        return true;
    }).catch(function(error){
        return false;
    })
}


function deleteProject(id){
    return new Promise(function(resolve, reject){
        sqlHandler.deleteProject(id).then((result) => {
            resolve("Het project is verwijderd");
        }).catch((error) => {
            console.log(error);
            reject("Het project kan niet worden verwijderd");
        })
    })
}

module.exports.tryCreateProject = tryCreateProject;
module.exports.getInfoForProject = getInfoForProject;
module.exports.tryUpdateProject = tryUpdateProject;
module.exports.tryDeleteProject = tryDeleteProject;
