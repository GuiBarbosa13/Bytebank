import { TipoTransacao } from "./TipoTransacao.js";
let saldoString = localStorage.getItem("saldo");
let saldo = saldoString ? JSON.parse(saldoString) : 0;
const transacoesString = localStorage.getItem("transacoes");
const transacoes = transacoesString ? JSON.parse(transacoesString, (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) : [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("O valor precisa ser maior que 0!");
    }
    if (saldo >= valor) {
        saldo -= valor;
        localStorage.setItem("saldo", saldo.toString());
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
        localStorage.setItem("saldo", saldo.toString());
    }
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelGrupoTransacao != labelAtualGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({ label: labelGrupoTransacao,
                    transacoes: [] });
            }
            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    regsitrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Esse tipo de transação é inválido!");
            // alert("Tipo de transação inválido!");
        }
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
