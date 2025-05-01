<template>
  <div ref="canvas" class="canvas">
    <div ref="inner" class="inner-canvas">
      <Board
        v-for="(board, index) in paginaStore.boards"
        :key="board.id"
        v-model="paginaStore.boards[index]"
        :path="[{ tipo: 'board', index, id: board.id }]"
        :scale="scaleRef"
        :data-board-index="index"
        class="board-component"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import panzoom from 'panzoom'
import { usePaginaStore } from '@/stores/pagina.js'
import Board from './Board.vue'

const canvas = ref(null)
const inner = ref(null)
const scaleRef = ref({ getScale: () => 1 }) // fallback inicial
let panZoomInstance = null;

const paginaStore = usePaginaStore()

onMounted(() => {
  setupPanZoom();
  
  // Observar mudanças nos boards
  watch(() => paginaStore.boards.length, () => {
    // Quando boards são adicionados ou removidos, atualizamos os atributos
    setTimeout(updateBoardAttributes, 0);
  });
});

function setupPanZoom() {
  panZoomInstance = panzoom(inner.value, {
    zoomSpeed: 0.1,
    smoothScroll: false,
    maxZoom: 2,
    minZoom: 0.2,
    initialX: -1012,
    initialY: -1100,
    initialZoom: 0.7,
    bounds: false, // deixe false se quiser sair dos limites
    beforeWheel: (e) => !e.ctrlKey,
    beforeMouseDown: (e) => e.button !== 1,
  });
  
  let isPanning = false;
  panZoomInstance.moveBy(-700, -800, true);
  
  const handleMouseMove = (e) => {
    if (isPanning) {
      e.preventDefault();
      panZoomInstance.moveBy(e.movementX, e.movementY, false);
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

  scaleRef.value.getScale = () => panZoomInstance.getTransform().scale;
  
  // Atualizar atributos dos boards
  updateBoardAttributes();
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
  if (!canvas.value || !panZoomInstance) return { x: 0, y: 0 };
  
  const rect = canvas.value.getBoundingClientRect();
  const scale = panZoomInstance.getTransform().scale;
  const offsetX = panZoomInstance.getTransform().x;
  const offsetY = panZoomInstance.getTransform().y;
  
  const x = (clientX - rect.left - offsetX) / scale;
  const y = (clientY - rect.top - offsetY) / scale;
  
  return { x, y };
}

// Expor métodos úteis
defineExpose({
  clientToCanvasCoordinates,
  getScale: () => scaleRef.value.getScale()
});
</script>

<style scoped>
.canvas {
  width: 100vw;
  height: 100vh;
  overflow: auto; /* importante para o panzoom não sair da tela */
  position: relative;
  cursor: default;
}

.inner-canvas {
  width: 5000px;
  height: 5000px;
  transform-origin: 0 0;
  background-image: repeating-linear-gradient(0deg, #ccc 0, #ccc 2px, #ededed 3px, #efefef00 100px),
                    repeating-linear-gradient(90deg, #ccc 0, #ccc 4px, #efefef00 5px, transparent 100px);
}
</style>