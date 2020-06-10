const bcrypt = require('bcrypt');
const sqlHandler = require('../data/sqlHandler');
const parseData = require('../data/parseData');

async function checkIfUserCreates(data){
        let amountEmail = checkEmailAdress(data.email);
        let amountUsername = checkUsername(data.username);
        data = parseData.parseUserData(data);
        data.password = await hashPassword(data.password);
        createUser(data);
}


function createUser(data){
    sqlHandler.createUser(data).then((results) => {
        console.log(results);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}

function checkEmailAdress(email){
    sqlHandler.checkEmail(email).then((results) => {
        return results.length;
    }).catch((error) => {
        console.log(error);
    });
}

function checkUsername(username){
    sqlHandler.checkUsername(username).then((results) => {
        return results.length;
    }).catch((error) => {
        console.log(error);
    });
}

function checkResult(res){
    console.log(res.length);
    if(res.length == 0){
        return true;
    } else {
        return false
    }
}

async function hashPassword(password){
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}


module.exports.checkIfUserCreates = checkIfUserCreates;