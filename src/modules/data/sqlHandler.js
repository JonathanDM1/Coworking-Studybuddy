const mysql = require('mysql2/promise');

//own modules
const dbConf = require('../../config/data/sql/sqlConfig');
const QUERY = require('../../config/stringConstants/sqlConstants');
const parseData = require('../data/parseData');

//EXEC QUERIES
async function executeQuery(query, data){
    const conn = await mysql.createConnection(dbConf.config);
    const [results] = await conn.query(query, data);
    await conn.end();
    return results;
}

//FUNCTION RETURNS...
function createUser(data){
    return executeQuery(QUERY.SQL.CREATE_USER, parseData.parseSql(data));
}

function checkUsername(data){
    return executeQuery(QUERY.SQL.CHECK_USERNAME, [data]);
}

function checkEmail(data){
    return executeQuery(QUERY.SQL.CHECK_EMAIL, [data]);
}

module.exports.createUser = createUser;
module.exports.checkUsername = checkUsername;
module.exports.checkEmail = checkEmail;