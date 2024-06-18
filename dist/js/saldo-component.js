"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo) { //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
    elementoSaldo.textContent = formatarMoeda(saldo);
}
if (elementoDataAcesso) {
    elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.LONGO);
}
