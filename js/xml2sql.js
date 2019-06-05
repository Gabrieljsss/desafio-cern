$.ajax({
    type: "GET",
    url: "data/pacientes.xml",
    dataType: "xml",
    success: xml2Sql
});

function xml2Sql(){
    let counter;
    let ids;
    
}
