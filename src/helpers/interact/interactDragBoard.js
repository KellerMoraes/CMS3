import interact from 'interactjs';
import { useEditorStore } from '@/stores/editor.js';
import { inject, onMounted,ref } from 'vue';
export function setupBoardDragging(el, positionRef, onMoveCallback) {
  const offX = ref(null)
  const offY = ref(null)
  const clientToCanvasCoordinates = inject('clientToCanvasCoordinates');
  const store = useEditorStore();
  interact(el).draggable({
    allowFrom: '.abas',
    inertia: false,
    autoScroll: true,
    modifiers: [
      interact.modifiers.restrict({
        restriction: '.abaWrap',
        endOnly: false,
        elementRect: { top: 3, left: 0, bottom: 3, right: 1 }
      })
    ],

    onstart(e) {
      const rect = el.getBoundingClientRect();
      const scale = store.canvas.scale;
    },
    
    onmove(e) {
      const el = e.target;
      // const x = (parseFloat(el.getAttribute('data-x')) || 0) + e.dx / scale;
      // const y = (parseFloat(el.getAttribute('data-y')) || 0) + e.dy / scale;
      const { x, y } = clientToCanvasCoordinates(e.client.x, e.client.y, store.canvas.scale);

      // console.log(e)
      positionRef.x = x - offX.value;
      positionRef.y = y - offY.value;
      el.setAttribute('data-x', positionRef.x);
      el.setAttribute('data-y', positionRef.y);
        onMoveCallback?.({ x, y });
    }
  }).on('down', function (event) {
    offX.value = event.offsetX
    offY.value = event.offsetY
  });
}
