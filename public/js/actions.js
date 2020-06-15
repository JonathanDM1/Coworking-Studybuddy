;(function() { 
    'use strict';
	window.addEventListener('load', function() {
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
    console.log(data);
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

