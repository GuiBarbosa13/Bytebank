const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement; //estou garantindo que o elementoFormulario é um elemento HTML para o TS.

elementoFormulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); //não permite que a página seja recarregada quando o formulário é submetido

    if (!elementoFormulario.checkValidity()) {    //checkValidity(), verifica se o formulário é válido, nesse caso se todos os campos foram preenchidos;
        alert("Por favor preencha os campos da transação!");
        return
    }

    const inputTransacao = document.querySelector('.block-nova-transacao form #tipoTransacao') as HTMLSelectElement;
    const inputValor = document.querySelector('.block-nova-transacao form #valor') as HTMLInputElement;
    const inputData = document.querySelector('.block-nova-transacao form #data') as HTMLInputElement;

    let tipoTransacao : TipoTransacao = inputTransacao.value as TipoTransacao;
    let valorTransacao : number = Number(inputValor.value);
    let dataTransacao : Date = new Date (inputData.value);

    if(tipoTransacao === TipoTransacao.DEPOSITO){
        saldo += valorTransacao;
    }else if(tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO){
        saldo-= valorTransacao;
    }else{
        alert("Tipo de transação inválido!");
        return
    }

    elementoSaldo.textContent=formatarMoeda(saldo);


    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valorTransacao,
        data: dataTransacao,
    }

    elementoFormulario.reset();     //limpa o formulário permitindo uma nova resposta.
})