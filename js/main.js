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
	    	let endereco = p.setEnredeco();
	    	endereco = $(endereco);
	    	let pessoais = $(p.setInfoPessoais());
	    	let vicios = $(p.setVicios());

	    	
	    	$("#modal-body").append(endereco);
	    	$("#modal-body").append(pessoais);
	    	$("#modal-body").append(vicios);
	    	id = null;
	    	openModalPaciente();
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
			console.log(this.tempoParou[i]);
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
			/*
			this.inalaFumaca = this.paciente.find("inalaFumaca").text();
		this.habitoFumar = this.paciente.find("habitoFumar").text();
		this.cigarrosDia = this.paciente.find("cigarrosDia").text();
		this.anosFuma = this.paciente.find("anosFuma").text();
		this.cargaTabagica = this.paciente.find("cargaTabagica").text();
		this.tempoParou = [this.paciente.find("tempoParouDias"),this.paciente.find("tempoParo
		*/
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
