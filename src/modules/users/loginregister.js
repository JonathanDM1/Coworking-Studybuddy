//const bcrypt = require('bcrypt');
const sqlHandler = require('../data/sqlHandler');
const parseData = require('../data/parseData');

function tryRegister(data){
    checkUsernameExists(data).then(function(result){
        return checkEmailExists(data);
    }).then(function(result){
        return changePassword(data);
    }).then(function(result){
        return createUser(result);
    }).then(function(result){
        console.log("De gebruiker is aangemaakt");
        return true;
    }).catch(function(error){
        console.log(error);
    });
}

function checkUsernameExists(data){
    return new Promise(function(resolve, reject){
        sqlHandler.checkUsername(data.username).then((result) => {
            if(result.length == 0){
                resolve(data);
            } else {
                reject('Username bestaat al');
            }
        }).catch((error) => {
            console.log(error);
        })
    })
}

function checkEmailExists(data){
    return new Promise(function(resolve, reject){
        sqlHandler.checkEmail(data.email).then((result) => {
            if(result.length == 0){
                resolve(data);
            } else {
                reject('Email bestaat al');
            }
        }).catch((error) => {
            console.log(error);
        })
    })
}

function changePassword(data){
    return new Promise(async function(resolve, reject){
        data = parseData.parseUserData(data);
        data.password = await hashPassword(data.password);
        resolve(data);
    });
}

function createUser(data){
    return new Promise(function(resolve, reject){
        sqlHandler.createUser(data).then((result) => {
            resolve("Gebruiker is aangemaakt");
        }).catch((error) => {
            reject("Gebruiker kon niet worden aangemaakt");
        });
    });
}

function tryLogIn(data){
    checkUsername(data).then(function(result){
        console.log("Gebruiker gevonden");
        return checkPassword(result);
    }).then(function(result){
        console.log("komt overeen");
        return true;
    }).catch(function(error){
        console.log("error");
        return false;
    })
}

function checkUsername(data){
    return new Promise(function(resolve, reject){
        sqlHandler.checkUsername(data.username).then((result) => {
            let item = {
                data: data,
                result: result
            };
            resolve(item);
        }).catch((error) => {
            reject("Gebruiker niet gevonden");
        })
    })
}

function checkPassword(params){
    return new Promise(async function(resolve, reject){
        if(await bcrypt.compare(params.data.password, params.result[0].password)){
            resolve("Passwoorden komen overeen");
        } else {
            reject("Paswoorden komen niet overeen");
        }
    })
}



function hashPassword(password){
    return bcrypt.hash(password, 10);
}

module.exports.tryRegister = tryRegister;
module.exports.tryLogIn = tryLogIn;