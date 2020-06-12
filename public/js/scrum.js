;(function() { 
    'use strict';
	window.addEventListener('load', function() {
        document.getElementById('addTask').setAttribute('novalidate', 'novalidate');
		document.getElementById('submit_task').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkForm();
        });
        document.getElementById('editTask').setAttribute('novalidate', 'novalidate');
		document.getElementById('edit_submit').addEventListener('click', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkEditForm();
        });
	})
})();

function checkForm(){
    //Via localstorage project_id doorgeven.
    let data = {
        project_id: localStorage.getItem('project_id'),
        task_title: document.getElementById('task_title').value,
        description: document.getElementById('task_description').value,
        status: document.getElementById('task_status').value,
        comments: document.getElementById('comment').value,
        assigned_user: document.getElementById('assigned_user').value
    }
    sendFormToAPI('/newtask', data, "POST");
}

function sendFormToAPI(route, data, action){
    console.log(data);
    fetch('http://localhost:3000' + route, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => processResult(json))
    .catch(function(error){
        console.log(error);
    });
}

function getFromAPI(route){
    fetch('http://localhost:3000' + route)
        .then(response => response.json())
        .then(data => fillEditForm(data));
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
    console.log(result);
}

function getInformation(id){
    getFromAPI("/task/" + id);
}

function fillEditForm(data){
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
    sendFormToAPI('/task/' + data.task_id, data, "PUT");
}