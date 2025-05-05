<template>
  <div class="board" ref="draggableBoard" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
    <div class="abas bg-grey-darken-3">
      <div class="abaWrap d-flex" ref="abas">
        <div 
          v-for="(subpage, index) in board.subpaginas" 
          :key="subpage[idKey]"
          :data-index="index"
          :data-board-id="board.id"
          :class="['abaSubpages', 'subpage', 'mr-1', 'pa-3', { 'active': index === board.subpaginaAtiva }]"
          @click="handleTabClick(index)"
          ref="subpagina"
        >
          <span class="nomeSubPagina">
            {{ subpage.nome || subpage[$cms('name')] }}
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
      :group="{ name: 'linhas' }"
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
import interact from "interactjs";
import Draggable from "vuedraggable";
import useCms from '@/composables/useCms';
import { usePaginaStore } from '@/stores/pagina.js';
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";

// CMS
const $cms = useCms();
const idKey = $cms('id');

// MODELO
const board = defineModel();
const draggableBoard = ref(null);
const position = board.value.posicao;
const paginaStore = usePaginaStore();
const eleMoving = ref(null);

const props = defineProps({
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
  scale: { type: Object },
  onMove: { type: Function, default: null },
  path: { type: Array, required: true }
});

onMounted(() => {
  if (draggableBoard.value) {
    draggableBoard.value.setAttribute('data-x', position.x);
    draggableBoard.value.setAttribute('data-y', position.y);
  }
  setupBoardDragging();
  setupTabSorting();
});

function setupBoardDragging() {
  interact(draggableBoard.value).draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.abaWrap',
        endOnly: false,
        elementRect: { top: 3, left: 0, bottom: 3, right: 1 }
      })
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener }
  });
}

function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  position.x = x;
  position.y = y;
  props.onMove?.({ x, y, boardId: board.value.id });
}

function setupTabSorting() {
  interact('.subpage').draggable({
    inertia: false,
    modifiers: [interact.modifiers.restrict({ restriction: '.abaWrap', endOnly: false })],
    autoScroll: true,
    onstart(event) {
      const el = event.target;
      el.classList.add('dragging');
      document.body.style.userSelect = 'none';
      el.setAttribute('data-start-x', el.getBoundingClientRect().left);
      el.setAttribute('data-offset-x', '0');
      el.setAttribute('data-offset-y', '0');
    },
    onmove(event) {
      const el = event.target;
      let offsetX = parseFloat(el.getAttribute('data-offset-x') || '0') + event.dx;
      let offsetY = parseFloat(el.getAttribute('data-offset-y') || '0') + event.dy;
      el.setAttribute('data-offset-x', offsetX);
      el.setAttribute('data-offset-y', offsetY);
      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      checkForSwap(el, event.clientX);
    },
    onend(event) {
      const el = event.target;
      el.style.transform = '';
      el.classList.remove('dragging');
      const newIndex = Array.from(el.parentNode.children).indexOf(el);
      const oldIndex = parseInt(el.getAttribute('data-index'));
      if (newIndex !== oldIndex) {
        console.log(`Tab moved from index ${oldIndex} to ${newIndex}`);
      }
      document.body.style.userSelect = '';
    }
  });
}

function checkForSwap(draggedElement, mouseX) {
  eleMoving.value = draggedElement.dataset.index;
  const siblings = Array.from(draggedElement.parentNode.children);
  const draggedRect = draggedElement.getBoundingClientRect();
  let newIndex = -1;

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === draggedElement) continue;
    const siblingRect = sibling.getBoundingClientRect();
    const midpoint = siblingRect.left + siblingRect.width / 2;
    const isMovingRight = draggedRect.left < siblingRect.left;
    if (isMovingRight && draggedRect.right > midpoint) newIndex = i + 1;
    else if (!isMovingRight && draggedRect.left < midpoint) {
      newIndex = i;
      break;
    }
  }

  if (newIndex === -1 && mouseX > siblings.at(-1).getBoundingClientRect().right) {
    newIndex = siblings.length;
  }

  const currentIndex = siblings.indexOf(draggedElement);
  if (newIndex === -1 || newIndex === currentIndex || newIndex === currentIndex + 1) return;

  const referenceNode = siblings[newIndex] || null;
  draggedElement.parentNode.insertBefore(draggedElement, referenceNode);
  draggedElement.style.transform = 'translate(0px, 0px)';
  draggedElement.setAttribute('data-offset-x', '0');
  updateIndices();
}

function updateIndices() {
  document.querySelectorAll('.subpage').forEach((tab, index) => {
    tab.setAttribute('data-index', index);
    tab.setAttribute('data-start-x', tab.offsetLeft);
  });
}

function handleTabClick(index) {
  if (document.querySelector('.subpage.dragging')) return;
  board.value.subpaginaAtiva = index;
  paginaStore.MudarSubPaginaAtiva(index);
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

.highlight {
  background: rgba(60, 122, 255, 0.699) !important;
  transition: 0.3s;
}

.subpage {
  background-color: rgb(0, 0, 0);
  position: relative;
  z-index: 1;
  
  &:first-child {
    border-radius: 15px 0px 0px 0px;
  }
  
  &.dragging {
    opacity: 1;
    z-index: 10;
    background: rgb(58, 104, 204) !important;
    cursor: grabbing !important;
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
  padding: 12px;
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
</style>