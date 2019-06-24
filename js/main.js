
//definicao das variaveis globais
let numeroPaciente = [];
let xmlFile;
let id = 42;

let verEndereco;
let verPessoais;
let verVicios;
let verHistorico;
let verSintomas;
let verExames;

let numeroPacientes = [];
let municipios = [];
let idades = [];

let idsList = []; //para o menu lateral


//autocomplete list
let possibleValues = []


//track DOM events
$(document).ready(function () {
	//teste area
	newFiltrosSearch();
	//

	$("#welcome").text("Bem vindo, " + $.cookie("username"));
	preencheIdsRequest();
	$("#getPatientById").click(function(){
		id = $("#patientId").val();
		$("#titulo-paciente-modal").text("Paciente " + id);
		$("#modal-body").empty();
		verEndereco = $("#c-endereco").is(":checked");
		verPessoais = $("#c-pessoais").is(":checked");
		verVicios = $("#c-vicios").is(":checked");
		verHistorico = $("#c-historico").is(":checked");
		verSintomas = $("#c-sintomas").is(":checked");
		verExames = $("#c-exames").is(":checked");

		xmlRequest();
	});

	$("#pesquisaFiltros").click(function(){
		//Necessário para mostrar os dados
		verEndereco = $("#c-endereco").is(":checked");
		verPessoais = $("#c-pessoais").is(":checked");
		verVicios = $("#c-vicios").is(":checked");
		verHistorico = $("#c-historico").is(":checked");
		verSintomas = $("#c-sintomas").is(":checked");
		verExames = $("#c-exames").is(":checked");

		filtrosRequest();
	});

	//exibir um dos pacientes da lista dos filtros
	$('body').on('click', '#exibir-filtro', function() {
		console.log("id:" + $(this).siblings(".id").text());
		let filtro_id = parseInt($(this).siblings(".id").text());
		$("#filtros-modal-body").empty();
		closeFiltrosModal();
		id = filtro_id;
		xmlParser(xmlFile);
	});

	//exibe os dados do paciente a partir do menu lateral
	$("body").on("click", "#sideMenuId", function(){
		verEndereco = $("#c-endereco").is(":checked");
		verPessoais = $("#c-pessoais").is(":checked");
		verVicios = $("#c-vicios").is(":checked");
		verHistorico = $("#c-historico").is(":checked");
		verSintomas = $("#c-sintomas").is(":checked");
		verExames = $("#c-exames").is(":checked");
		console.log($(this).text());
		id = parseInt($(this).text());

		xmlParser(xmlFile);

	});
	
	//ver todos vai fazer uma especia de sobrecarga do metodo de mostrar pelo filtro aproveitando o fato de que quando todos os 
	//os filtros estao vazios, uma lista de todos os pacientes e exibida
	$("#ver-todos").click(function(){
		$(".tags").val("");
		$("#pesquisaFiltros").click();
		
	});

	//quando esse modal fecha tem que resetar o vetor global de ids
	$('#filtros-modal').on('hidden.bs.modal', function () {
		closeFiltrosModal();
		$("#filtros-modal-body").empty();
		numeroPacientes = []
		municipios = []
		idades = []
	});
	$('#patientModal').on('hidden.bs.modal', function () {
		closeModalPaciente()
		$("#modal-body").empty();
	});

	$("#btn-add-filtro").click(function(){
		newSearchFilter();		
	});

	//permite popovers
	$('[data-toggle="popover"]').popover({trigger: "hover"});

	
	//chama o plugin de autocomplete



});

function preencheIdsRequest(){
	$.ajax({
	    type: "GET",
	    url: "data/pacientes.xml",
	    dataType: "xml",
	    success: preencheIds
	});
}



