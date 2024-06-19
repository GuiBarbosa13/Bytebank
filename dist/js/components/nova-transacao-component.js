import { TipoTransacao } from "../types/TipoTransacao.js";
import { getSaldo, atualizarSaldo } from "./saldo-component.js";
let saldo = getSaldo();
const elementoFormulario = document.querySelector('.block-nova-transacao form'); //estou garantindo que o elementoFormulario é um elemento HTML para o TS.
elementoFormulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); //não permite que a página seja recarregada quando o formulário é submetido
    if (!elementoFormulario.checkValidity()) { //checkValidity(), verifica se o formulário é válido, nesse caso se todos os campos foram preenchidos;
        alert("Por favor preencha os campos da transação!");
        return;
    }
    const inputTransacao = document.querySelector('.block-nova-transacao form #tipoTransacao');
    const inputValor = document.querySelector('.block-nova-transacao form #valor');
    const inputData = document.querySelector('.block-nova-transacao form #data');
    let tipoTransacao = inputTransacao.value;
    let valorTransacao = Number(inputValor.value);
    let dataTransacao = new Date(inputData.value);
    if (tipoTransacao === TipoTransacao.DEPOSITO) {
        saldo += valorTransacao;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valorTransacao;
    }
    else {
        alert("Tipo de transação inválido!");
        return;
    }
    atualizarSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valorTransacao,
        data: dataTransacao,
    };
    elementoFormulario.reset(); //limpa o formulário permitindo uma nova resposta.
});
