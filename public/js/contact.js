;(function() { 
    'use strict';
	window.addEventListener('load', function() {
		document.getElementById('contactForm').setAttribute('novalidate', 'novalidate');
        document.getElementById('contactForm').addEventListener('submit', function(e){
            e.preventDefault();
			e.stopPropagation();
            if(checkFormValid('contactForm')){
                getContactFormData();
            } else {
                alert('Niet alle velden zijn ingevuld');
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

function sendFormToAPI(route, data){
    fetch(route, {
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

function getContactFormData(){
    let data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        question: document.getElementById('question').value
    }
    sendFormToAPI('/contact', data);
}

function checkResponse(data){
    if(data.status == "OK"){
        document.getElementById('contact-success').style.display = 'block';
        document.getElementById('contactForm').style.display = "none";
    } else {
        document.getElementById('contact-error').style.display = 'none';
    }
}