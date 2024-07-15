import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive,ref,nextTick } from 'vue';
// import { useRefHistory  } from '@vueuse/core'
export const usePaginaStore = defineStore('pagina', () => { 

  // Pagina
  const pagina = ref(new ListaDeElementos.Pagina("Pagina Teste", 5, "11/05/2024"))
  const paginaAtual = computed(() => pagina)
  // Pagina
  // SubPagina
  const subpaginaAtiva = ref(null)
  const subpaginaAtivaAtual = computed(() => {return subpaginaAtiva.value.filhos})
  criarSubPagina()
  MudarSubPaginaAtiva(0)
  // SubPagina
  // const { history,undo,redo } = useRefHistory(pagina, {deep: true, flush: 'sync'})

  function criarSubPagina() {
    pagina.value.filhos.push(new ListaDeElementos.SubPagina())
  }
  async function adicionarLinhaStore() {
    // count.value.n++
    let linha = new ListaDeElementos.Linha();
    // await nextTick()
    subpaginaAtiva.value.filhos.push(linha)
    // console.log(history)
  }
  function MudarSubPaginaAtiva(indice) {
    subpaginaAtiva.value = pagina.value.filhos[indice]
   }
   function deletarLinha(){
    subpaginaAtiva.value.filhos.pop()
   }
   async function desfaz(){
    // undo()
    // console.log(pagina.value)
    // await nextTick()
    // pagina.value = history.value[1].snapshot
    // console.log(history.value[0])
   }

   
  return {pagina , subpaginaAtiva, paginaAtual,deletarLinha,subpaginaAtivaAtual, adicionarLinhaStore, criarSubPagina, MudarSubPaginaAtiva,desfaz }

})