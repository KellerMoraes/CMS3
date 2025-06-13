import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';

export function setupTabGroup(el) {
  const store = useEditorStore();

  interact(el).dropzone({
    accept: '.subpage, .board',

    ondragenter: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").style.opacity = 0
        document.getElementById(e.relatedTarget.id).style.opacity = 1
      }
      
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.add('drop-target');
        e.relatedTarget.classList.add('can-drop');
        e.relatedTarget.classList.remove('can-drop-subpage');
      }
    },
    
    ondragleave: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").style.opacity = 1
      }
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.remove('drop-target');
        e.relatedTarget.classList.remove('can-drop');
      }
    },
    
    ondrop: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let subpageId = from.id;
      let toBoard = to.id;
      if(document.querySelector(".ghost")){
        document.querySelector(".ghost").remove()
      }
      if (fromBoard && toBoard && fromBoard !== toBoard) {
        store.moverSubpaginasEntreBoards(fromBoard, subpageId, toBoard);
      }
    },
    ondropdeactivate: e => {
      let from = e.relatedTarget
      let to = e.target
      if(e.relatedTarget.querySelectorAll(".subpage").length == 1){
        from = e.relatedTarget.querySelector(".subpage")
        if(!from.classList.contains("dragging")){
          return
        }
      }
      let fromBoard = from.getAttribute('data-board-id');
      let toBoard = to.id;
      if (fromBoard && toBoard && fromBoard !== toBoard) { 
        e.target.classList.remove('drop-active', 'drop-target');
      }
    }

  });
}
