import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 1150;

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
    }
}

export default Conta;