// percorre inicialmente todos os dados para pegar os ids e os possiveis valores para os campos de busca 
function preencheIds(data){
	xmlFile = data;
	console.log(data);
	$(data).find("paciente").each(function(){
		var id = $($(this).children()[0]).text();
		for (var i = 0; i < $(this).children().length; i++) {
			node = $($(this).children()[i]);
			possibleValues.push(node.text());
		}
		idsList.push(id);
	});
	console.log(idsList);
	possibleValues = [... new Set(possibleValues)]
	console.log(possibleValues);

	//quando as redundancias forem resolvidas, adcionar os possveis valores ao input 
	$( ".tags" ).autocomplete({
		source: possibleValues
	});

	for (var i = 0; i < idsList.length; i++) {
		$("#mySidenav").append($(createLink(idsList[i])));
	}

}



function xmlRequest(){
	$.ajax({
	    type: "GET",
	    url: "data/pacientes.xml",
	    dataType: "xml",
	    success: xmlParser
	});
}

function filtrosRequest(){
	$.ajax({
	    type: "GET",
	    url: "data/pacientes.xml",
	    dataType: "xml",
	    success: parseXmlFiltros
	});
}

//acho que eu devia apagr essa funcao :)
function parseXmlFiltros(xml){
	xmlFile = xml;
	var endereco = "Rio de Janeiro";
	searchFiltros(xmlFile, endereco);
}

function searchFiltros(xml, endereco = '', filtro2 = '---', filtro3 = '---'){
	xmlFile = xml;
	var count = 0;
	var texto = [];
	var atributos = [];
	var aux = [];

	var length = $("#filtros").children(".tags").length;

	//acha o length real desconsiderando os campos vazios
	$($("#filtros").children(".tags")).each(function(){
		if($(this).val() == ""){
			length--;
		}
	})

	var c1 = 0;
	var c2 = 0;
	var c3 = 0;

	var c = 0;


	//tenho que tratar para o caso de entradas nulas
	/*endereco = $("#input-endereco").val();
	filtro2  = $("#input-filtro-2").val();
	filtro3  = $("#input-filtro-3").val();

	console.log(endereco, filtro2, filtro3);*/

	$(xml).find("paciente").each(function(){



		var id = $($(this).children()[0]).text();
		for (var i = 0; i < $(this).children().length; i++) {
		
			node = $($(this).children()[i]);
			texto.push(node.text());

			//ifs para checar se o paciente se encaixa nos filtros forncecidos
			/*if(node.text() == endereco || endereco == ''){
				c1 = 1;
			}
			if(node.text() == filtro2 || filtro2 == ''){
				c2 = 1;
			}
			if(node.text() == filtro3 || filtro3 == ''){
				c3 = 1;
			}*/
			if (node[0].nodeName == "municipioEndereco"){
				var municipio = node.text();
			}
			if (node[0].nodeName == "txt_anoNascimento"){
				if(node.text() != ""){
					var ano = parseInt(node.text());
					ano = 2019 - ano;
				}
				else{
					var ano = 0;
				}
			}
			atributos.push(node[0].nodeName);
			


			//estrutura que possibilita a busca em um numero infinito de filtros
			//fazer a parte dinamica da parada aqui ////////////////////////////////////////
			var filtros = $("#filtros").children(".tags");
			$(filtros).each(function(){
				if(node.text() == $(this).val().trim() && node.text() != "" && $(this).val() != "" ){
					c++;
				}
			})
			//fazer a parte dinamica da parada aqui ////////////////////////////////////////
		}

		console.log("c: " + c + ", length: " + length);
		if(c >= length){
			aux.push(id);
			municipios.push(municipio);
			numeroPacientes.push(id);
			idades.push(ano);
		}c=0;


		count = c1 + c2 + c3;


		//esse if que CONTROLAVA as condicoes de apresentacao na busca por filtros
		/*if(count == 3){
			municipios.push(municipio);
			numeroPacientes.push(id);
			idades.push(ano);

		}*/
		c1 = 0;
		c2 = 0;
		c3 = 0;
	});




	//o que vai acontecer aqui sera mostrar uma lista com o numero dos pacientes que se encaixam
	//na busca desejada para que o user possa selecionar aqueles que ele queira

	//abrir o modal com os pacientes que se enquadram na pesquisa
	console.log(aux);
	console.log(numeroPacientes);
	console.log("Foram encontrados: " + numeroPacientes.length + "pacientes. ");
	$("#pacientes-encontrados-titulo").text("Foram encontrados " + numeroPacientes.length + " pacientes");
	for (let index = 0; index < numeroPacientes.length; index++) {
		let element = createCardElement(numeroPacientes[index], idades[index], municipios[index]);
		$("#filtros-modal-body").append(element);
		$("#filtros-modal-body").append($("<br>"));

	}
	openFiltrosModal();

	//id = parseInt(numeroPacientes[0]);
	//console.log(id);
	//xmlParser(xml);


}

