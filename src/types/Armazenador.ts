export class Armazenador{
    private constructor (){}

    static salvar(chave: string, valor: any){
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }

    static obter<T>(chave: string, reviver?:( this:any, key:string, value:any ) => any): any | T{

        const valor = localStorage.getItem(chave)

        if(valor===null){
            return null
        }

        if(reviver===null){
            return JSON.parse(reviver) as T;
        }

        return JSON.parse(valor) as T;
    }
}