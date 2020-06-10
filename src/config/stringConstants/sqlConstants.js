const SQL = {
    SELECT_ALL: 'SELECT * FROM users',
    CREATE_USER: 'INSERT INTO users(username, email, school_name, password) values(?,?,?,?)',
    CHECK_EMAIL: 'SELECT * FROM users WHERE email = ?',
    CHECK_USERNAME: 'SELECT * FROM users WHERE username = ?',
}

module.exports.SQL = SQL;