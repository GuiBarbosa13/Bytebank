function formatarMoeda(valor:number):string{
   return valor.toLocaleString("pt-br",{style:"currency", currency:"BRL"});
}



enum FormatoData{
    LONGO="longo",
    CURTO="curto",
    MES="mes"
}

function formatarData(data: Date, formato:FormatoData):string{
    if(formato===FormatoData.LONGO){
        return data.toLocaleDateString("pt-br", {weekday:"long", day:"2-digit", month:"long",year:"numeric"});
    }else if(formato === FormatoData.CURTO){
        return data.toLocaleDateString("pt-br",{day:"2-digit",month:"2-digit"})
    }else if(formato === FormatoData.MES){
        return data.toLocaleDateString("pt-br",{month:"long"});
    }
    else{return "Data inválida"}
    
}