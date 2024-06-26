import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formarters.js";

const elementoRegistroTransacoesExtrato = document.querySelector('.extrato .registro-transacoes') as HTMLElement;

renderizarExtrato();

function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();

    elementoRegistroTransacoesExtrato.innerHTML = "";

    let htmlRegistroTransacoes: string = "";

    gruposTransacoes.map(grupo => {
        let htmlItemTransacao: string = "";

        grupo.transacoes.map(transacao => {
            htmlItemTransacao += `
            <div class="transacao-item">
                <div class="transacao-info">
                    <span class="tipo">${transacao.tipoTransacao}</span>
                    <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                </div>
                <time class="data">${formatarData(transacao.data, FormatoData.CURTO)}</time>
            </div>
            `
        })

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupo.label}</strong>
                ${htmlItemTransacao}
            </div>
        `;
    })

    if(htmlRegistroTransacoes === ""){
        htmlRegistroTransacoes = "<div>Não há transações registradas</div>"
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar(): void{
        renderizarExtrato();
    }
}

export default ExtratoComponent;