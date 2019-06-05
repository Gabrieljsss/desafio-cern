var username;
var password;
$(document).ready(function () {

	$("#login-form").on("submit",function(event){
		event.preventDefault();
		username = $("#emailLogin").val();
		password = $("#passwordLogin").val();
		xmlRequest();
	})

	
});

function xmlRequest(){
	$.ajax({
	    type: "GET",
	    url: "data/users.xml",
	    dataType: "xml",
	    success: login
	});
}

function login(xml){
	    	$(xml).find("user").each(function () {
	    		console.log($(this));
	    		var user = $(this).find("username").text();
	    		var passwd =  $(this).find("password").text();
	    		console.log(user, username);
	    		if (user == username && passwd == password) {
	    			$.cookie('username', username, { expires: 7, path: '/' });
					window.location.href = "http://localhost/desafio-cern/main.html";
	    		}
	    	});
	    }