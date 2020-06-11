;(function() { 
    'use strict';
	window.addEventListener('load', function() {
		document.getElementById('loginForm').setAttribute('novalidate', 'novalidate');
        document.getElementById('loginForm').addEventListener('submit', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkLoginForm();
        });
        
        document.getElementById('registerForm').setAttribute('novalidate', 'novalidate');
		document.getElementById('registerForm').addEventListener('submit', function(e){
            e.preventDefault();
			e.stopPropagation();
            checkRegisterForm();
        });
	})
})();	

function checkLoginForm(){
    let data = getLoginFormData();
    sendFormToAPI('/login', data);
}

function getLoginFormData(){
    let data = {
        username: document.getElementById("loginUName").value,
        password: document.getElementById("loginPassword").value
    };
    return data;
}

function checkRegisterForm(){
    let data = getRegisterData();
    if(checkEmail(data.email) && checkPassword(data.password1, data.password2)){
        sendFormToAPI('/register', data);
    } else {
        //ERROR HANDLER
    }
}

function getRegisterData(){
    let data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password1: document.getElementById("password1").value,
        password2: document.getElementById("password2").value,
        school: document.getElementById("school_name").value
    };
    return data;
}

function checkPassword(pw1, pw2){
    if(pw1 == pw2){
        return true;
    } else {
        return false;
    }
}

function checkEmail(email){
    if(/\S+@\S+\.\S+/.test(email) == true){
        return true;
    } else {
        return false;
    }
}
//Proberen in apparte file te steken met een collectie aan fetch functies. Zo zijn ze makkelijk herbruikbaar         
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

function checkResponse(response){
    if(response.status == "OK"){
        console.log("JEEEJ");
    } else {
        //HANDLE ERROR HERE
        console.log("ERROR");
    }
}

