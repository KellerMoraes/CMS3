import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePaginaStore } from '@/stores/pagina'
import { $cms } from '@/helpers/cmsProviderHelper';
import { criarElemento } from "@/model/Elementos";

export const useEditorStore = defineStore('editor', () => {
  const paginaStore = usePaginaStore()
  // Edição de Componentes
  const campoSelecionado =  reactive({})
  // Barra lateral Comps
  const opcaoComponenteSelecionado = ref(false)
  const recursoSelecionado = ref(false)
  // Config Canvas
  const canvas = ref({
    boards: [
      criarElemento('Board', {
        subpaginas: paginaStore.pagina[$cms('container')],
        posicao: { x: 1800, y: 1800 },
      })
    ],
    scale: 0.7,
    panPosition: {}
    })


    function selecionarRecurso(recurso){
      this.recursoSelecionado = recurso
      this.opcaoComponenteSelecionado = true
    }
    
    function adicionarBoard({subpaginas = [],posicao }) {
      const novoBoard = criarElemento('Board', { subpaginas, posicao });
      canvas.value.boards.push(novoBoard);
      return novoBoard;
    }
  function removerBoard(id) {
    const index = canvas.value.boards.findIndex(b => b.id === id);
    if (index !== -1) {
      canvas.value.boards.splice(index, 1);
    }
  }
  function moverSubpaginasEntreBoards(idBoardRemover, idSubpage, idBoardAdicionar , posi = { x: 2600, y: 1800 }){
    const indexBoardRemove = canvas.value.boards.findIndex(b => b.id === idBoardRemover);
    const indexSubpage = canvas.value.boards[indexBoardRemove].subpaginas.findIndex(s => s.id === idSubpage);
   let subPage = canvas.value.boards[indexBoardRemove].subpaginas.splice(indexSubpage,1)
    if(idBoardAdicionar){
      const indexBoardAdd = canvas.value.boards.findIndex(b => b.id === idBoardAdicionar);
      canvas.value.boards[indexBoardAdd].subpaginas.splice(indexBoardRemove,0,subPage[0])
      if(canvas.value.boards[indexBoardRemove].subpaginas.length == 0){
        removerBoard(idBoardRemover)
      }
    }else{
      adicionarBoard({subpaginas: subPage, posicao: posi})
    }

  }
  return {
    canvas,
    campoSelecionado,
    opcaoComponenteSelecionado,
    recursoSelecionado,
    selecionarRecurso,
    adicionarBoard,
    removerBoard,
    moverSubpaginasEntreBoards
  };
})