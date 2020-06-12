const SQL = {
    SELECT_ALL: 'SELECT * FROM users',
    CREATE_USER: 'INSERT INTO users(username, email, school_name, password) values(?,?,?,?)',
    CHECK_EMAIL: 'SELECT * FROM users WHERE email = ?',
    CHECK_USERNAME: 'SELECT * FROM users WHERE username = ?',
    CREATE_PROJECT: 'INSERT INTO projects(project_name, owner, description, collab) values(?,?,?,?)',
    GET_ALL_PROJECTS_OWNER: 'SELECT * FROM projects WHERE owner = ?',
    GET_PROJECT_ID: 'SELECT * FROM projects WHERE id = ?',
    ADD_TASK: 'INSERT INTO scrum_tasks(project_id, title, description, status, comments, assigned_user) values (?,?,?,?,?,?)',
    GET_ALL_TASKS_PROJECT: 'SELECT * FROM scrum_tasks WHERE project_id = ?',
    GET_TASK_ID: 'SELECT * FROM scrum_tasks WHERE id = ?',
    UPDATE_TASK: 'UPDATE scrum_tasks SET title = ?, description = ?, status = ?, comments = ?, assigned_user = ? WHERE id = ?',
    DELETE_TASK: 'DELETE FROM scrum_tasks WHERE id = ?',
    GET_ALL_PROJECTS_OWNER_OR_COLLAB: 'SELECT * FROM projects WHERE owner = ? OR collab LIKE "%"?"%"',
    DELETE_PROJECT: 'DELETE FROM projects WHERE id = ?',
    UPDATE_PROJECT: 'UPDATE projects SET project_name = ?, description = ?, collab = ? WHERE id = ?'
}

module.exports.SQL = SQL;