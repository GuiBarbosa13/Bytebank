import { formatarMoeda, formatarData } from "../utils/formarters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

//elementos HTML
const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;


//renderização de data
if(elementoDataAcesso){
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.LONGO);
}


//renderização de saldo
function renderizarSaldo():void{
    if(elementoSaldo){  //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}

//método para atribuir a atualização de saldo para renderização
const SaldoComponent = {
    atualizar(){
        renderizarSaldo();
    }
}

export default SaldoComponent;