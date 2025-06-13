import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { inject, onMounted, ref } from 'vue';

export function setupTabDragging(selector) {
  const clientToCanvasCoordinates = inject('clientToCanvasCoordinates');
  const editorStore = useEditorStore();
  
  // Estado de arrastar
  const dragState = ref({
    offset: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    direction: null,
    lastX: 0,
    elementData: {},
    shouldDetach: false,
    draggingWholeBoard: false,
    currentBoard: null
  });

  /**
   * Atualiza a ordem das subpáginas no board após arrastar
   */
  function updateBoardSubpagesOrder(event) {
    const boardId = event.target.dataset.boardId;
    const board = editorStore.canvas.boards.find(b => b.id === boardId);
    
    if (!board) return;
    
    const boardElement = document.getElementById(boardId);
    if (!boardElement) return;
    
    // Obter subpáginas ordenadas pelo índice no DOM
    const domSubpages = Array.from(boardElement.querySelectorAll('.subpage'))
      .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
    
    // Montar nova ordem baseada nas subpáginas do DOM
    board.subpaginas = domSubpages.map(domEl => 
      board.subpaginas.find(s => s.id === domEl.id)
    );
    
    // Limpar estilos de arrastar
    event.target.classList.remove("dragging");
    boardElement.querySelectorAll(".subpage").forEach(sub => {
      sub.style.transition = "";
      sub.style.transform = "";
      sub.removeAttribute("data-x");
      sub.removeAttribute("data-y");
    });
  }

  /**
   * Gerencia a troca de posição entre as abas durante o arrasto
   */
  function handleSwapping(event) {
    const scale = editorStore.canvas.scale;
    const target = event.target;
    
    // Restaurar pointer events
    target.style.pointerEvents = 'auto';
    
    // Determinar direção do arrasto
    if (event.clientX > dragState.value.lastX) {
      dragState.value.direction = 'right';
    } else if (event.clientX < dragState.value.lastX) {
      dragState.value.direction = 'left';
    }
    dragState.value.lastX = event.clientX;
    
    // Coletar informações sobre todas as subpáginas do board
    const boardElement = target.closest(".board");
    const subPagesBoard = [];
    
    boardElement.querySelectorAll(".subpage").forEach((sub) => {
      const rect = sub.getBoundingClientRect();
      subPagesBoard.push({
        id: sub.id,
        index: parseInt(sub.dataset.index),
        start: rect.left,
        end: rect.right,
        width: rect.width,
        middle: (rect.left + rect.right) / 2,
        element: sub
      });
    });
    
    subPagesBoard.sort((a, b) => a.index - b.index);
    
    // Ajustar posição considerando a escala
    dragState.value.position.x += event.dx / scale;
    dragState.value.position.y += event.dy / scale;
    
    // Ajustar o offset central para movimento mais natural
    const rect = target.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const centerOffsetX = (event.client.x - itemCenterX) / scale;
    
    // Aplicar transformação
    target.setAttribute('data-x', dragState.value.position.x);
    target.setAttribute('data-y', dragState.value.position.y);
    target.style.transform = `translateX(${dragState.value.position.x}px)`;
    
    // Encontrar subpágina sendo arrastada
    const draggingSub = subPagesBoard.find((sub) => sub.id === target.id);
    if (!draggingSub) return;
    
    // Determinar subpágina alvo para troca
    let targetSub = null;
    const currentIndex = parseInt(draggingSub.index);
    
    if (dragState.value.direction === 'left' && currentIndex > 0) {
      const prevSub = subPagesBoard.find(sub => sub.index === currentIndex - 1);
      if (prevSub && draggingSub.middle < prevSub.end) {
        targetSub = prevSub;
      }
    } else if (dragState.value.direction === 'right') {
      const nextSub = subPagesBoard.find(sub => sub.index === currentIndex + 1);
      if (nextSub && draggingSub.middle > nextSub.start) {
        targetSub = nextSub;
      }
    }
    
    // Executar a troca se tiver um alvo
    if (targetSub) {
      // Calcular distância do movimento ajustada pela escala
      const moveDistance = (dragState.value.direction === 'left' ? 
        draggingSub.width : -draggingSub.width) / scale;
      
      // Aplicar transformação no elemento alvo
      const targetEl = document.querySelector(`#${targetSub.id}`);
      targetEl.style.transition = "transform 0.3s";
      targetEl.style.transform = targetEl.style.transform !== "" ? 
        "" : `translateX(${moveDistance}px)`;
      
      // Trocar índices
      const draggedEl = document.querySelector(`#${draggingSub.id}`);
      const tempIndex = draggedEl.dataset.index;
      draggedEl.dataset.index = targetEl.dataset.index;
      targetEl.dataset.index = tempIndex;
      
      // Atualizar índices no estado
      draggingSub.index = parseInt(draggedEl.dataset.index);
      targetSub.index = parseInt(targetEl.dataset.index);
      
      // Gerenciar classe firstOf
      document.querySelectorAll(".subpage").forEach(sub => {
        sub.classList.remove("firstOf");
      });
      
      if (parseInt(draggedEl.dataset.index) === 0) {
        draggedEl.classList.add("firstOf");
      }
    }
  }

  /**
   * Prepara a aba para ser movida para outro local (desanexada)
   */
  function handleDetach(event) {
    const target = event.target;
    
    // Atualizar posição do ghost se existir
    const ghost = document.querySelector(".ghost");
    if (ghost) {
      ghost.style.transform = `translate(${dragState.value.elementData.offsetX}px, ${dragState.value.elementData.offsetY}px)`;
    }
    
    // Desabilitar interações e remover highlight
    target.style.pointerEvents = 'none';
    target.classList.remove("highlight");
  }

  // Configurar interação de arrastar
  interact(selector).draggable({
    inertia: false,
    modifiers: [interact.modifiers.restrict({ endOnly: false })],
    autoScroll: true,

    // Início do arrasto
    onstart(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentElement.getBoundingClientRect();
      const isOnlyChild = target.parentNode.children.length === 1;
      
      // Inicializar posição do arrasto
      dragState.value.position = {
        x: parseFloat(target.getAttribute('data-x')) || 0,
        y: parseFloat(target.getAttribute('data-y')) || 0
      };
      
      // Resetar estado do arrasto
      dragState.value.direction = null;
      dragState.value.lastX = event.clientX;
      dragState.value.shouldDetach = false;
      
      // Adicionar classe de arrastar
      target.classList.add("dragging");
      
      // Verificar se está arrastando o board inteiro
      if (isOnlyChild) {
        dragState.value.draggingWholeBoard = true;
        dragState.value.currentBoard = editorStore.canvas.boards.find(
          b => b.id === target.dataset.boardId
        );
      } else {
        dragState.value.draggingWholeBoard = false;
        
        // Salvar informações sobre o elemento e seu posicionamento
        dragState.value.elementData = {
          startX: rect.left,
          startY: rect.top,
          objWidth: rect.width,
          objHeight: rect.height,
          centerStartX: rect.left + rect.width / 2,
          centerStartY: rect.top + rect.height / 2,
          parentTop: parentRect.top,
          parentBottom: parentRect.bottom,
          parentLeft: parentRect.left,
          parentRight: parentRect.right,
          offsetX: 0,
          offsetY: 0
        };
        
        // Calcular offset central para movimentação mais precisa
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        const centerOffsetX = (event.client.x - itemCenterX);
        const centerOffsetY = (event.client.y - itemCenterY);
        
        dragState.value.position.x += centerOffsetX;
        dragState.value.position.y += centerOffsetY;
        
        // Aplicar transformação inicial
        target.setAttribute('data-x', dragState.value.position.x);
        target.setAttribute('data-y', dragState.value.position.y);
        target.style.transform = `translate(${dragState.value.position.x}px, ${dragState.value.position.y}px)`;
      }
      
      // Impedir seleção de texto durante arrasto
      document.body.style.userSelect = 'none';
    },

    // Movimento durante o arrasto
    onmove(event) {
      const target = event.target;
      const scale = editorStore.canvas.scale;
      
      // Tratar arrasto do board inteiro
      if (dragState.value.draggingWholeBoard && dragState.value.currentBoard) {
        const { x, y } = clientToCanvasCoordinates(
          event.client.x, 
          event.client.y, 
          scale
        );
        
        // Atualizar posição do board no canvas
        dragState.value.currentBoard.posicao.x = x - dragState.value.offset.x;
        dragState.value.currentBoard.posicao.y = y - dragState.value.offset.y;
        return;
      }
      
      // Calcular offset atual
      const offsetX = event.client.x - parseFloat(dragState.value.elementData.startX);
      const offsetY = event.client.y - parseFloat(dragState.value.elementData.startY);
      dragState.value.elementData.offsetX = offsetX;
      dragState.value.elementData.offsetY = offsetY;
      
      // Calcular posição atual do elemento
      const pTop = parseFloat(dragState.value.elementData.parentTop);
      const pLeft = parseFloat(dragState.value.elementData.parentLeft);
      const pRight = parseFloat(dragState.value.elementData.parentRight);
      const initialY = parseFloat(dragState.value.elementData.centerStartY);
      const initialX = parseFloat(dragState.value.elementData.centerStartX);
      const currentY = initialY + offsetY;
      const currentX = initialX + offsetX;
      
      // Determinar se deve desanexar baseado na posição
      dragState.value.shouldDetach = 
        currentY > pTop * 1.4 || 
        currentY < pTop || 
        currentX < pLeft * 1.1 || 
        currentX > pRight;
      
      // Executar ação apropriada
      if (dragState.value.shouldDetach) {
        handleDetach(event);
      } else {
        handleSwapping(event);
        
      }
    },

    // Fim do arrasto
    onend(event) {
      const target = event.target;
      
      // Finalizar o arrasto
      if (!dragState.value.shouldDetach) {
        updateBoardSubpagesOrder(event);
      }
      
      // Restaurar estilos
      target.style.opacity = '1';
      target.style.pointerEvents = 'auto';
      document.body.style.userSelect = '';
      
      // Limpar estado
      dragState.value.draggingWholeBoard = false;
      dragState.value.currentBoard = null;
    }
  })
  // Eventos de clique
  .on('up', function(event) {
    const subpage = event.target.closest(".subpage");
    const boardIndex = editorStore.canvas.boards.findIndex(
      b => b.id === subpage.dataset.boardId
    );
    
    // Ativar subpágina clicada
    if (boardIndex >= 0) {
      editorStore.canvas.boards[boardIndex].subpaginaAtiva = 
        parseFloat(subpage.dataset.index);
    }
  })
  .on('down', function(event) {
    const subpage = event.target.closest(".subpage");
    const boardIndex = editorStore.canvas.boards.findIndex(
      b => b.id === subpage.dataset.boardId
    );
    
    // Ativar subpágina clicada e registrar offset
    if (boardIndex >= 0) {
      editorStore.canvas.boards[boardIndex].subpaginaAtiva = 
        parseFloat(subpage.dataset.index);
      dragState.value.offset.x = event.offsetX;
      dragState.value.offset.y = event.offsetY;
    }
  });
}