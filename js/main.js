$(document).ready(function () {
	$.ajax({
	    type: "GET",
	    url: "data/pacientes.xml",
	    dataType: "xml",
	    success: xmlParser
	});
});

function xmlParser(xml) {
	console.log("xml");
	$(xml).find("paciente").each(function () {
	    np = parseInt($(this).find("numeroPaciente").text());

	    if (np == null) {
	    	np = "Paciente sem número";
	    }
	    console.log(np);
 	});
}