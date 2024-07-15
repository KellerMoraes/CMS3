import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
export const useEditorStore = defineStore('editor', { 
    state: () => ({

        // Edições
        campoSelecionado: reactive({}),
        opcaoComponenteSelecionado: ref(false),
        recursoSelecionado: ref(false),

    
      }),
      actions: {
        selecionarRecurso(recurso){
          this.recursoSelecionado = recurso
          this.opcaoComponenteSelecionado = true
        },
      }
    //     mudarColunagem(opcao, qtdColunas) {
    //       console.log(opcao)
    //       this.itemSelecionado.filhos.pop()
    //       for (let i = 0; i < qtdColunas; i++) {
    //         let coluna = new ListaDeElementos.Coluna()
    //         coluna.estrutura = opcao[i]
    //         this.itemSelecionado.filhos.push(coluna)
    
    //       }
    //     },
    //     selecionarLinha(linha) {
    //       this.itemSelecionado = linha
    //       this.corBarra.cor = "green"
    //       this.ferramentaSelecionada = "Linha"
    //     },
    //     selecionarColuna(coluna) {
    //       this.itemSelecionado = coluna
    //       this.ferramentaSelecionada = "Coluna"
    //       this.corBarra.cor = "blue"
    //     },
    //     selecionarComponente(componente) {
    //       this.itemSelecionado = componente
    //       this.ferramentaSelecionada = "Componente"
    //       this.corBarra.cor = "purple"
    //     },
    //     configuracaoCabecalho() {
    
    //       this.itemSelecionado = this.subpaginaAtiva
    //       this.ferramentaSelecionada = "Cabecalho"
    //       this.corBarra.cor = "#830909"
    //     },
    //     criarSubPagina() {
    //       let subPagina = new ListaDeElementos.SubPagina()
    //       this.pagina.filhos.push(subPagina)
    //     },
    //     MudarSubPaginaAtiva(indice) {
    //       this.subpaginaAtiva = this.pagina.filhos[indice]
    //     }
    //   },
})