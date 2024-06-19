import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatarData(data, formato = FormatoData.CURTO) {
    if (formato === FormatoData.LONGO) {
        return data.toLocaleDateString("pt-br", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    }
    else if (formato === FormatoData.CURTO) {
        return data.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }
    else if (formato === FormatoData.MES) {
        return data.toLocaleDateString("pt-br", { month: "long" });
    }
    else {
        return data.toLocaleString("pt-br");
    }
}
