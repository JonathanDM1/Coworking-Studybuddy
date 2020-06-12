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

function createProject(data){
    return executeQuery(QUERY.SQL.CREATE_PROJECT, parseData.parseSql(data));
}

function getAllTasks(data){
    return executeQuery(QUERY.SQL.GET_ALL_TASKS_PROJECT, [data]);
}

function createTask(data){
    return executeQuery(QUERY.SQL.ADD_TASK, parseData.parseSql(data));
}

function getProjectId(data){
    return executeQuery(QUERY.SQL.GET_PROJECT_ID, [data]);
}

function getTaskId(data){
    return executeQuery(QUERY.SQL.GET_TASK_ID, [data]);
}

function updateTask(data){
    return executeQuery(QUERY.SQL.UPDATE_TASK, parseData.parseSql(data));
}

function deleteTask(data){
    return executeQuery(QUERY.SQL.DELETE_TASK, [data]);
}

function getAllProjectsUser(data){
    return executeQuery(QUERY.SQL.GET_ALL_PROJECTS_OWNER_OR_COLLAB, parseData.duplicateData(data));
}

function deleteProject(data){
    return executeQuery(QUERY.SQL.DELETE_PROJECT, [data]);
}

module.exports.createUser = createUser;
module.exports.checkUsername = checkUsername;
module.exports.checkEmail = checkEmail;
module.exports.createProject = createProject;
module.exports.getAllTasks = getAllTasks;
module.exports.getProjectId = getProjectId;
module.exports.createTask = createTask;
module.exports.getTaskId = getTaskId;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.getAllProjectsUser = getAllProjectsUser;
module.exports.deleteProject = deleteProject;