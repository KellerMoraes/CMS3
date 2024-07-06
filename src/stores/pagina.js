import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive,ref} from 'vue';
// import { useRefHistory  } from '@vueuse/core'
export const usePaginaStore = defineStore('pagina', () => { 

  // Pagina
  const pagina = ref(new ListaDeElementos.Pagina("Pagina Teste", 5, "11/05/2024"))
  const paginaAtual = computed(() => pagina.value)
  // Pagina
  // SubPagina
  const subpaginaAtiva = ref(null)
  const subpaginaAtivaAtual = computed(() => {return subpaginaAtiva.value})
  criarSubPagina()
  MudarSubPaginaAtiva(0)
  function criarSubPagina() {
    pagina.value.filhos.push(new ListaDeElementos.SubPagina())
  }
  function adicionarLinhaStore() {
    // count.value.n++
    let linha = new ListaDeElementos.Linha();
    subpaginaAtiva.value.filhos.push(linha)
  }
  function MudarSubPaginaAtiva(indice) {
    subpaginaAtiva.value = paginaAtual.value.filhos[indice]
   }
   function deletarLinha(){
    subpaginaAtiva.value.filhos.pop()
   }

   
  return {pagina , subpaginaAtiva, paginaAtual,deletarLinha,subpaginaAtivaAtual, adicionarLinhaStore, criarSubPagina, MudarSubPaginaAtiva }

})