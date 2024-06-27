import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js"

export class Conta{
    nome: string = ""

    saldoString: string | null = localStorage.getItem("saldo");
    saldo: number = this.saldoString? JSON.parse(this.saldoString) : 0

    transacoesString = localStorage.getItem("transacoes");
    transacoes: Transacao[] = this.transacoesString ? JSON.parse(this.transacoesString, (key: string, value: string) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) : [];

    constructor (nome: string){
        this.nome = nome
    }

    getGruposTransacoes(): GrupoTransacao[]{
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
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
    }

    getSaldo(){
        return this.saldo;
    }

    getDataAcesso(): Date{
        return new Date();
    }

    debitar(valor: number): void {
        if (valor <= 0) { throw new Error("O valor precisa ser maior que 0!") }
    
        if (this.saldo >= valor) {
            this.saldo -= valor;
            localStorage.setItem("saldo", this.saldo.toString())
        } else {
            throw new Error("Saldo insuficiente!")
        }
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor precisa ser maior que 0!")
        } else {
            this.saldo += valor;
            localStorage.setItem("saldo", this.saldo.toString())
        }
    }

    regsitrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error("Esse tipo de transação é inválido!")
            // alert("Tipo de transação inválido!");
        }

        this.transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
}

const conta = new Conta("Joana da Silva Oliveira");

export default conta