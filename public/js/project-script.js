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
            if(checkFormValid('editTask')){
                checkEditForm();
            } else {
                alert("Niet alle velden zijn ingevuld");
            }
        });

        document.getElementById('edit_settings').setAttribute('novalidate', 'novalidate');
		document.getElementById('submit_project_edit').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            if(checkFormValid('edit_settings')){
                checkSettingsForm();
            } else {
                alert("Niet alle velden zijn ingevuld");
            }
        });

        document.getElementById('createNewDeadline').setAttribute('novalidate', 'novalidate');
		document.getElementById('calander-new-deadline').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            if(checkFormValid('createNewDeadline')){
                checkCalanderForm();
            } else {
                alert("Niet alle velden zijn ingevuld");
            }
        });

        document.getElementById('updateDeadlineForm').setAttribute('novalidate', 'novalidate');
		document.getElementById('edit_calander-deadline').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            if(checkFormValid('updateDeadlineForm')){
                checkEditCalanderForm();
            } else {
                alert("Niet alle velden zijn ingevuld");
            }
        });

        document.getElementById('createNewProject').setAttribute('novalidate', 'novalidate');
        document.getElementById('createNewProject').addEventListener('submit', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(checkFormValid('createNewProject')){
                getCreateProjectFormData();
            } else {
                alert('Gelieve alle velden in te vullen aub.');
            }
        });

        document.getElementById('addTask').setAttribute('novalidate', 'novalidate');
        document.getElementById('addTask').addEventListener('submit', function(e){
            e.preventDefault();
            e.stopPropagation();
            if(checkFormValid('addTask')){
                getCreateTaskFormData();
            } else {
                alert('Gelieve alle velden in te vullen aub.');
            }
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
    //document.getElementById('chat').innerHTML = createWidgetBot();
}

function createWidgetBot(){
    console.log('Ik laad nu de chat in');
    return "<widgetbot server='721015263033819176' channel='721021156731387973' width='800' height='600' shard='https://e.widgetbot.io'></widgetbot>";
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
    getFromAPI('/calender/' + localStorage.getItem('project_id'), "all-deadlines");
}

function showSettings(){
    hideItem('create-new-project');
    hideItem('project-details');
    showItem('project-settings');
    getFromAPI('/projects/' + localStorage.getItem('project_id'), "edit-settings");
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
        case "edit-settings":
            fillSettingsForm(data);
            break;
        case "edit-calender":
            fillEditDeadlineForm(data);
            break;
        case "all-deadlines":
            generateDeadlinesHTML(data);
            break;
    }
}

function genDetails(data){
    addTextToHTML('detail-title', data[0].project_name);
    addTextToHTML('detail-description', data[0].description);
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
    //HET IDEE HIER WAS NOG EEN DRAG AND DROP TOE TE VOEGEN VOOR DE SCRUM TASKS
    console.log("DRAG: " + id);
}

function deleteTask(id){
    if(confirm("Bent u zeker?")){
        deleteFromAPI('/task/' + id);
    }
}

function deleteFromAPI(route){
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
    sendToAPI('/task/' + data.task_id, data, "PUT");
}