function newFiltrosSearch(){
	var filtros = $("#filtros").children(".tags");
	$(filtros).each(function(){
		console.log($(this));
	})

}




function xmlParser(xml) { //apresenta o paciente do id selecionado => pode ser reaproveitada
	console.log("Vou buscar pelo id:" + id);
	xmlFile = xml;
	var found = false;

	if(id == "42"){
		alert("Paciente 42 pelo id");
		
		$(".tags").val("");
		$("#input-endereco").val("42");
		$("#input-filtro-2").val("270");
		filtrosRequest();
		found = true;
		//$(".tags").val("");
		return;
		 
	}

	$(xml).find("paciente").each(function () {
	    np = parseInt($(this).find("numeroPaciente").text());
			//acha pacientes apenas pelo id
			if (np == id) { //aparentemente dois pacientes podem ter o mesmo numero :(
				found = true;
	    	//utilizando isso aqui eu posso fazer um loop por cada tag do xml
	    	var texto = [];
	    	var atributos = [];
	    	for (var i = 0; i < $(this).children().length; i++) {
	    		node = $($(this).children()[i]);
	    		texto.push(node.text());
	    		atributos.push(node[0].nodeName);

				}
				console.log("atributos" + atributos[0] + texto[0]);
	    	var p = new Patient(np, $(this), atributos, texto);

	    	let endereco = p.setEnredeco();
	    	endereco = $(endereco);
	    	let pessoais = $(p.setInfoPessoais());
	    	let vicios = $(p.setVicios());
	    	let historico = $(p.setHistoricoTuberculose());
	    	let sitomas = $(p.setSintomas());
	    	console.log(p.setSintomas());
	    	let exames = $(p.setExames());

	    	if (verEndereco)
	    		$("#modal-body").append(endereco);
	    	if (verPessoais)
	    		$("#modal-body").append(pessoais);
	    	if (verVicios)
	    		$("#modal-body").append(vicios);
	    	if (verHistorico)
	    		$("#modal-body").append(historico);
				if (verSintomas)
	    		$("#modal-body").append(sitomas);
	    	if(verExames)
	    		$("#modal-body").append(exames);
	    	id = null;
	    	openModalPaciente();
			}
	 });
	 if(!found){
		 alert("Paciente não encontrado. ");
	 }
}



///////////////////////////////////////// manipulacao do DOM ////////////////////////////////////////////////////////////////////////////////////////////////////////// 
function createCardElement(id, idade = 0, municipio = null){
	if (idade == 0) {
		idade = "não informada";
	}
	var card = $(" \
	<div class='card'style='width: 18rem; margin: 0 auto;'> \
		<ul class='list-group list-group-flush'>\
			<li class='id list-group-item'>"+id+"</li>\
			<li class='list-group-item'>"+ municipio +"</li>\
			<li class='list-group-item'>Idade: "+ idade +"</li>\
			<button id='exibir-filtro' type='button' class='btn btn-secondary'>exibir</button>\
		</ul>\
	</div>\
	")

	return card

}
function createLink(id){
	var a = "<a id='sideMenuId' href = '#'>"+id+"</a>";
	return a;
}
function openModalPaciente(){
	$("#patientModal").modal("show");
}
function closeModalPaciente(){
	$("#patientModal").modal("hide");
}

