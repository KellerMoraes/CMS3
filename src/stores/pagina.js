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
  // boards.value[0].subpaginas.push(pagina.value.filhos)
  const subpaginaAtiva = ref(null)
  const subpaginaAtivaAtual = computed(() => {return subpaginaAtiva.value.filhos})
  criarSubPagina()
  criarSubPagina()
  MudarSubPaginaAtiva(0)
  const boards = ref([{nome:pagina.value.filhos[0].id, posicao: { x: 300, y: 250 }, subpaginas: pagina.value.filhos, subpaginaAtiva: 0}])
  // criarSubPagina()
  // SubPagina
  // const { history,undo,redo } = useRefHistory(pagina, {deep: true, flush: 'sync'})

  function criarSubPagina() {
    pagina.value.filhos.push(new ListaDeElementos.SubPagina())
  }
  // async function adicionarLinhaStore() {
  //   let linha = new ListaDeElementos.Linha();
  //   subpaginaAtiva.value.filhos.push(linha)
  // }
  function MudarSubPaginaAtiva(indice) {
    subpaginaAtiva.value = pagina.value.filhos[indice]
    console.log(subpaginaAtiva.value)
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

   
  return {pagina ,boards, subpaginaAtiva, paginaAtual,deletarLinha,subpaginaAtivaAtual, criarSubPagina, MudarSubPaginaAtiva,desfaz }

})