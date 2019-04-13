$(document).ready(function () {

	$("#login-form").on("submit",function(event){
		event.preventDefault();
		var email = $("#emailLogin").val();
		var password = $("#passwordLogin").val();
		console.log(email, password);


		if (email == "admin" && password == "admin") {	
			$.cookie('username', email, { expires: 7, path: '/' });
			window.location.href = "http://localhost:8080/main.html";
			
		}
	})

	
});