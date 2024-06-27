import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    constructor(nome) {
        this.nome = "";
        this.saldoString = localStorage.getItem("saldo");
        this.saldo = this.saldoString ? JSON.parse(this.saldoString) : 0;
        this.transacoesString = localStorage.getItem("transacoes");
        this.transacoes = this.transacoesString ? JSON.parse(this.transacoesString, (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) : [];
        this.nome = nome;
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
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
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor precisa ser maior que 0!");
        }
        if (this.saldo >= valor) {
            this.saldo -= valor;
            localStorage.setItem("saldo", this.saldo.toString());
        }
        else {
            throw new Error("Saldo insuficiente!");
        }
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor precisa ser maior que 0!");
        }
        else {
            this.saldo += valor;
            localStorage.setItem("saldo", this.saldo.toString());
        }
    }
    regsitrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Esse tipo de transação é inválido!");
            // alert("Tipo de transação inválido!");
        }
        this.transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
}
const conta = new Conta("Joana da Silva Oliveira");
export default conta;
