;(function() { 
    'use strict';
	window.addEventListener('load', function() {
        document.getElementById('add-new-project').addEventListener('click', showProjAddForm);
        document.getElementById('showChat').addEventListener('click', showChat);
        document.getElementById('showScrum').addEventListener('click', showScrum);
        document.getElementById('showCalander').addEventListener('click', showCalander);
        document.getElementById('showSettings').addEventListener('click', showSettings);

        document.getElementById('editTask').setAttribute('novalidate', 'novalidate');
		document.getElementById('edit_submit').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkEditForm();
        });

        document.getElementById('edit_settings').setAttribute('novalidate', 'novalidate');
		document.getElementById('submit_project_edit').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkSettingsForm();
        });

	})
})();	

function showItem(elementid){
    document.getElementById(elementid).style.display = 'block';
}

function hideItem(elementid){
    document.getElementById(elementid).style.display = 'none';
}

function addTextToHTML(elementid, text){
    document.getElementById(elementid).innerHTML = text;
}

function showHome(show, hide){
    showItem(show);
    hideItem(hide);
}

function showProjAddForm(){
    //hideItem('all-projects-overview');
    showItem('create-new-project');
}

function showChat(){
    hideItem('create-new-project');
    hideItem('project-details');
    showItem('project-chat');
}

function showScrum(){
    hideItem('create-new-project');
    hideItem('project-details');
    showItem('project-scrum');
    getFromAPI('/scrum/' + localStorage.getItem('project_id'), "scrum");
}

function showCalander(){
    hideItem('create-new-project');
    hideItem('project-details');
    showItem('project-calander');
}

function showSettings(){
    hideItem('create-new-project');
    hideItem('project-details');
    showItem('project-settings');
}

function showdetails(project_id){
    //Verberg overzicht
    hideItem('create-new-project');
    showItem('project-details');
    hideItem('all-projects-overview');
    localStorage.setItem('project_id', project_id);
    getFromAPI('/projects/' + project_id + '', "details");
}

function getFromAPI(route, action){
    fetch('http://localhost:3000' + route)
    .then(response => response.json())
    .then(response => decideProcessor(response, action));
}

function decideProcessor(data, action){
    console.log(data);
    switch(action){
        case "details":
            genDetails(data.result);
            break;
        case "scrum":
            processResult(data);
            break;
        case "edit-task":
            fillEditForm(data);
            break;
        case "settings":
            fillSettingsForm(data);
            break;
    }
}

function genDetails(data){
    addTextToHTML('detail-title', data[0].project_name);
    addTextToHTML('detail-description', data[0].description);
    console.log(data);
    genCollabList(data[0].collab);
}

function genCollabList(data){
    let newData = data.split(', ');
    let html = "";
    for(let i = 0; i < newData.length; i++){
        html += "<li class='collaborator'>" + newData[i] + "</li>";
    }
    addTextToHTML('detail-collab', html);
}

function showCreateNewTask(){
    showItem('new-task');
}

function showUpdateTask(){
    showItem('edit-task');
}


function processResult(data){
    let todo = [];
    let doing = [];
    let review = [];
    let done = [];
    let collection = [];
    for(let i = 0; i < data.length; i++){
        switch(data[i].status){
            case "todo":
                todo.push(data[i]);
                break;
            case "doing":
                doing.push(data[i]);
                break;
            case "review":
                review.push(data[i]);
                break;
            case "done":
                done.push(data[i]);
                break;
        }
    }
    collection.push(todo, doing, review, done);
    getHTML(collection);
}

function getHTML(data){
    console.log(data);
    for(let i = 0; i < data.length; i++){
        if(data[i].length > 0){
            let doc = document.getElementById(data[i][0].status)
            doc.innerHTML = "";
            for(let j = 0; j < data[i].length; j++){
                doc.innerHTML += generateTaskHTML(data[i][j]);
            }
        }
    }
}

function generateTaskHTML(row){
    let html = "";
    html += "<div draggable='true' class='task' id='" + row.id + "' data-project_id='" + row.project_id + "' ondrag=selectForDrag(" + row.id + ")>";
    html += "<h3>" + row.title + "</h3>";
    html += "<p>" + row.description + "</p>";
    html += "<p>" + row.comments + "</p>";
    html += "<p>" + row.status + "</p>";
    html += "<button class='edit' onclick=edit(" + row.id + ")>Bewerk</button>";
    html += "<button class='delete' onclick=deleteTask(" + row.id + ")>Verwijder</button>";
    html += "</div>";
    return html;
}

function edit(id){
    getInformation(id);
    localStorage.setItem('task_id', id);
}

function selectForDrag(id){
    console.log("DRAG: " + id);
}

function deleteTask(id){
    if(confirm("Bent u zeker?")){
        deleteFromAPI('/task/' + id);
    }
}

function deleteFromAPI(route){
    console.log(route);
    fetch('http://localhost:3000' + route, {
        method: 'DELETE',
    })
    .then(result => result.json())
    .then(result => deleteResult(result));
}

function deleteResult(result){
    //redirect BE
}

function getInformation(id){
    getFromAPI("/task/" + id, "edit-task");
}

function fillEditForm(data){
    showItem('edit-task');
    document.getElementById('edit_title').value = data.title;
    document.getElementById('edit_description').value = data.description;
    document.getElementById('edit_status').value = data.status;
    document.getElementById('edit_comments').value = data.comments;
    document.getElementById('edit_assigned_user').value = data.assigned_user;
}

function checkEditForm(){
    let data = {
        task_title: document.getElementById('edit_title').value,
        description: document.getElementById('edit_description').value,
        status: document.getElementById('edit_status').value,
        comments: document.getElementById('edit_comments').value,
        assigned_user: document.getElementById('edit_assigned_user').value,
        task_id: localStorage.getItem('task_id')
    }
    console.log(data);
    sendToAPI('/task/' + data.task_id, data, "PUT");
}

function sendToAPI(route, data, action){
    console.log(data);
    fetch('http://localhost:3000' + route, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(function(error){
        console.log(error);
    });
}

function checkSettingsForm(){
    let data = {
        project_name: document.getElementById('edit_project_name').value,
        description: document.getElementById('edit_project_description').value,
        collab: document.getElementById('edit_project_collab').value,
        project_id: localStorage.getItem('project_id')
    }
    sendToAPI('/projects/' + data.project_id + '', data, "PUT");
}

function deleteProject(){
    if(confirm('Bent u zeker?')){
        deleteFromAPI('/projects/' + localStorage.getItem('project_id'));
    }
    
}