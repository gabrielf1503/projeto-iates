function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}


function exibirRetornoListaDeMensagens() {



    const resultadoListaObjetos = obterMensagens();



    const elementoResultadoListaObjetos = document.getElementById('resultadoListaObjetos');



    elementoResultadoListaObjetos.innerHTML = '';



    const tabela = document.createElement('table');

    const thead = document.createElement('thead');

    const tbody = document.createElement('tbody');



    const cabecalho = thead.insertRow();

    for (const chave in resultadoListaObjetos[0]) {

        const colunaCabecalho = document.createElement('th');

        colunaCabecalho.textContent = chave;

        cabecalho.appendChild(colunaCabecalho);

    }



    tabela.appendChild(thead);



    resultadoListaObjetos.forEach((objeto) => {

        const linha = tbody.insertRow();



        for (const chave in objeto) {

            const coluna = linha.insertCell();

            coluna.textContent = objeto[chave];

        }

    });



    tabela.appendChild(tbody);

    elementoResultadoListaObjetos.appendChild(tabela);

}
document.addEventListener("DOMContentLoaded", exibirRetornoListaDeMensagens);

function inserirMensagem(mensagem) {

    
    var mensagem = {
            nome: document.getElementById('nome').value, 
            email: document.getElementById('email').value, 
            mensagem: document.getElementById('mensagem').value} 

    

    var inserir = $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    

    var objLoginSenha = {
            email: document.getElementById('login').value, 
            senha: document.getElementById('senha').value} 

    

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
        if(retorno == true){
            location.href = "mensagens.html"
        }else{alert("Senha Incorreta, tente novamente!")}
    });

    return retorno;
}