function sendToAPI(route, data, action){
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

function checkCalanderForm(){
    let data = {
        project_id: localStorage.getItem('project_id'),
        deadline: String(document.getElementById('deadline_date').value),
        title: document.getElementById('deadline_title').value,
        description: document.getElementById('deadline_description').value,
        importance: document.getElementById('deadline_importance').value
    }
    sendToAPI('/calender', data, "POST");
}

function checkEditCalanderForm(){
    let data = {
        deadline: String(document.getElementById('edit_deadline_date').value),
        title: document.getElementById('edit_deadline_title').value,
        description: document.getElementById('edit_deadline_description').value,
        importance: document.getElementById('edit_deadline_importance').value,
        id: localStorage.getItem('calender_id')
    }
    sendToAPI('/calender/' + data.id, data, "PUT");
}

function showNewDeadlineForm(){
    showItem('newDeadline');
    hideItem('addDeadlineButton');
}

function editDeadline(id){
    showItem('updateDeadline');
    localStorage.setItem('calender_id', id);
    getFromAPI('/calender/deadline/' + id, "edit-calender");
}

function fillSettingsForm(data){
    data = data.result[0];
    document.getElementById('edit_project_name').value = data.project_name;
    document.getElementById('edit_project_description').value = data.description;
    document.getElementById('edit_project_collab').value = data.collab;
}

function fillEditDeadlineForm(data){
    data = data.result[0];
    document.getElementById('edit_deadline_title').value = data.title;
    document.getElementById('edit_deadline_date').value = data.deadline;
    document.getElementById('edit_deadline_description').value = data.description;
    document.getElementById('edit_deadline_importance').value = data.importance;
}

function deleteDeadline(id){
    if(confirm('Bent u het zeker?')){
        deleteFromAPI('/calender/' + id)
    }
}

function generateDeadlinesHTML(data){
    let html = "";
    let doc = document.getElementById('deadlineContainer');
    if(data.result.length == 0){
        doc.innerHTML = showNoDeadlines();
    } else {
        for(let i = 0; i < data.result.length; i++){
            html += genDeadline(data.result[i]);
        }
        doc.innerHTML = html + newDeadlineButton();
    }
}

function newDeadlineButton(){
    return "<button class='addbutton' id='addDeadlineButton' onclick='showNewDeadlineForm()'>+ Voeg nieuwe deadline toe</button>";
}

function showNoDeadlines(){
    let html = "<div id='no-deadlines'>";
    html += "<p>Er zijn nog geen deadlines voor dit project</p>";
    html += newDeadlineButton();
    return html;
}

function genDeadline(data){
    let html = "<div class='deadline'>";
    html += "<h3>" + data.title + "</h3>";
    html += "<p class='deadline-date'>" + data.deadline + "</p>";
    html += "<p class='deadline-description'>" + data.description + "</p>";
    html += "<p class='" + data.importance + "'>" + data.importance.toUpperCase() + "</p>";
    html += "<div class='button-group'>";
    html += "<button class='edit-button' onclick='editDeadline(" + data.id + ")'>Bewerk</button>";
    html += "<button class='delete-button' onclick='deleteDeadline(" + data.id + ")'>Verwijder</button>";
    html += "</div>";
    html += "</div>"
    return html;
}

function checkFormValid(formId){
    let empty = 0;
    let doc = document.getElementById(formId).elements;
    for(let i = 0; i < doc.length; i++){
        if(doc[i].value == ""){
            empty += 1;
        }
    }
    return checkEmpty(empty);
}

function checkEmpty(amount){
    if(amount > 0){
        return false;
    } else {
        return true;
    }
}

function getCreateProjectFormData(){
    let data = {
        project_name: document.getElementById('new_project_name').value,
        owner: document.getElementById('new_project_owner').value,
        description: document.getElementById('new_project_description').value,
        collab: genCollab(document.getElementById('new_project_collab').value)
    }
    sendFormToAPI('/newproject', data, "new-project");
}

function getCreateTaskFormData(){
    let data = {
        project_id: localStorage.getItem('project_id'),
        task_title: document.getElementById('task_title').value,
        description:document.getElementById('task_description').value,
        status: document.getElementById('task_status').value,
        comments: document.getElementById('comment').value,
        assigned_user: document.getElementById('assigned_user').value
    }
    sendFormToAPI('/newtask', data, "new-task");
}

function genCollab(data){
    data = data.split(';');
    return data;
}

function sendFormToAPI(route, data, action){
    fetch('http://localhost:3000' + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => checkResponse(json, action))
    .catch(function(error){
        console.log(error);
    });
}

function checkResponse(response, action){
    if(response.status == "OK"){
        showCorrectMessage(action + "-success");
    } else {
        showCorrectMessage(action + "-error");
    }
}

function showCorrectMessage(action){
    switch(action){
        case "new-project-success":
            showItem('new-project-success');
            hideItem('createNewProject');
            redirectAndShow('');
            break;
        case "new-project-error":
            showItem('new-project-error');
            break;
        case "new-task-success":
            showItem('new-task-success');
            hideItem('addTask');
            break;
        case "new-task-error":
            showItem('new-task-error');
            break;
    }
}