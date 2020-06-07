const mysql = require('mysql2/promise');

//own modules
const dbConf = require('../../config/dbConfig');
const QUERY = require('../../config/stringConstants/sqlConstants');

//EXEC QUERIES
async function executeQuery(query, data){
    const conn = await mysql.createConnection(dbConf.config);
    const [results] = await conn.query(query, data);
    await conn.end();
    return results;
}

//FUNCTION RETURNS...
function getAll() {
    return executeQuery(QUERY.SQL.SELECT_ALL, "");
}