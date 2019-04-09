let numeroPaciente = []
let xmlFile


$(document).ready(function () {
	$.ajax({
	    type: "GET",
	    url: "data/pacientes.xml",
	    dataType: "xml",
	    success: xmlParser
	});
});


let id = 42
function xmlParser(xml) {
	console.log("xml");
	xmlFile = xml;
	console.log(xmlFile);
	$(xml).find("paciente").each(function () {
	    np = parseInt($(this).find("numeroPaciente").text());
	    if (np == id) { //aparentemente dois pacientes podem ter o mesmo numero :(
	    	
	    	var p = new Patient(np, $(this));
	    	endereco = p.setEnredeco();
	    	endereco = $(endereco);
	    	openModalPaciente();
	    	$("#modal-body").append(endereco);
	    	$("#modal-body").append(endereco);
	    	$("#modal-body").append($("<p style='float:left; display:table'>Teste</p>"));
	    	$("#modal-body").append($("<p>Teste</p>"));
	    	$("#modal-body").append($("<h1>Teste</h1>"));
	    	$("#modal-body").append($("<h1>Teste</h1>"));
	    	$("#modal-body").append($("<h1>Teste</h1>"));
	    	$("#modal-body").append($("<h1>Teste</h1>"));
	    	id = null;
	    }


 	});
}

function buildPatient(id){

}

function openModalPaciente(){
	$("#patientModal").modal("show");
}

class Patient{
	constructor(id, paciente){
		this.id = id
		this.paciente = paciente
	}
	setEnredeco(){
		this.logradouro = this.paciente.find("logradouro").text();
		this.numero = this.paciente.find("numero").text();
		this.estado = this.paciente.find("estadoEndereco").text();
		this.complemento = this.paciente.find("complemento").text();
		this.municipio =this.paciente.find("municipioEndereco").text();
		this.bairro = this.paciente.find("bairroEndereco").text();
		this.cep = this.paciente.find("cep").text();

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
						  </ul>\
						</div>"
		return element
	}
	setInfoPessoais(){
		this.telefone1 = this.
	}

}

/*class PatientUtil {
    constructor(id, logradouro,numero,complemento, estadoEndereco,
    			municipio, bairro, cep, telefone1, telefone2, diaNascimento,
    			mesNascimento, anoNascimento, sexo, estadoCivil, estuda, escolaridade,
    			ocupacao, outraFuncao, profissionalSaude, atividadeTrabalho, 
    			rendaAtual, rendaPassado, grauInstrucaoaChefe, haveAspirador, 
    			haveAutomovel, haveBanheiro, haveEmpregada, haveFreezer,
    			haveGeladeiraDuple, haveGeladeiraSimples, haveMaquinaLavar, haveRadio, 
    			haveTelevisao, haveDvd, naturalidadeEstado, cidadeNaturalidade, tempoEnderecoAtual,
    			morouOutro, numeroPessoas, numeroComodos, numeroDormitorios, moradorRua, moradorAsilo, 
    			exDetento, habitoFumar, inalaFumaca, cigarrosDia, anaosFuma, cargaTabagica, tempoParou, 
    			usuarioDrogas, bebidaPreferida, tomaBebida, facilidadeAmizades, deveriaDiminuir, recebeuCritica,
    			bebeManha, senteCulpa, morouTuberculose, familiaTuberculose, trabalhoTuberculose, tempoContato, 
    			teveTuberculose, quantosAnos, tratamento, outroTratamento, desfecho, riscoTbMdr, cicatrizBcg, 
    			internadoUltimosAnos, Comorbidades, sintomas, exameFisico, alteracaoExameFisico,
    			resultadoAntiHiv, probabilidadeSemAvaliacao, observacoes, teleradiografia, diaTele,
    			areaAcometida, volumeDerramePleural, derramePleuralLivre, alteracoesPulmonares, 
    			qualAssociacao, qualAlteracao, provaTuberculinicaReatora, dataProva, dataLeitura, 
    			milimetrosEnduracao, leitor, resultadoCiometria, resultadoProteinas, resultadoRazaoProteina,
    			resultadoRazaoLdh, baarLp, barrEscarro1, intensidade1, barrEscarro2, intensidade2, 
    			barrEscarroInduzido, intensidadeInduzido, adaLiquidoPleural, quantidade,
    			probabilidadeComAvaliacao, culturaMicro, metodo, resultado, tipificacao, resultadoExameHistopatologico, 
    			culturaMicrobacterias, metodoCultura, resultadoCultura, tipificacaoCultura, sorologiaLp, 
    			antigenos, resultadoSorologia, pcr, tecnica, resultadoPcr, outroExame, exame, resultadoOutro, 
    			probabilidadeAposExame, dataFinal, obsFinal
    			) {
      
    }
}*/
