import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { ref } from 'vue';

const ghost = ref(null);

function createGhost(el, e) {
  const scale = useEditorStore().canvas.scale;
  const parent = el.closest(".board");
  const rect = el.getBoundingClientRect();
  const rectP = parent.getBoundingClientRect();
  
  // Criar clone do elemento
  ghost.value = el.cloneNode(true);
  
  // Preparar cabeçalho do ghost
  const headGhost = parent.querySelector(".abas").cloneNode(true);
  headGhost.querySelectorAll(".subpage").forEach(subpage => {
    if (subpage.id !== el.id) {
      subpage.remove();
    } else {
      subpage.style.transform = "";
      subpage.style.height = "36px";
      subpage.classList.add("d-flex", "align-center");
    }
  });
  
  // Adicionar conteúdo ao ghost
  const contentGhost = parent.querySelector(".content").cloneNode(true);
  contentGhost.style.height = "100%";
  ghost.value.appendChild(headGhost);
  ghost.value.appendChild(contentGhost);
  
  // Estilizar o ghost
  Object.assign(ghost.value.style, {
    position: 'fixed',
    pointerEvents: 'none',
    opacity: 1,
    zIndex: 3,
    margin: 0,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rectP.width}px`, // Sem multiplicar por scale
    height: `${rectP.height}px`
  });
  
  ghost.value.classList.add('ghost', 'board');
  ghost.value.classList.remove('subpage');
  ghost.value.removeAttribute('id');
  
  document.body.appendChild(ghost.value);
  
  // Posicionar ghost conforme o evento
  if (e && ghost.value) {
  
    const offsetX = e.client.x - rect.left;
    const offsetY = e.client.y - rect.top;
    const moveX = (e.client.x - offsetX) / scale;
    const moveY = (e.client.y - offsetY) / scale;
    
    ghost.value.setAttribute('data-x', moveX);
    ghost.value.setAttribute('data-y', moveY);
  }
}

function sortBoardSubpages(e) {
  const store = useEditorStore();
  const board = store.canvas.boards.find(b => b.id === e.target.dataset.boardId);
  if (!board) return;
  
  const abaWrap = document.getElementById(e.target.dataset.boardId);
  if (!abaWrap) return;
  
  // Reordenar subpáginas
  const domSubpaginas = Array.from(abaWrap.querySelectorAll('.subpage'))
    .sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
    
  board.subpaginas = domSubpaginas.map(domEl => 
    board.subpaginas.find(s => s.id === domEl.id)
  );
  
  // Limpar estilos
  e.target.classList.remove("dragging");
  abaWrap.querySelectorAll(".subpage").forEach(sub => {
    sub.style.transition = "";
    sub.style.transform = "";
    sub.removeAttribute("data-x");
    sub.removeAttribute("data-y");
  });
}

export function setupCanvasDrop(el, clientToCanvasCoordinates) {
  const store = useEditorStore();

  interact(el).dropzone({
    accept: '.subpage',
    overlap: 0.2,
    
    ondragenter: e => {
      const from = e.relatedTarget.closest(".board");
      // Verificar se é o único elemento ou se o board está em arrasto
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      if (!document.querySelector(".ghost")) {
        createGhost(e.relatedTarget, e.dragEvent);
      }
      
      document.querySelector(".ghost").style.opacity = 1;
      document.getElementById(e.relatedTarget.id).style.opacity = 0;
      e.target.classList.add('drop-target');
    },
    
    ondragleave: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      e.target.classList.remove('drop-target');
      e.relatedTarget.classList.remove('can-drop');
    },
    
    ondrop: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      if (document.querySelector(".ghost")) {
        document.querySelector(".ghost").remove();
      }
      
      const { x, y } = clientToCanvasCoordinates(e.dragEvent.client.x, e.dragEvent.client.y);
      store.moverSubpaginasEntreBoards(
        e.relatedTarget.getAttribute('data-board-id'),
        e.relatedTarget.id,
        null,
        { x: x - 20, y: y - 20 }
      );
      
      sortBoardSubpages(e);
    },
    
    ondropdeactivate: e => {
      const from = e.relatedTarget.closest(".board");
      if (from.querySelectorAll(".subpage").length === 1 && !from.classList.contains("dragging")) {
        return;
      }
      
      e.target.classList.remove('drop-active', 'drop-target');
    }
  });
}