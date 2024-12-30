<template>
  <div class="board" ref="draggable" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"  >    
    <div class="abas flutuante bg-grey-darken-3">
      <div class="abaWrap d-flex">
        <div :id="element[_cmsProps.id]" v-for="(element,index) in board.subpaginas" :key="element[_cmsProps.id]" @click="board.subPaginaAtiva = index" ref="subpagina" class="abaSubpages subpage mr-1 pa-3">
        <div>
          <span class="nomeSubPagina">
            {{ element.nome }}
          </span>
        </div>
        </div>
      </div>
      <!-- <v-tabs class="abaWrap"  slider-color="white"
      show-arrows >
        <v-tab @click="paginaStore.MudarSubPaginaAtiva(index)" v-for="(element,index) in board.subpaginas" :key="element[_cmsProps.id]" ref="subpagina" class="abaSubpages subpage" >
          {{ element.nome + index }}
        </v-tab>
      </v-tabs> -->
  </div>

   <Draggable
   :list="board.subpaginas[board.subpaginaAtiva].filhos"
   :item-key="_cmsProps.id"
   class="v-container v-container--fluid pr-10 containerSpace content"
   :group="{ name: 'linhas' }"
   >
   <template #item="{ element, index }">
     <component
     :is="'Comp'+element.nome"
     :key="element[_cmsProps.id]"
     v-model="board.subpaginas[board.subpaginaAtiva].filhos[index]"
     />
   </template>
   </Draggable>
   <v-btn
   location="bottom"
   class="mt-6 "
   icon="mdi-plus"
   @click.exact="adicionarLinha()"
   />
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import interact from "interactjs";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { usePaginaStore } from '@/stores/pagina.js';
import Draggable from "vuedraggable";
const board = defineModel()
const subpagina = ref(null)
let ferramentaStore = useFerramentaStore()
let paginaStore = usePaginaStore();
import { storeToRefs } from 'pinia';
import { ListaDeElementos } from "@/model/Elementos";
const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = storeToRefs(paginaStore)
const props = defineProps({
initialX: { type: Number, default: 0 },
initialY: { type: Number, default: 0 },
scale:{type: Object},
onMove: { type: Function, default: null },
});
const position = board.value.posicao
const draggable = ref(null);
function adicionarLinha() {
  let linha = new ListaDeElementos.Linha();
  board.value.subpaginas[board.value.subpaginaAtiva].filhos.push(linha)
 }
onMounted(() => {
// move o board livremente (DRAGGABLE)
interact(draggable.value).draggable({
  ignoreFrom: '.abaSubpages, .content', 
  inertia: {
resistance: 25,
minSpeed: 200,
endSpeed: 100
},
  autoScroll: true,
  modifiers: [
interact.modifiers.restrictRect({
  endOnly: true,
  restriction: '.canvas'
})
],
listeners: {
  move(event) {
    let scale = props.scale.getScale();
    // transform: `translate(${position.x}px, ${position.y}px)`
    // Calcula o ajuste para o deslocamento com base no scale
    const adjusted_dx = event.dx / scale;
    const adjusted_dy = event.dy / scale;
    
    // Aplica o deslocamento ajustado na posição
    position.x += adjusted_dx;
    position.y += adjusted_dy;
    draggable.value.style.translateX = position.x
    draggable.value.style.translateY = position.y

// Emite a posição atualizada para o componente pai (se necessário)
if (props.onMove) props.onMove(position.value);
  },
},
});

// wraper das subpaginas, determina o que está agrupado e o que não está (DROPZONE)
interact('.board').dropzone({
  accept: '.subpage',
  // overlap: 0.75,
  
  ondragenter: function (event) {
    var dropzoneElement = event.target
    var target = event.relatedTarget
    target.classList.remove("boardFace")
    target.classList.add("mx-1")
    target.classList.add("pa-3")
    target.childNodes[0].classList.remove("bg-grey-darken-3")
    target.childNodes[0].classList.remove("py-3")
    target.childNodes[0].classList.remove("mx-0")
    target.childNodes[0].classList.remove("borderRadius")
    dropzoneElement.childNodes[0].classList.add('highlight')
  },
  ondragleave: function (event) {
    event.target.classList.remove('highlight')
    event.target.childNodes[0].classList.remove('highlight')
  },
  ondrop: function (event) {
    event.target.classList.remove('highlight')
    event.target.childNodes[0].classList.remove('highlight')
  },
  ondropdeactivate: function (event) {
    event.target.classList.remove('drop-active')
  }
})
// move cada aba individualmente (DRAGGABLE)
interact('.subpage')
  .draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        endOnly: true
      })
    ],
    autoScroll: true,
    
    listeners: { move: dragMoveListener }
    
  })


  function dragMoveListener (event) {
  var target = event.target
  let scale = props.scale.getScale();

  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
});
</script>

<style lang="scss" scoped>
.board {
   background: #b6b6b6c0;
   height: auto;
   min-height: 700px;
   width: 1400px;
   border: 2px #aeaeaec0 solid;
   border-radius:15px ;
   position: relative;
 }
 
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
 .abaWrap{
  width: 95%;
 }
 .flutuante{
  top: 0;
  left: 0;
  position: absolute;
 }
 .containerSpace{
  padding-top: 80px;
 }
 .content{
  width: 97%;
 }
 .panOn:hover{
   cursor: grab;
 
 }
 .highlight{
  background: rgba(60, 122, 255, 0.699) !important;
  transition: 0.3s;
 }
 .subpage:hover{
  cursor: grab !important;
}
 .subpage{
  background-color: rgb(0, 0, 0);
  &:first-child{
   border-radius: 15px 0px 0px 0px;
  }
}
.nomeSubPagina{
  background-color: black;
  border-radius: 15px 0px 0px 0px;
   padding: 12px;
 }
 .borderRadius{
   border-radius: 15px 15px 0px 0px;
  }
  .boardFace{
    height: 700px;
    width: 1400px;
    background: #b6b6b6c0;
    border-radius: 15px ;
  border: 2px #aeaeaec0 solid; 
  position: absolute;
  z-index: 15000;

 }
 
 </style>