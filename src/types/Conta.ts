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

console.log(transacoes);


console.log(transacoes);

function debitar(valor:number):void{
    if(valor<=0){throw new Error("O valor precisa ser maior que 0!")}

    if(saldo >= valor){saldo-=valor}
        else{throw new Error("Saldo insuficiente!")    
    }
}

function depositar (valor: number):void{
    if (valor <= 0){
        throw new Error ("O valor precisa ser maior que 0!")
    }else{
        saldo+=valor
    }    
}

const Conta = {
    getSaldo() {
        return saldo
    },

    getDataAcesso(): Date {
        return new Date();
    },

    regsitrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        } else if ( novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        } else {
            throw new Error("Esse tipo de transação é inválido!")
            // alert("Tipo de transação inválido!");
        }

        transacoes.push(novaTransacao);
        console.log(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Conta;