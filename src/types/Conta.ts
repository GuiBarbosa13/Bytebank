import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldoString = localStorage.getItem("saldo");
let saldo: number = saldoString ? JSON.parse(saldoString) : 0;

const transacoesString = localStorage.getItem("transacoes");
const transacoes: Transacao[] = transacoesString ? JSON.parse(transacoesString, (key: string, value: string) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) : [];

function debitar(valor: number): void {
    if (valor <= 0) { throw new Error("O valor precisa ser maior que 0!") }

    if (saldo >= valor) {
        saldo -= valor;
        localStorage.setItem("saldo", saldo.toString())
    } else {
        throw new Error("Saldo insuficiente!")
    }
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor precisa ser maior que 0!")
    } else {
        saldo += valor;
        localStorage.setItem("saldo", saldo.toString())
    }


}

const Conta = {
    getSaldo() {
        return saldo
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[]{
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1,t2) => t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas){
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", {month:"long", year:"numeric"})
            if(labelGrupoTransacao != labelAtualGrupoTransacao){
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push(
                    {label: labelGrupoTransacao,
                    transacoes: []}
                )
            }

            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        }
        
        return gruposTransacoes;
    },

    regsitrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error("Esse tipo de transação é inválido!")
            // alert("Tipo de transação inválido!");
        }

        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Conta;