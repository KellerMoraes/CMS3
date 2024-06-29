import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive,ref} from 'vue';
export const usePaginaStore = defineStore('pagina', { 
  state: () => ({
    // paginas
    pagina: reactive({}),
    subpaginaAtiva: reactive({}),
    tamanhoColunagemResponsiva: ref(null)
  

  }),
  actions: {
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
})