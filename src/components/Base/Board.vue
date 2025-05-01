<template>
  <div class="board" ref="draggable" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
    <div class="abas flutuante bg-grey-darken-3">
      <div class="abaWrap d-flex">
        <div :id="element[idKey]" v-for="(element, index) in board.subpaginas" :key="element[idKey]"
          @click="board.subPaginaAtiva = index" ref="subpagina" class="abaSubpages subpage mr-1 pa-3"
          :data-index="index" :data-board-id="board.id">
          <div>
            <span class="nomeSubPagina">
              {{ element.nome }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <Draggable :list="board.subpaginas[board.subpaginaAtiva].filhos" :item-key="idKey"
    tag="VContainer"
    :component-data="{fluid: true}"
      class="pr-10 containerSpace content" :group="{ name: 'linhas' }"
       @end="itemMoved" @sort="itemSort($event,path)" @remove="itemRemove($event,path)" @add="itemAdd($event,path)"
      >
      <template #item="{ element, index }">
        <component :is="'Comp' + element.nome" :key="element[idKey]"
          v-model="board.subpaginas[board.subpaginaAtiva].filhos[index]" :path="[...path, { tipo: element.tipo, index, id: element[idKey] }]" />
      </template>
    </Draggable>
  </div>
</template>

<script setup>
// IMPORTS
import { ref, onMounted, watch, nextTick } from "vue";
import interact from "interactjs";
import { usePaginaStore } from '@/stores/pagina.js';
import Draggable from "vuedraggable";
import useCms from '@/composables/useCms';
import { criarElemento } from "@/model/Elementos";
// Command-pattern imports 
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
// Command-pattern imports 
// IMPORTS
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
// MODELS DEFINIDAS
const board = defineModel()
// MODELS DEFINIDAS
// VARIAVEIS NORMAIS
const subpagina = ref(null)
const position = board.value.posicao
const draggable = ref(null);
const draggingSubpagina = ref(null);
const draggingSubpaginaIndex = ref(null);
// VARIAVEIS NORMAIS
// STORE
let paginaStore = usePaginaStore();
// STORE
// PROPS
const props = defineProps({
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
  scale: { type: Object },
  onMove: { type: Function, default: null },
  path: {
    type: Array,
    required: true
  }
});
// PROPS

onMounted(() => {
  // move o board livremente (DRAGGABLE)
  draggable.value.setAttribute('data-x', position.x);
  draggable.value.setAttribute('data-y', position.y);
  interact(draggable.value).draggable({
    ignoreFrom: '.abaSubpages, .content',
    inertia: {
      resistance: 25,
      minSpeed: 200,
      endSpeed: 100
    },
    autoScroll: true,
    listeners: {
      move(event) {
        let target = draggable.value;
        let scale = props.scale.getScale();

        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale;
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale;

        position.x = x;
        position.y = y;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        if (props.onMove) props.onMove({ x, y });
      }
    },
  });

  // wraper das subpaginas, determina o que está agrupado e o que não está (DROPZONE)
  interact('.board').dropzone({
    accept: '.subpage',
    overlap: 0.5,

    ondragenter: function (event) {
      const dropzoneElement = event.target;
      const targetElement = event.relatedTarget;
      
      // Apenas destaque se não for do mesmo board
      const targetBoardId = targetElement.getAttribute('data-board-id');
      const currentBoardId = dropzoneElement.getAttribute('data-board-id') || board.value.id;
      
      if (targetBoardId !== currentBoardId) {
        dropzoneElement.classList.add('highlight');
        dropzoneElement.querySelector('.abas').classList.add('highlight');
      }
    },
    ondragleave: function (event) {
      event.target.classList.remove('highlight');
      const abas = event.target.querySelector('.abas');
      if (abas) abas.classList.remove('highlight');
    },
    ondrop: function (event) {
      event.target.classList.remove('highlight');
      const abas = event.target.querySelector('.abas');
      if (abas) abas.classList.remove('highlight');
      
      const draggedElement = event.relatedTarget;
      const sourceBoardId = draggedElement.getAttribute('data-board-id');
      const sourceIndex = parseInt(draggedElement.getAttribute('data-index'));
      const targetBoardId = board.value.id;
      
      // Se a origem é diferente do destino, fazer attach
      if (sourceBoardId !== targetBoardId) {
        attachSubpagina(sourceBoardId, sourceIndex, targetBoardId);
      }
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
    }
  });

  // move cada aba individualmente (DRAGGABLE)
  interact('.subpage')
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          endOnly: true
        })
      ],
      autoScroll: true,

      listeners: {
        start(event) {
          const element = event.target;
          draggingSubpagina.value = element;
          draggingSubpaginaIndex.value = parseInt(element.getAttribute('data-index'));
          
          // Marcar visualmente a aba sendo arrastada
          element.classList.add('dragging');
        },
        move(event) {
          const scale = props.scale?.getScale?.() || 1;
          const target = event.target;

          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale;
          let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale;

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          target.style.transform = `translate(${x}px, ${y}px)`;

          // Verificar se está fora do board atual (para possível detach)
          const boardRect = draggable.value.getBoundingClientRect();
          const subpageRect = target.getBoundingClientRect();
          
          // Se a distância for grande, podemos considerar um "detach"
          const outOfBounds = 
            subpageRect.top > boardRect.bottom || 
            subpageRect.bottom < boardRect.top || 
            subpageRect.left > boardRect.right || 
            subpageRect.right < boardRect.left;
          
          target.setAttribute('data-out-of-bounds', outOfBounds);
        },
        end(event) {
          const target = event.target;
          target.classList.remove('dragging');
          
          // Resetar a posição visual da aba
          target.style.transform = '';
          target.removeAttribute('data-x');
          target.removeAttribute('data-y');
          
          // Verificar se está fora do board para fazer detach
          const outOfBounds = target.getAttribute('data-out-of-bounds') === 'true';
          const index = parseInt(target.getAttribute('data-index'));
          
          if (outOfBounds && board.value.subpaginas.length > 1) {
            // Calcular posição para o novo board
            const scale = props.scale?.getScale?.() || 1;
            const mouseX = event.clientX / scale;
            const mouseY = event.clientY / scale;
            
            detachSubpagina(index, { 
              x: mouseX - 100, // Ajuste para centralizar
              y: mouseY - 50   // Ajuste para centralizar
            });
          } else {
            // Se não estiver fora, podemos reorganizar a ordem das abas
            // (isso seria um código adicional para reordenar as abas no mesmo board)
          }
          
          // Limpar referências
          draggingSubpagina.value = null;
          draggingSubpaginaIndex.value = null;
        }
      }
    });
});

