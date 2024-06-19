import { formatarMoeda, formatarData } from "../utils/formarters.js";
import { FormatoData } from "../types/FormatoData.js";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoDataAcesso) {
    elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.LONGO);
}
export function getSaldo() {
    return saldo;
}
;
atualizarSaldo(saldo);
export function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elementoSaldo) { //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}
