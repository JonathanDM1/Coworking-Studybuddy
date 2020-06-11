const sqlHandler = require('../data/sqlHandler');

function getAllTasksWhere(id){
    getAllTasks(id).then(function(result){
        console.log(result);
        return result;
    }).catch(function(error){
        console.log(error);
        return error;
    })
}

function getAllTasks(id){
    return new Promise(function(resolve, reject) {
        sqlHandler.getAllTasks(id).then((result) => {
            console.log(result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            reject('Kon niet worden opgehaald');
        });
    })
}



module.exports.getAllTasksWhere = getAllTasksWhere;