let saldo = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor');

elementoSaldo.textContent = saldo;

const elementoFormulario = document.querySelector('.block-nova-transacao form');

elementoFormulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); //não permite que a página seja recarregada quando o formulário é submetido

    if (!elementoFormulario.checkValidity()) {    //checkValidity(), verifica se o formulário é válido, nesse caso se todos os campos foram preenchidos;
        alert("Por favor preencha os campos da transação!");
        return
    }

    const inputTransacao = document.querySelector('.block-nova-transacao form #tipoTransacao');
    const inputValor = document.querySelector('.block-nova-transacao form #valor');
    const inputData = document.querySelector('.block-nova-transacao form #data');

    let tipoTransacao = inputTransacao.value;
    let valorTransacao = Number(inputValor.value);
    let dataTransacao = inputData.value;

    if(tipoTransacao === "Depósito"){
        saldo += valorTransacao;
    }else if(tipoTransacao === "Transferência" || "Pagamento de Boleto"){
        saldo-= valorTransacao;
    }else{
        alert("Tipo de transação inválido!");
        return
    }

    elementoSaldo.textContent=saldo;

    const novaTransacao = {
        tipo: tipoTransacao,
        valor: valorTransacao,
        data: dataTransacao,
    }



    elementoFormulario.reset();     //limpa o formulário permitindo uma nova resposta.
})


