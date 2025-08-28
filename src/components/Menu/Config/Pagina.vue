<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-expansion-panels
    v-model="panel"
    multiple
    variant="accordion"
  >
    <v-expansion-panel :value="1">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Subpáginas</h3>
    </v-expansion-panel-title>
    <Draggable :list="paginaStore.pagina.filhos" tag="div"
    :item-key="'id'" :group="{ name: 'subpageList' }" :component-data="{density: 'default'}"
    >
    <template #item="{ element, index }">
      <v-list-item :key="index" color="blue" @click=""
      >
        <template v-slot:prepend>
          <v-btn size="44" variant="text" :color="element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' :'#6d6d6d7a'" :icon="element[$cms('attrs')].visibilidade[$cms('value')] == 'block'? 'mdi-eye':'mdi-eye-off'" @click="visibilityChangeSubpage(element)"></v-btn>
        </template>
        
        <v-list-item-title @click="selecionarSubpagina(element)" class="pl-5"><span :style="{color: element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' :'#6d6d6d7a'}">{{ element.nome }}</span></v-list-item-title>
        <template v-slot:append>
          <v-btn size="44" variant="text" :color="element[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'white' :'#6d6d6d7a'" icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-list-item>
    </template>
  </Draggable>
    <v-list-item-subtitle class="text-center py-2">
      <small><v-icon>mdi-information-outline</v-icon>Hierarquia definitiva na exibição da página.</small>
    </v-list-item-subtitle>
</v-expansion-panel>
  </v-expansion-panels>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta.js';
  import { usePaginaStore } from '@/stores/pagina.js';
  import { useEditorStore } from '@/stores/editor.js';
  import Draggable from "vuedraggable";
  import { $cms } from '@/helpers/cmsProviderHelper'
  let editorStore = useEditorStore()
  let paginaStore = usePaginaStore()
  let ferramentaStore = useFerramentaStore()
  const panel = ref([])

function scrollToBoard(boardId) {
    editorStore.canvas.scale = 0.6
    const boardIndex = editorStore.canvas.boards.findIndex(
      b => b.id === boardId
    );
    ferramentaStore.selecionarBoard(editorStore.canvas.boards[boardIndex])
    if (boardIndex >= 0) {
      let topZ = editorStore.canvas.boards.length - 1
      editorStore.canvas.boards.forEach((board)=>{
        if(board.depth > 0){
          board.depth -= 1
        }
      }) 
      editorStore.canvas.boards[boardIndex].depth = topZ
    }


    setTimeout(()=>{

        const canvasElement = document.querySelector(".canvas");
        const boardElement = document.querySelector("#" + boardId);
        
        if (!canvasElement || !boardElement) return;
        
        // Pega a posição atual do board no DOM
        const canvasRect = canvasElement.getBoundingClientRect();
        const boardRect = boardElement.getBoundingClientRect();
        
        // Calcula onde o board está em relação ao canvas
        const boardLeft = boardRect.left - canvasRect.left + canvasElement.scrollLeft;
        const boardTop = boardRect.top - canvasRect.top + canvasElement.scrollTop;
        
        // Centraliza o board
        const scrollX = boardLeft + (boardRect.width / 2) - (canvasRect.width / 2);
        const scrollY = boardTop + (boardRect.height / 2) - (canvasRect.height / 2);
        
        canvasElement.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior: 'smooth'
        });
    },150)
}
function selecionarSubpagina(sub){
  let ele = document.querySelector("#"+sub[$cms('id')])
  ferramentaStore.selecionarSubpagina(ele)
  
}
function visibilityChangeSubpage(ele){
  ele[$cms('attrs')].visibilidade[$cms('value')] = ele[$cms('attrs')].visibilidade[$cms('value')] == 'block' ? 'none':'block'
  
}
  </script>
  <style>
</style>