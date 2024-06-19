import { TipoTransacao } from "./TipoTransacao.js";
let saldo = 1150;
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor precisa ser maior que 0!");
    }
    if (saldo >= valor) {
        saldo -= valor;
    }
    else {
        throw new Error("Saldo insuficiente!");
    }
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor precisa ser maior que 0!");
    }
    else {
        saldo += valor;
    }
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    regsitrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error("Esse tipo de transação é inválido!");
            // alert("Tipo de transação inválido!");
        }
    }
};
export default Conta;
