import { Armazenador } from "./Armazenador.js";
import { ValidaDebito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js"

export class Conta {
    nome: string = ""

    protected saldo: number = Armazenador.obter<number>("saldo") || 0;

    transacoes: Transacao[] = Armazenador.obter<Transacao[]>(("transacoes"), (key: string, value: any) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];

    constructor(nome: string) {
        this.nome = nome
    }

    public getTitular(): string {
        return this.nome;
    }

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" })
            if (labelGrupoTransacao != labelAtualGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push(
                    {
                        label: labelGrupoTransacao,
                        transacoes: []
                    }
                )
            }

            gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    getSaldo() {
        return this.saldo;
    }

    getDataAcesso(): Date {
        return new Date();
    }


    @ValidaDebito
    debitar(valor: number): void {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString())
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor precisa ser maior que 0!")
        } else {
            this.saldo += valor;
            Armazenador.salvar("saldo", this.saldo.toString())
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

        console.log(this.transacoes);
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
    }
}

export class ContaPremium extends Conta {
    registrarTransacao(transacao: Transacao): void {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("Ganhou um bônus de R$ 0,50")
            transacao.valor += 0.5;

        }

        super.regsitrarTransacao(transacao);

    }
}

const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Guilherme da Silva Barbosa")

export default conta