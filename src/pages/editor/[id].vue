<template>
   <v-toolbar
   style="z-index: 1005;border-bottom: 1px #e1e1e1 solid;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
   >
   <Ferramentas />
 </v-toolbar>
 <div>
   
   <MenuComponente />
 </div>
   <main ref="mainContainer"  style="display: flex; height: 100vh;" :class="pan ? 'canvas panOn': 'canvas' " >
    <div ref="viewportContainer"  class="viewport-container">
        
   <!-- <BaseBoard v-for="board in paginaStore.pagina.boards"
   v-model="paginaStore.pagina.filhos"
   :style="pan ? 'pointer-events: none' : ''"
   :initialX="300"
   :initialY="250"
   :scale="panzoomInstance"
   ></BaseBoard> -->
   <BaseBoard v-for="(board , i) in paginaStore.boards"
   v-model="paginaStore.boards[i]"
   :key="board.nome"
   :style="pan ? 'pointer-events: none' : ''"
   :scale="panzoomInstance"
   ></BaseBoard>
</div>
 <MenuConfiguracao />
   </main>

 </template>
 
 <script setup>
 import { usePaginaStore } from '@/stores/pagina.js';
 import { useFerramentaStore } from '@/stores/ferramenta.js';
import { storeToRefs } from 'pinia';
import Panzoom from "@panzoom/panzoom";
import interact from "interactjs";

 const pan = ref(false)
 const viewportContainer = ref(null);
 const mainContainer = ref(null);
const panzoomInstance = ref(null);

 let paginaStore = usePaginaStore();
 let ferramentaStore = useFerramentaStore()
 const { selecionarCabecalho } = storeToRefs(ferramentaStore)
 const {pagina,subpaginaAtiva, boards, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = storeToRefs(paginaStore)
 
 
 onMounted(() => {
  panzoomInstance.value = Panzoom(viewportContainer.value, {
    maxScale: 2, // Zoom máximo
    minScale: 0.2, // Zoom mínimo
    disablePan: true, // Pan desativado por padrão
    cursor: "default",
    canvas: true ,
    excludeClass: "board", // Exclui os boards do Panzoom
  });
  
interact('.canvas').dropzone({
  accept: '.subpage',
  ondragenter: function (event) {
    var dropzoneElement = event.target
    var target = event.relatedTarget
    target.classList.add("boardFace")
    target.classList.remove("mx-1")
    target.classList.remove("pa-3")
    target.childNodes[0].classList.add("bg-grey-darken-3")
    target.childNodes[0].classList.add("py-3")
    target.childNodes[0].classList.add("mx-0")
    target.childNodes[0].classList.add("borderRadius")
    dropzoneElement.classList.add('highlight')
    
  },
  ondragleave: function (event) {
    event.target.classList.remove('highlight')
  },
  ondrop: function (event) {
    let subPaginaArrastada = event.relatedTarget.id;
  let indexBoard;
  let indexSubpagina;

  // Ajustando a posição com base no pan e zoom
  const { clientX, clientY } = event.dragEvent;
  const scale = panzoomInstance.value.getScale(); // Fator de zoom
  const offsetX = viewportContainer.value.getBoundingClientRect().left;
  const offsetY = viewportContainer.value.getBoundingClientRect().top;

  const boardHeight = event.relatedTarget.clientHeight + 25; 

  let adjustedX = (clientX - offsetX) / scale;
  let adjustedY = (clientY - offsetY) / scale - (boardHeight / scale);


  paginaStore.boards.forEach((board, index) => {
    indexBoard = index;
    indexSubpagina = board.subpaginas.findIndex(item => item.id === subPaginaArrastada);
  });

  if (paginaStore.boards[indexBoard].subpaginas.length <= 1) {
    return;
  }

  // Remover a subpágina arrastada
  let subpaginaDesattached = paginaStore.boards[indexBoard].subpaginas.splice(indexSubpagina, 1);
  // Adicionar o novo "board" na posição ajustada
  paginaStore.boards.push({
    nome: subpaginaDesattached[0].id,
    posicao: { x: adjustedX - 20, y: adjustedY * scale + 0.1 },
    subpaginas: subpaginaDesattached,
    subpaginaAtiva: 0
  });

  // Remover a classe de destaque da zona de drop
  event.target.classList.remove('highlight');
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
  }
})



  
  mainContainer.value.addEventListener(
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
    event.preventDefault()
    
    pan.value = true;
    panzoomInstance.value.setOptions({ disablePan: false, cursor: "grab" });
  }
}

function handleKeyUp(event) {
  if (event.code === "Space") {
    event.preventDefault()
    pan.value = false;
    panzoomInstance.value.setOptions({ disablePan: true, cursor: "default" });
  }
}
 
 </script>
 
 <style scoped lang="scss">
 .viewport-container{
  width: 85vw;
 }
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
 .highlight{
  background: rgba(60, 122, 255, 0.699) ;
  transition: 0.3s;
 }
 
 </style>
