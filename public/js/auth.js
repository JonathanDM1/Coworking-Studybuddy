;(function() { 
    'use strict';
	window.addEventListener('load', function() {
		checkAuth();
	})
})();	
//DEZE FILE TOEVOEGEN AAN ALLE PAGINA'S DIE EEN AUTH NODIG HEBBEN
function checkAuth(){
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') != null) {

        console.log("logged in");
    } else {
        window.location.replace('http://localhost:3000/loginregister');
    }
}

