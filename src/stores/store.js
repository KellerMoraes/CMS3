
import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive, ref } from 'vue';


export const useComponentStore = defineStore('component', {
  state: () => ({
    // paginas
    pagina: reactive({}),
    subpaginaAtiva: reactive({}),
    // Ferramentas
    corBarra: reactive({ cor: "white" }),
    itemSelecionado: reactive({}),
    ferramentaSelecionada: ref(null),
    colunaSelecionada: ref(""),
    // Edições
    campoSelecionado: reactive({}),
    opcaoComponenteSelecionado: ref(false),
    // Responsividade
    tamanhoColunagemResponsiva: ref(null)

  }),
  actions: {
    mudarColunagem(opcao, qtdColunas) {
      console.log(opcao)
      this.itemSelecionado.filhos.pop()
      for (let i = 0; i < qtdColunas; i++) {
        let coluna = new ListaDeElementos.Coluna()
        coluna.estrutura = opcao[i]
        this.itemSelecionado.filhos.push(coluna)

      }
    },
    selecionarLinha(linha) {
      this.itemSelecionado = linha
      this.corBarra.cor = "green"
      this.ferramentaSelecionada = "Linha"
    },
    selecionarColuna(coluna) {
      this.itemSelecionado = coluna
      this.ferramentaSelecionada = "Coluna"
      this.corBarra.cor = "blue"
    },
    selecionarComponente(componente) {
      this.itemSelecionado = componente
      this.ferramentaSelecionada = "Componente"
      this.corBarra.cor = "purple"
    },
    configuracaoCabecalho() {

      this.itemSelecionado = this.subpaginaAtiva
      this.ferramentaSelecionada = "Cabecalho"
      this.corBarra.cor = "#830909"
    },
    criarSubPagina() {
      let subPagina = new ListaDeElementos.SubPagina()
      this.pagina.filhos.push(subPagina)
    },
    MudarSubPaginaAtiva(indice) {
      this.subpaginaAtiva = this.pagina.filhos[indice]
    }
  },
});