function openFiltrosModal(){
	$("#filtros-modal").modal("show");
}
function closeFiltrosModal(){
	$("#filtros-modal").modal("hide");
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function createLiElement(atributo, val){
	return "<li class='list-group-item'>"+atributo+": "+val+"</li>"
}
function createLiSintomas(atributo, val){
	return "<li class='list-group-item'>"+val+"</li>"
}
function newSearchFilter(){
	var filtro = "<div class='input-group-prepend'> \
									<span class='input-group-text' id='inputGroup-sizing-sm'></span> \
								</div> \
								<input style = 'width: 33.33%' data-toggle = 'popover', data-content = 'Se quiser um paciente do Rio de Janeiro, digite: Rio de Janeiro. ' id='input-endereco' type='text' class='form-control tags' aria-label='Small' aria-describedby='inputGroup-sizing-sm'> \
								"
	filtro = $(filtro);
	$("#filtros").append(filtro);

	$( ".tags" ).autocomplete({
		source: possibleValues
	});

	$('[data-toggle="popover"]').popover({trigger: "hover"});



	}





//////////////////// builds a patient and shows data  /////////////////////////////////////////////////////////
class Patient{
	constructor(id, paciente, atributos, valores){
		this.id = id;
		this.paciente = paciente;
		this.atributos = atributos;
		this.valores = valores;
		console.log(this.atributos);
	}
	setEnredeco(){
		this.logradouro = this.paciente.find("logradouro").text();
		this.numero = this.paciente.find("numero").text();
		this.estado = this.paciente.find("estadoEndereco").text();
		this.complemento = this.paciente.find("complemento").text();
		this.municipio =this.paciente.find("municipioEndereco").text();
		this.bairro = this.paciente.find("bairroEndereco").text();
		this.cep = this.paciente.find("cep").text();
		this.cidadeNaturalidade = this.paciente.find("cidadeNaturalidade").text();

		var element = "<div class='card' style='width: 18rem; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Endereço\
						  </div>\
						  <ul class='list-group list-group-flush'>\
						    <li class='list-group-item'>Rua: "+this.logradouro +"</li>\
						    <li class='list-group-item'>Número: "+this.numero+"</li>\
						    <li class='list-group-item'>Estado: "+this.estado+"</li>\
						    <li class='list-group-item'>Complemento: "+this.complemento+"</li>\
						    <li class='list-group-item'>Municipio: "+this.municipio+"</li>\
						    <li class='list-group-item'>Bairro: "+this.bairro+"</li>\
						    <li class='list-group-item'>Cep: "+this.cep+"</li>\
						    <li class='list-group-item'>Natural de: "+this.cidadeNaturalidade+"</li>\
						  </ul>\
						</div>"
		return element
	}
	setInfoPessoais(){
		this.telefone1 = this.paciente.find("telefone1").text();
		this.diaNascimento = this.paciente.find("txt_diaNascimento").text();
		this.mesNascimento = this.paciente.find("txt_mesNascimento").text();
		this.anoNascimento = this.paciente.find("txt_anoNascimento").text();
		this.sexo = this.paciente.find("sexo").text();
		this.estadoCivil = this.paciente.find("estadoCivil").text();
		this.estuda = this.paciente.find("estudaMomento").text();
		this.ocupacao = this.paciente.find("ocupacao").text();
		this.atividadeTrabalho = this.paciente.find("atividadeTrabalho").text()
		this.rendaFamiliarAtual = this.paciente.find("rendaFamiliarAtual").text();
		this.moradorRua = this.paciente.find("moradorRua").text();
		this.moradorAsilo = this.paciente.find("moradorAsilo").text();
		this.exDetento = this.paciente.find("exDetento").text();

		var element = "<div class='card' style='width: 18rem; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Informações pessoais\
						  </div>\
						  <ul class='list-group list-group-flush'>\
						    <li class='list-group-item'>Telefone: "+this.telefone1 +"</li>\
						    <li class='list-group-item'>Nascimento:"+this.diaNascimento+"/"+this.mesNascimento+"/"+this.anoNascimento+"</li>\
						    <li class='list-group-item'>Sexo: "+this.sexo+"</li>\
						    <li class='list-group-item'>Estado Civil: "+this.estadoCivil+"</li>\
						    <li class='list-group-item'>Estudante: "+this.estuda+"</li>\
						    <li class='list-group-item'>Ocupação: "+this.ocupacao+"</li>\
						    <li class='list-group-item'>Renda Familiar: "+this.rendaFamiliarAtual+"</li>\
						  	<li class='list-group-item'>Morados de rua: "+this.moradorRua+"</li>\
						  	<li class='list-group-item'>Morador de Asilo: "+this.moradorAsilo+"</li>\
						 	<li class='list-group-item'>Ex detento: "+this.exDetento+"</li>\
						  </ul>\
						</div>"
		return element
	}
	setVicios(){
		this.habitoFumar = this.paciente.find("habitoFumar").text();
		this.inalaFumaca = this.paciente.find("inalaFumaca").text();
		this.habitoFumar = this.paciente.find("habitoFumar").text();
		this.cigarrosDia = this.paciente.find("cigarrosDia").text();
		this.anosFuma = this.paciente.find("anosFuma").text();
		this.cargaTabagica = this.paciente.find("cargaTabagica").text();
		this.tempoParou = [this.paciente.find("tempoParouDias").text(),this.paciente.find("tempoParouMeses").text(), this.paciente.find("tempoParouAnos").text()];
		for (var i = 0; i < this.tempoParou.length; i++) {
			//console.log(this.tempoParou[i]);
			if (this.tempoParou[i] == '') {
				this.tempoParou[i] = "0";
			}
		}

		this.usuarioDrogas = this.paciente.find("usuarioDrogas").text();
		this.bebidaPreferida = this.paciente.find("bebidaPreferida").text();
		this.bebe = this.paciente.find("tomaBebida").text();
		this.recebeuCritica = this.paciente.find("recebeuCritica").text();
		this.deveriaDiminuir = this.paciente.find("deveriaDiminuir").text();
		this.bebeManha = this.paciente.find("bebeManha").text();
		this.senteCulpa = this.paciente.find("senteCulpa").text();

		if(this.habitoFumar == "Jamais Fumante" || this.habitoFumar == ""){
			var element = "<div class='card' style='width: 100%; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Vícios\
						  </div>\
						  <ul style='float: left; display:table' class='list-group list-group-flush'>\
						    <li class='list-group-item'>Fumante: "+this.habitoFumar +"</li>\
						    <li class='list-group-item'>Usa drogas: "+this.usuarioDrogas+"</li>\
						    <li class='list-group-item'>Bebe: "+this.bebe+"</li>\
						    <li class='list-group-item'>Bebebida preferida: "+this.bebidaPreferida+"</li>\
						  </ul> \
						  <ul style='float: left; display:table' class='list-group list-group-flush'>\
						    <li class='list-group-item'>Recebeu Crítica por beber: "+this.recebeuCritica+"</li>\
						    <li class='list-group-item'>Deveria beber menos: "+this.deveriaDiminuir+"</li>\
						    <li class='list-group-item'>Bebe pela manhã: "+this.bebeManha+"</li>\
						  	<li class='list-group-item'>Sente Culpa ao beber: "+this.senteCulpa+"</li>\
						  </ul>\
						</div>"
		}else{
			var element = "<div class='card' style='width: 100%; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Vícios\
						  </div>\
						  <ul style='float: left; display:table' class='list-group list-group-flush'>\
						    <li class='list-group-item'>Fumante: "+this.habitoFumar +"</li>\
						    <li class='list-group-item'>Cigarros por dia: "+this.cigarrosDia +"</li>\
						    <li class='list-group-item'>Inala fumaça: "+this.inalaFumaca +"</li>\
						    <li class='list-group-item'>Carga Tabágica: "+this.cargaTabagica +"</li>\
						    <li class='list-group-item'>Carga Tempo sem fumar: "+this.tempoParou[0] + " dias, "+this.tempoParou[1]+" meses e "+ this.tempoParou[2] +" anos</li>\
						    <li class='list-group-item'>Usa drogas:"+this.usuarioDrogas+"</li>\
						</ul> \
						<ul style='float:left' class='list-group list-group-flush'>\
						    <li class='list-group-item'>Bebe:"+this.bebe+"</li>\
						    <li class='list-group-item'>Bebebida preferida: "+this.bebidaPreferida+"</li>\
						    <li class='list-group-item'>Recebeu Crítica por beber: "+this.recebeuCritica+"</li>\
						    <li class='list-group-item'>Deveria beber menos: "+this.deveriaDiminuir+"</li>\
						    <li class='list-group-item'>Bebe pela manhã: "+this.bebeManha+"</li>\
						  	<li class='list-group-item'>Sente Culpa ao beber: "+this.senteCulpa+"</li>\
						  </ul>\
						</div>"

		}
		return element;
		}

		setHistoricoTuberculose(){
			this.morouTuberculose = this.paciente.find("morouTuberculose").text();
			this.familiaTuberculose = this.paciente.find("familiaTuberculose").text();
			this.trabalhoTuberculose = this.paciente.find("trabalhoTuberculose").text();
			//
			this.quantoTempoContato = this.paciente.find("quantoTempoContato").text();
			this.horasSemanaisContato = this.paciente.find("horasSemanaisContato").text();
			//
			this.teveTuberculose = this.paciente.find("teveTuberculose").text();
			this.quantosAnos = this.paciente.find("quantosAnos").text();
			this.tratamento = this.paciente.find("tratamento").text();
			this.outroTratamento = this.paciente.find("outroTratamento").text();
			this.desfecho = this.paciente.find("desfecho").text();
			this.riscoTbMdr = this.paciente.find("riscoTbMdr").text();
			this.cicatrizBcg = this.paciente.find("cicatrizBcg").text();
			this.internadoUltimosAnos = this.paciente.find("internadoUltimosAnos").text();
			this.comorbidades = this.paciente.find("comorbidades").text();
			this.quaisComorbidadesOutras = this.paciente.find("quaisComorbidadesOutras").text();


			var element = "<div class='card'  style='width: 100%; display:inline-block; float:left' display:inline-block; float:left'> \
							  <div style='background-color:lightblue;' class='card-header'>\
							    Histórico\
							  </div>\
							  <ul style='float: left; display:table' class='list-group list-group-flush'>\
							    <li class='list-group-item'>Morou em local com surto: "+this.morouTuberculose +"</li>\
							    <li class='list-group-item'>Casos na família:"+this.familiaTuberculose+"</li>\
							    <li class='list-group-item'>Sexo: "+this.sexo+"</li>\
							    <li class='list-group-item'>Contato no trabalho com tuberculose: "+this.trabalhoTuberculose+"</li>";

			// trabalhou com tuberculose ?
			if (this.trabalhoTuberculose == "Sim" || this.trabalhoTuberculose == "sim") {
				var contato = "<li class='list-group-item'>Tempo de contao: "+this.quantoTempoContato+" </li> \
				<li class='list-group-item'>Horas de contato semanais: "+this.horasSemanaisContato+"</li>";
				element = element + contato;
			}
			// teve tuberculose?
			element = element +  ("<li class='list-group-item'>Teve tuberculose: "+this.teveTuberculose+"</li>");
			if (this.teveTuberculose == "sim" || this.teveTuberculose == "Sim"){
				var aux = "<li class='list-group-item'>Idade que adquiriu: "+this.quantosAnos+" </li> \
				<li class='list-group-item'>Tratamento: "+this.tratamento+" </li> \
				<li class='list-group-item'>Outro Tratamento:"+this.outroTratamento+" </li> \
				<li class='list-group-item'>Desfecho:"+this.desfecho+" </li>";
				element = element +  aux;
			}
			var element2 = "\
							</ul>\
							<ul style='float: left; display:table'>\
							    <li class='list-group-item'>Risco TbMdr: "+this.riscoTbMdr+"</li>\
							    <li class='list-group-item'>Cicatriz Bcg presente: "+this.cicatrizBcg+"</li>\
							    <li class='list-group-item'>Renda Familiar: "+this.rendaFamiliarAtual+"</li>\
							  	<li class='list-group-item'>Internado nos Ultimos anos: "+this.internadoUltimosAnos+"</li>\
							  	<li class='list-group-item'>Comorbidades: "+this.comorbidades+"</li>\
							 	<li class='list-group-item'>Outras Comorbidades: "+this.quaisComorbidadesOutras+"</li>\
							  </ul>\
							</div>"
			element = element + element2;
			return element;
		}
		setSintomas(){
			var element = "";
			for (var i = 0; i < this.atributos.length; i++) {
				if (this.atributos[i] == "selecionouSinaisSintomas" && this.valores[i] == "sim") {
					i+=3;
					while(this.atributos[i] != "selecionouExameFisico"){
						//console.log(this.atributos[i]+": "+this.valores[i]);
						element += createLiSintomas(this.atributos[i], this.valores[i]);
						i++;
					}
					var listaSintomas = "<div class='card' style='width: 18rem; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Sintomas\
						  </div>\
						  <ul class='list-group list-group-flush'>\
						  "+element+"\
						  </ul>\
						</div>";
					return listaSintomas;
				}
			}
		/*
		this.sinaisSintomas = this.paciente.find("sinaisSintomas").text();
		this.febre = this.paciente.find("febre").text();
		this.sudorese = this.paciente.find("sudorese").text();
		this.hiporexia = this.paciente.find("hiporexia").text();
		this.emagrecimento =this.paciente.find("emagrecimento").text();
		this.cansaco = this.paciente.find("cansaco").text();
		this.faltaAr = this.paciente.find("faltaAr").text();

		this.outrosSintomas = this.paciente.find("outrosSintomas").text();
		this.exameFisico = this.paciente.find("exameFisico").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();
		this.faltaAr = this.paciente.find("faltaAr").text();

		var element = "<div class='card' style='width: 18rem; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Endereço\
						  </div>\
						  <ul class='list-group list-group-flush'>\
						    <li class='list-group-item'>Rua: "+this.logradouro +"</li>\
						    <li class='list-group-item'>Número: "+this.numero+"</li>\
						    <li class='list-group-item'>Estado: "+this.estado+"</li>\
						    <li class='list-group-item'>Complemento: "+this.complemento+"</li>\
						    <li class='list-group-item'>Municipio: "+this.municipio+"</li>\
						    <li class='list-group-item'>Bairro: "+this.bairro+"</li>\
						    <li class='list-group-item'>Cep: "+this.cep+"</li>\
						    <li class='list-group-item'>Natural de: "+this.cidadeNaturalidade+"</li>\
						  </ul>\
						</div>"
		return element */
	}
	setExames(){
			var element = "";
			var control = false;

			var middle = this.atributos.length;
			var middleCount = 0;
			var halfControl = true;

			for (var i = 0; i < this.atributos.length; i++) {
				if (this.atributos[i] == "outrosSintomas") {
					control = true;
					i+=1;
					middle = (middle - i)/2;

				}
				if (control) {
					if(!(this.atributos[i].includes("selecionou"))){
						//console.log(this.atributos[i]);
						//lidando com datas
						if (this.atributos[i].includes("txt_")) {
							var dia = this.valores[i];
							i++;
							var mes = this.valores[i];
							i++;
							var ano = this.valores[i];
							var data = dia + "/" + mes + "/" + ano
							if (data ='//') {
								data = "Não informado ";
							}
							element += createLiElement("Data", data);
							i++;
							continue;
						}

						//nenhum dado tem informacao de antigenos preenchida
						if (this.atributos[i] == "antigenos") {
							continue;
						}
						//console.log(this.atributos[i]+": "+this.valores[i]);
						element += createLiElement(this.atributos[i], this.valores[i]);
					}
					if (middleCount >= middle && halfControl) {
						element += "</ul>  <ul class='list-group list-group-flush'>";
						halfControl = false;
					}
					middleCount+=1;


				}
			}

			return "<div class='card' style='width: 100%v; display:inline-block; float:left'> \
						  <div style='background-color:lightblue;' class='card-header'>\
						    Exames\
						  </div>\
						  <ul class='list-group list-group-flush'>\
						  "+element+"\
						  </ul>\
						</div>";
	}




	}

