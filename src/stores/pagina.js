import { defineStore } from 'pinia';
import { criarElemento } from "@/model/Elementos";
import { ref} from 'vue';
import { $cms } from '@/helpers/cmsProviderHelper';
export const usePaginaStore = defineStore('pagina', () => {
  const pagina = ref(criarElemento("Pagina",{[$cms('name')]:"Medicina",[$cms('idDomain')]:5,[$cms('startDate')]: "23/04/2025"}))
  const paginaAtual = computed(() => pagina)
  const subpaginaAtiva = ref(null)
  const subpaginaAtivaAtual = computed(() => {return subpaginaAtiva.value[$cms('container')]})
  MudarSubPaginaAtiva(0)
  const boards = ref([{nome:pagina.value[$cms('container')][0][$cms('name')], id: pagina.value[$cms('container')][0][$cms('id')], posicao: { x: 300, y: 250 }, subpaginas: pagina.value[$cms('container')], subpaginaAtiva: 0}])

  function MudarSubPaginaAtiva(index) {
    subpaginaAtiva.value = pagina.value[$cms('container')][index]
    // console.log(subpaginaAtiva.value)
   }

   function deletarLinha(){
    subpaginaAtiva.value[$cms('container')].pop()
   }
      
  return {pagina ,boards, subpaginaAtiva, paginaAtual,deletarLinha,subpaginaAtivaAtual, MudarSubPaginaAtiva }

})