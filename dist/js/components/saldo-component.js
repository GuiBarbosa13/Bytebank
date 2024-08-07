import { formatarMoeda, formatarData } from "../utils/formarters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
//elementos HTML
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
//renderização de data
if (elementoDataAcesso) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.LONGO);
}
//método para atribuir a atualização de saldo para renderização
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
SaldoComponent.atualizar();
//renderização de saldo
function renderizarSaldo() {
    if (elementoSaldo) { //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
export default SaldoComponent;
