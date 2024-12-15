<template>
  <div class="board" ref="draggable" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"  >
      
    <!-- <v-icon class="d-flex justify-center" size="40">mdi-drag-horizontal</v-icon> -->
    
    <div class="abas flutuante bg-grey-darken-3">
      <v-tabs class="abaWrap"  slider-color="white"
      show-arrows >
        <v-tab @click="paginaStore.MudarSubPaginaAtiva(index)" v-for="(element,index) in filhos" :key="element[_cmsProps.id]" class="abaSubpages" >
          {{ element.nome + index }}
        </v-tab>
      </v-tabs>
  </div>

   <Draggable
   :list="subpaginaAtiva.filhos"
   :item-key="_cmsProps.id"
   class="v-container v-container--fluid pr-10 containerSpace content"
   :group="{ name: 'linhas' }"
   >
   <template #item="{ element, index }">
     <component
     :is="'Comp'+element.nome"
     :key="element[_cmsProps.id]"
     v-model="subpaginaAtiva.filhos[index]"
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
const filhos = defineModel()
let ferramentaStore = useFerramentaStore()
let paginaStore = usePaginaStore();
import { storeToRefs } from 'pinia';
const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = storeToRefs(paginaStore)
const props = defineProps({
initialX: { type: Number, default: 0 },
initialY: { type: Number, default: 0 },
scale:{type: Object},
onMove: { type: Function, default: null },
});

const position = ref({ x: props.initialX, y: props.initialY });
const draggable = ref(null);
function adicionarLinha() {
   paginaStore.adicionarLinhaStore()
   console.log(history)
 }
onMounted(() => {
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
    position.value.x += adjusted_dx;
    position.value.y += adjusted_dy;
    draggable.value.style.translateX = position.x
    draggable.value.style.translateY = position.y

// Emite a posição atualizada para o componente pai (se necessário)
if (props.onMove) props.onMove(position.value);
  },
},
});
});
</script>

<style lang="scss" scoped>
.board {
   background: #b6b6b6c0;
   height: auto;
   min-height: 90vh;
   width: 75vw;
   border: 2px #aeaeaec0 solid;
   border-radius:15px ;
   position: relative;
 }
 
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
//  .abaSubpages{
//   height: 50px;
//   &.selecionado{
//     border-bottom: white 1px solid
//   }
//  }
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
 
 </style>