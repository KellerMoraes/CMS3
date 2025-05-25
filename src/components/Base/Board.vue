<template>
  <div v-if="board" :class="{board: true, ativo: ferramentaStore.itemSelecionado?.[idKey] == board[idKey]}" :id="board.id" ref="draggableBoard"  :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
    <div class="abas bg-grey-darken-3" >
      <div class="abaWrap d-flex" ref="abas" :id="board[idKey]" @click.self.exact="ferramentaStore.selecionarBoard(board)">
        <div 
          v-for="(subpage, index) in board.subpaginas" 
          :key="subpage[idKey]"
          :data-index="index"
          :id="subpage[idKey]"
          :data-board-id="board[idKey]"
          :class="['abaSubpages', 'subpage', 'mr-1', 'pa-3',{'firstOf': index == 0}, { 'active': index === board.subpaginaAtiva }]"
          @click="handleTabClick(index)"
          ref="subpagina"
        >
          <span class="nomeSubPagina" >
            {{ subpage[$cms('name')] }}
          </span>
        </div>
      </div>
    </div>

    <Draggable 
      :list="board.subpaginas[board.subpaginaAtiva]?.filhos || []" 
      :item-key="idKey"
      tag="VContainer"
      :component-data="{fluid: true}"
      class="pr-10 containerSpace content" 
      :group="{ name: 'linhas' }" @click.self.exact="ferramentaStore.selecionarBoard(board)"
      @end="itemMoved" 
      @sort="itemSort($event, path)" 
      @remove="itemRemove($event, path)" 
      @add="itemAdd($event, path)"
    >
      <template #item="{ element, index }">
        <component 
          :is="'Comp' + element.nome" 
          :key="element[idKey]"
          v-model="board.subpaginas[board.subpaginaAtiva].filhos[index]" 
          :path="[...path, { tipo: element.tipo, index, id: element[idKey] }]" 
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Draggable from "vuedraggable";
import useCms from '@/composables/useCms';
import { usePaginaStore } from '@/stores/pagina.js';
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
import { setupBoardDragging } from '@/helpers/interact/interactDragBoard';
import { setupTabDragging } from '@/helpers/interact/interactDragTabs';
import { setupTabGroup } from '@/helpers/interact/interactDropTabGroup';
import { useFerramentaStore } from '@/stores/ferramenta.js'
import { useEditorStore } from '@/stores/editor.js'

// CMS
const $cms = useCms();
const idKey = $cms('id');
// MODELO
const ferramentaStore = useFerramentaStore()
const editorStore = useEditorStore()
const board = defineModel();
const draggableBoard = ref(null);
const abas = ref(null);
const position = board.value.posicao;
const paginaStore = usePaginaStore();

const props = defineProps({
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
  onMove: { type: Function, default: null },
  path: { type: Array, required: true }
});

onMounted(() => {
  
    if (draggableBoard.value) {
    draggableBoard.value.setAttribute('data-x', position.x);
    draggableBoard.value.setAttribute('data-y', position.y);
    setupBoardDragging(draggableBoard.value, position,  (data) => {
      props.onMove?.({ ...data, boardId: board.value.id });
    });
  }

  setupTabDragging('.subpage');
  setupTabGroup(abas.value);
});


function handleTabClick(index) {
  if (document.querySelector('.subpage.dragging')) return;
  board.value.subpaginaAtiva = index;
  paginaStore.MudarSubPaginaAtiva(index)
//   let item = editorStore.canvas.boards[0].subpaginas.splice(1,1)
//  editorStore.canvas.boards[0].subpaginas.splice(2,0,...item)

}
</script>

<style lang="scss" scoped>
.board {
  background: #b6b6b6c0;
  height: auto;
  min-height: 700px;
  width: 1400px;
  border: 2px #aeaeaec0 solid;
  border-radius: 15px;
  position: fixed;
}
.ghost {
  position: fixed;
  pointer-events: none;
  opacity: 0.7;
  z-index: 3;
  margin: 0
}

.abas {
  width: 100%;
  border-radius: 12px 12px 0px 0px;
  top: 0;
  left: 0;
  position: absolute;
}

.abaWrap {
  width: 95%;
  transition: 0.5s;
  position: relative;
}


.containerSpace {
  padding-top: 80px;
}

.content {
  width: 97%;
  height: 100vh;
}

.panOn:hover {
  cursor: grab;
}


.subpage {
  background-color: rgb(0, 0, 0);
  position: relative;
  z-index: 1;
  
  &.firstOf{
    border-radius: 15px 0px 0px 0px;
  }
  
  &.dragging {
    opacity: 1;
    z-index: 1000 !important;
    cursor: grabbing !important;
    &.highlight{
      background: rgb(58, 104, 204) !important;
    }
  }
  
  &.active {
    background-color: #555555;
    z-index: 2;
  }
}

.subpage:hover {
  cursor: default !important;
}

.nomeSubPagina {
  border-radius: 15px 0px 0px 0px;
  padding: 22px 12px 22px 12px;
}

.boardFace {
  height: 700px;
  width: 1400px;
  background: #b6b6b6c0;
  border-radius: 15px;
  border: 2px #aeaeaec0 solid;
  position: absolute;
  z-index: 15000;
}
.dropzone {
  background-color: #bfe4ff;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}

.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #29e;
}

.drag-drop {
  display: inline-block;
  min-width: 40px;
  padding: 2em 0.5em;
  margin: 1rem 0 0 1rem;

  color: #fff;
  background-color: #29e;
  border: solid 2px #fff;

  touch-action: none;
  transform: translate(0px, 0px);

  transition: background-color 0.3s;
}
/* .can-drop-subpage{
  width: 300px;
} */
</style>