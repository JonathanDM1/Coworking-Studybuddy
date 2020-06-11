const SQL = {
    SELECT_ALL: 'SELECT * FROM users',
    CREATE_USER: 'INSERT INTO users(username, email, school_name, password) values(?,?,?,?)',
    CHECK_EMAIL: 'SELECT * FROM users WHERE email = ?',
    CHECK_USERNAME: 'SELECT * FROM users WHERE username = ?',
    CREATE_PROJECT: 'INSERT INTO projects(project_name, owner, description, collab) values(?,?,?,?)',
    GET_ALL_PROJECTS_OWNER: 'SELECT * FROM projects WHERE owner = ?'
}

module.exports.SQL = SQL;