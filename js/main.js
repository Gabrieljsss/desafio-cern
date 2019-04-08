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

function xmlParser(xml) {
	console.log("xml");
	xmlFile = xml;
	console.log(xmlFile);
	/*$(xml).find("paciente").each(function () {
	    np = parseInt($(this).find("numeroPaciente").text());

	    if (np == null) {
	    	np = "Paciente sem número";
	    }
	    console.log(np);
 	});*/
}

function buildPatient(id){

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
