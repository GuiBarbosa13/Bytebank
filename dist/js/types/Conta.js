import { Armazenador } from "./Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    constructor(nome) {
        this.nome = "";
        this.saldo = Armazenador.obter("saldo") || 0;
        this.transacoes = Armazenador.obter(("transacoes"), (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
        this.nome = nome;
    }
    getTitular() {
        return this.nome;
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
            Armazenador.salvar("saldo", this.saldo.toString());
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
            Armazenador.salvar("saldo", this.saldo.toString());
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
        console.log(this.transacoes);
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
    }
}
const conta = new Conta("Joana da Silva Oliveira");
export default conta;