// FUNÇÕES
function detachSubpagina(index, newPosition) {
  // Obter a subpágina a ser destacada
  const subpaginaToDetach = board.value.subpaginas[index];
  
  // Verificar se há mais de uma subpágina antes de destacar
  if (board.value.subpaginas.length <= 1) {
    console.warn('Não é possível destacar a única subpágina do board.');
    return;
  }
  
  // Remover a subpágina do board atual
  board.value.subpaginas.splice(index, 1);
  
  // Ajustar o índice ativo se necessário
  if (board.value.subpaginaAtiva >= board.value.subpaginas.length) {
    board.value.subpaginaAtiva = Math.max(0, board.value.subpaginas.length - 1);
  }
  
  // Criar um novo board com a subpágina destacada
  const newBoardId = $cms('id') + '-' + Date.now(); // Gerar ID único
  const newBoard = {
    nome: subpaginaToDetach.nome,
    id: newBoardId,
    posicao: newPosition || { x: position.x + 500, y: position.y },
    subpaginas: [subpaginaToDetach],
    subpaginaAtiva: 0
  };
  
  // Adicionar o novo board à store
  paginaStore.addBoard(newBoard);
  
  // Atualizar a visualização
  nextTick(() => {
    // Pode ser necessário inicializar o novo board de alguma forma específica
  });
}

function attachSubpagina(sourceBoardId, sourceIndex, targetBoardId) {
  // Encontrar os boards de origem e destino
  const sourceBoard = paginaStore.boards.find(b => b.id === sourceBoardId);
  const targetBoard = paginaStore.boards.find(b => b.id === targetBoardId);
  
  if (!sourceBoard || !targetBoard) {
    console.error('Board de origem ou destino não encontrado');
    return;
  }
  
  // Verificar se existe apenas uma subpágina no board de origem
  if (sourceBoard.subpaginas.length <= 1) {
    // Neste caso, precisamos mover o board inteiro ou mesclá-lo
    const subpagina = sourceBoard.subpaginas[0];
    
    // Adicionar a subpágina ao board de destino
    targetBoard.subpaginas.push(subpagina);
    
    // Remover o board de origem (já que ficaria vazio)
    paginaStore.removeBoard(sourceBoardId);
  } else {
    // Neste caso, apenas movemos a subpágina
    const subpagina = sourceBoard.subpaginas[sourceIndex];
    
    // Remover a subpágina do board de origem
    sourceBoard.subpaginas.splice(sourceIndex, 1);
    
    // Ajustar o índice ativo do board de origem se necessário
    if (sourceBoard.subpaginaAtiva >= sourceBoard.subpaginas.length) {
      sourceBoard.subpaginaAtiva = Math.max(0, sourceBoard.subpaginas.length - 1);
    }
    
    // Adicionar a subpágina ao board de destino
    targetBoard.subpaginas.push(subpagina);
  }
}

function adicionarLinha() {
  let linha = criarElemento("Linha");
  board.value.subpaginas[board.value.subpaginaAtiva].filhos.push(linha);
}
// FUNÇÕES
</script>

<style lang="scss" scoped>
.board {
  background: #b6b6b6c0;
  height: auto;
  min-height: 700px;
  width: 1400px;
  border: 2px #aeaeaec0 solid;
  border-radius: 15px;
  position: absolute;
}

.abas {
  width: 100%;
  border-radius: 12px 12px 0px 0px;
}

.abaWrap {
  width: 95%;
}

.flutuante {
  top: 0;
  left: 0;
  position: absolute;
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

.subpage:hover {
  cursor: grab !important;
}

.subpage {
  background-color: rgb(0, 0, 0);

  &:first-child {
    border-radius: 15px 0px 0px 0px;
  }
  
  &.dragging {
    opacity: 0.8;
    z-index: 1000;
  }
}

.nomeSubPagina {
  background-color: black;
  border-radius: 15px 0px 0px 0px;
  padding: 12px;
}

.borderRadius {
  border-radius: 15px 15px 0px 0px;
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