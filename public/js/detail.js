;(function() { 
    'use strict';
	window.addEventListener('load', function() {
        
	})
})();


function showdetails(id){
    window.location.href= 'http://localhost:3000/projects/' + id + '';
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