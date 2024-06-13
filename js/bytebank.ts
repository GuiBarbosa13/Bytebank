let saldo = 3000;

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;

if(elementoSaldo){  //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
    elementoSaldo.textContent = saldo.toString();
}


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

    let tipoTransacao : string = inputTransacao.value;
    let valorTransacao : number = Number(inputValor.value);
    let dataTransacao : Date = new Date (inputData.value);

    if(tipoTransacao === "Depósito"){
        saldo += valorTransacao;
    }else if(tipoTransacao === "Transferência" || "Pagamento de Boleto"){
        saldo-= valorTransacao;
    }else{
        alert("Tipo de transação inválido!");
        return
    }

    elementoSaldo.textContent=saldo.toString();

    const novaTransacao = {
        tipo: tipoTransacao,
        valor: valorTransacao,
        data: dataTransacao,
    }



    elementoFormulario.reset();     //limpa o formulário permitindo uma nova resposta.
})

//Após escrever o TS eu preciso transformá-lo em JS.
//sempre que precisar recompilar o código eu preciso digitar "tsc bytebank.ts" na pasta js no terminal
//para abrir a pasta js: cd js


