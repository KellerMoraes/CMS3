<template>
  <div ref="canvas" class="canvas" >
    <SystemToolsToolZoom @zoom-emit="onZoomEmit"></SystemToolsToolZoom>
    <div ref="inner" class="inner-canvas" @click.self.exact="ferramentaStore.removerSelecao()">
      <Board
        v-for="(board, index) in editorStore.canvas.boards"
        :key="board.id"
        
        v-model="editorStore.canvas.boards[index]"
        :path="[{ tipo: 'board', index, id: board.id }]"
        :scale="scaleRef"
        
        :data-board-index="index"
        :class="{boardComponent: true}"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import panzoom from 'panzoom'
import { useEditorStore } from '@/stores/editor.js'
import { useFerramentaStore } from '@/stores/ferramenta.js'
import Board from './Board.vue'
import { setupCanvasDrop } from '@/helpers/interact/interactDropCanvas';
import { provide } from 'vue';
const canvas = ref(null)
const inner = ref(null)
const scaleRef = ref({ getScale: () => 0.7 }) // fallback inicial
const panZoomInstance = ref(null);

const editorStore = useEditorStore()
const ferramentaStore = useFerramentaStore()

onMounted(() => {
  setupPanZoom();
  
  setupCanvasDrop(inner.value, clientToCanvasCoordinates)
  // Observar mudanças nos boards
  watch(() => editorStore.canvas.boards.length, () => {
    // Quando boards são adicionados ou removidos, atualizamos os atributos
    setTimeout(updateBoardAttributes, 0);
  });
});
function setupPanZoom() {
   panZoomInstance.value = panzoom(inner.value, {
    zoomSpeed: 0.2,
    smoothScroll: false,
    maxZoom: 2,
    minZoom: 0.2,
    zoomDoubleClickSpeed: 1, 
    initialX: -1012,
    initialY: -1100,
    initialZoom: 0.7,
    bounds: true, // deixe false se quiser sair dos limites
    beforeWheel: (e) => {
      editorStore.canvas.scale = panZoomInstance.value.getTransform().scale
    return !e.ctrlKey},
    beforeMouseDown: (e) => e.button !== 1,
  });
  
  let isPanning = false;
  panZoomInstance.value.moveBy(-700, -800, true);
  
  const handleMouseMove = (e) => {
    if (isPanning) {
      e.preventDefault();
      panZoomInstance.value.moveBy(e.movementX, e.movementY, false);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      isPanning = true;
      e.preventDefault();
      canvas.value.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 1) {
      isPanning = false;
      canvas.value.style.cursor = 'default';
    }
  };

  canvas.value.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

  scaleRef.value.getScale = () => panZoomInstance.value.getTransform().scale;
  
  // Atualizar atributos dos boards
  updateBoardAttributes();
}
async function onZoomEmit(action) {
  let targetZoom = 1
  
  if (action === '+') {
    targetZoom = 0.5;
  } else if (action === '-') {
    targetZoom = 1.5;
  } else {
    targetZoom = 1;
  }
 panZoomInstance.value.smoothZoom(
    canvas.value.getBoundingClientRect().width / 2,
    canvas.value.getBoundingClientRect().height / 2,
    targetZoom
  );
  setTimeout(()=>{
    editorStore.canvas.scale = panZoomInstance.value.getTransform().scale;
  },450)

}
function updateBoardAttributes() {
  // Adicionar atributos de dados aos elementos .board
  const boardElements = document.querySelectorAll('.board-component');
  boardElements.forEach((el, index) => {
    el.setAttribute('data-board-index', index);
  });
}

// Função para converter coordenadas do cliente para coordenadas do canvas
// Útil para posicionar novos boards quando subpáginas são destacadas
function clientToCanvasCoordinates(clientX, clientY) {
  if (!canvas.value || !panZoomInstance.value) return { x: 0, y: 0 };
  
  const rect = canvas.value.getBoundingClientRect();
  const scale = panZoomInstance.value.getTransform().scale;
  const offsetX = panZoomInstance.value.getTransform().x;
  const offsetY = panZoomInstance.value.getTransform().y;
  
  const x = (clientX - rect.left - offsetX) / scale;
  const y = (clientY - rect.top - offsetY) / scale;
  
  return { x, y };
}

// Expor métodos úteis
provide('clientToCanvasCoordinates', clientToCanvasCoordinates);
defineExpose({
  clientToCanvasCoordinates,
  getScale: () => scaleRef.value.getScale()
});
</script>

<style scoped>
.canvas {
  /* width: 100vw; */
  /* height:  calc(100vh - 138px - 64px); */
  height: 100%;
  overflow: auto; /* importante para o panzoom não sair da tela */
  position: relative;
  /* margin-top: 64px; */
  margin-left: 70px;
  cursor: default;
}
.ativo{
  border: 2px #ce0224 solid;
}
.inner-canvas {
  width: 5000px;
  height: 5000px;
  /* transform-origin: 0 0;
  background-image: repeating-linear-gradient(0deg, #ccc 0, #ccc 2px, #ededed 3px, #efefef00 100px),
                    repeating-linear-gradient(90deg, #ccc 0, #ccc 4px, #efefef00 5px, transparent 100px); */
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
  background-color: rgb(25, 85, 128);
  border-color: #fff;
  border-style: solid;
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

.drag-drop.can-drop {
  color: #000;
  background-color: #4e4;
}
</style>