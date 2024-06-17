"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo) { //se o elementoSaldo for true ele nunca será nulo e assim o TS não reclamará dessa possibilidade!
    elementoSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
}
if (elementoDataAcesso) {
    elementoDataAcesso.textContent =
        new Date().toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
}
