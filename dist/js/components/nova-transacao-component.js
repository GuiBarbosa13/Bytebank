import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector('.block-nova-transacao form'); //estou garantindo que o elementoFormulario é um elemento HTML para o TS.
elementoFormulario.addEventListener('submit', function (evento) {
    try {
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
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valorTransacao,
            data: dataTransacao,
        };
        Conta.regsitrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        elementoFormulario.reset(); //limpa o formulário permitindo uma nova resposta.
    }
    catch (erro) {
        alert(erro);
    }
});
