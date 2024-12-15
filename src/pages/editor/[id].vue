<template>
   <v-toolbar
   style="z-index: 1005;border-bottom: 1px #e1e1e1 solid;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
   >
   <Ferramentas />
 </v-toolbar>
 <div>
   
   <MenuComponente />
 </div>
   <main style="display: flex; height: 93vh;" :class="pan ? 'canvas panOn': 'canvas' " >
    <div ref="viewportContainer" :style="`width: ${tamanho.largura}; height: ${tamanho.altura}`"   class="viewport-container">
        
   <BaseBoard
   v-model="paginaStore.pagina.filhos"
   :style="pan ? 'pointer-events: none' : ''"
   :initialX="100"
   :initialY="50"
   :scale="panzoomInstance"
   @onMove="handleMove"></BaseBoard>
</div>
 <MenuConfiguracao />
   </main>

 </template>
 
 <script setup>
 import { usePaginaStore } from '@/stores/pagina.js';
 import { useFerramentaStore } from '@/stores/ferramenta.js';
import { storeToRefs } from 'pinia';
import Panzoom from "@panzoom/panzoom";

 const pan = ref(false)
 const route = useRoute()
 const tab = ref(0)
 const viewportContainer = ref(null);
const panzoomInstance = ref(null);
 const tamanho = computed(()=>{
   return {
     largura: window.innerWidth,
     altura: window.innerHeight,
   }
 })
 let paginaStore = usePaginaStore();
 let ferramentaStore = useFerramentaStore()
 const { selecionarCabecalho } = storeToRefs(ferramentaStore)
 const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = storeToRefs(paginaStore)
 
 
 function adicionarLinha() {
   paginaStore.adicionarLinhaStore()
   console.log(history)
 }
 
 function refaz(){
   undo()
   console.log(history)
 }
 
 onMounted(() => {
  panzoomInstance.value = Panzoom(viewportContainer.value, {
    maxScale: 2, // Zoom máximo
    minScale: 0.2, // Zoom mínimo
    disablePan: true, // Pan desativado por padrão
    cursor: "default",
    excludeClass: "board", // Exclui os boards do Panzoom
  });

  // Ativa o zoom com o scroll do mouse
  viewportContainer.value.addEventListener(
    "wheel",
      panzoomInstance.value.zoomWithWheel
    
  );
   document.addEventListener('keydown', handleKeyDown);
   document.addEventListener('keyup', handleKeyUp);
   
 });
 
 onUnmounted(() => {
   document.removeEventListener('keydown', handleKeyDown);
   document.removeEventListener('keyup', handleKeyUp);
 });
 function handleKeyDown(event) {
  if (event.code === "Space") {
    pan.value = true;
    panzoomInstance.value.setOptions({ disablePan: false, cursor: "grab" });
  }
}

function handleKeyUp(event) {
  if (event.code === "Space") {
    pan.value = false;
    panzoomInstance.value.setOptions({ disablePan: true, cursor: "default" });
  }
}
 
 function handleClickOnLayer(event) {
   const [x, y] = zoompinchRef.value?.normalizeMatrixCoordinates(event.clientX, event.clientY);
 }
 </script>
 
 <style scoped lang="scss">
 
 main {
   height: 100%;
   width: 100%;
 }
 
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
 .abaSubpages{
  height: 50px;
  &.selecionado{
    border-bottom: white 1px solid
  }
 }
 .abaWrap{
  width: 95%;
 }
 .flutuante{
  top: 0;
  left: 0;
  position: absolute;
 }
 .containerSpace{
  padding-top: 80px;
 }
 .panOn:hover{
   cursor: grab;
 
 }
 </style>
