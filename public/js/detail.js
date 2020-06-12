;(function() { 
    'use strict';
	window.addEventListener('load', function() {
        document.getElementById('edit_project').setAttribute('novalidate', 'novalidate');
        document.getElementById('edit_project').addEventListener("submit", function(e){
            e.preventDefault();
            e.stopPropagation();
            getForm();
        })
	})
})();


function showdetails(id){
    window.location.href= 'http://localhost:3000/projects/' + id + '';
}

function edit(id){
    localStorage.setItem('project_id', id);
    getFromAPI('/projects/' + id)
}

function deleteProject(id){
    if(confirm("Bent u zeker?")){
        deleteFromAPI('/projects/' + id);
    }
}

function deleteResult(result){
    if(result.status == "OK"){
        window.location.reload();
    }
}

function deleteFromAPI(route){
    fetch('http://localhost:3000' + route, {
        method: 'DELETE',
    })
    .then(result => result.json())
    .then(result => deleteResult(result));
}

function getForm(){
    let data = {
        title: document.getElementById('edit_title').value,
        description: document.getElementById('edit_description').value,
        collab: document.getElementById('edit_collab').value,
        project_id: localStorage.getItem('project_id')
    };
    sendFormToAPI('/projects/' + data.project_id, data, "PUT");
}

function getFromAPI(route){
    fetch('http://localhost:3000' + route)
        .then(response => response.json())
        .then(response => fillEditForm(response.result[0]));
}

function fillEditForm(data){
    document.getElementById('edit_title').value = data.project_name;
    document.getElementById('edit_description').value = data.description;
    document.getElementById('edit_collab').value = data.collab;
}

function sendFormToAPI(route, data, action){
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