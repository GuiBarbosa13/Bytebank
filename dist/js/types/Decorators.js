export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDebito) {
        if (valorDebito <= 0) {
            throw new Error("O valor a ser debitado precisa ser maior que zero!");
        }
        if (valorDebito > this.saldo) {
            throw new Error("Seu saldo é insuficiente para realizar essa transação");
        }
        return originalMethod.apply(this, [valorDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDeposito) {
        if (valorDeposito <= 0) {
            throw new Error("O valor do depósito precisa ser maior que zero");
        }
        return originalMethod.apply(this, [valorDeposito]);
    };
    return descriptor;
}
