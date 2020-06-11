;(function() { 
    'use strict';
	window.addEventListener('load', function() {
        document.getElementById('createNewProject').setAttribute('novalidate', 'novalidate');
		document.getElementById('createNewProject').addEventListener('submit', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkForm();
        });
	})
})();
let isValid = false;
function checkForm(){
    let data = getFormData();
    console.log(data);
    sendFormToAPI('/newproject', data);
    if(isValid){
        //save in db
    } else {
        //GEEF EEN ERROR
    }
}

function getFormData(){
    let data = {
        project_name: document.getElementById('project_name').value,
        owner: document.getElementById('owner').value,
        description: document.getElementById('description').value,
        collab: genCollab(document.getElementById('collab').value)
    }
    return data;
}

function genCollab(data){
    data = data.split(';');
    console.log(data);
    return data;
}

function sendFormToAPI(route, data){
    fetch('http://localhost:3000' + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => checkResponse(json))
    .catch(function(error){
        console.log(error);
    });
}