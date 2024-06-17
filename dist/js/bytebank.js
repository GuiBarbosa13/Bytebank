var saldo = 3000;
var elementoSaldo = document.querySelector('.saldo-valor .valor');
if (elementoSaldo) { //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
    elementoSaldo.textContent = saldo.toString();
}
var elementoFormulario = document.querySelector('.block-nova-transacao form'); //estou garantindo que o elementoFormulario é um elemento HTML para o TS.
elementoFormulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); //não permite que a página seja recarregada quando o formulário é submetido
    if (!elementoFormulario.checkValidity()) { //checkValidity(), verifica se o formulário é válido, nesse caso se todos os campos foram preenchidos;
        alert("Por favor preencha os campos da transação!");
        return;
    }
    var inputTransacao = document.querySelector('.block-nova-transacao form #tipoTransacao');
    var inputValor = document.querySelector('.block-nova-transacao form #valor');
    var inputData = document.querySelector('.block-nova-transacao form #data');
    var tipoTransacao = inputTransacao.value;
    var valorTransacao = Number(inputValor.value);
    var dataTransacao = new Date(inputData.value);
    if (tipoTransacao === "Depósito") {
        saldo += valorTransacao;
    }
    else if (tipoTransacao === "Transferência" || "Pagamento de Boleto") {
        saldo -= valorTransacao;
    }
    else {
        alert("Tipo de transação inválido!");
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    var novaTransacao = {
        tipo: tipoTransacao,
        valor: valorTransacao,
        data: dataTransacao,
    };
    elementoFormulario.reset(); //limpa o formulário permitindo uma nova resposta.
});