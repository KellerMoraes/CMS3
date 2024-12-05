<template>
    <!-- <v-app-bar
     flat
     color="#2e211a"
   >T
     Cabecalho
   </v-app-bar> -->
   <!-- <MenuConfiguracao></MenuConfiguracao> -->
   <v-toolbar
   style="z-index: 1005;border-bottom: 1px #e1e1e1 solid;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
   >
   <Ferramentas />
 </v-toolbar>
 <div>
   
   <MenuComponente />
 </div>
   <main style="display: flex; height: 93vh;" :class="pan ? 'panOn': '' " >
     <zoompinch
 ref="zoompinchRef"
 v-model:transform="transform"
 :width="tamanho.largura"
 :height="tamanho.altura"
 :offset="{ top: 10, right: 10, bottom: 10, left: 10 }"
 :min-scale="0.4"
 :max-scale="2.0"
 :bounds="false"
 :mouse="pan"
 wheel
 
 >
 <template #canvas>
   <div class="board">
    <div class="abas flutuante bg-grey-darken-3">

      <Draggable
      :list="pagina.filhos"
      item-key="id"
      tag="div"
      class="abaWrap"
      :group="{ name: 'abas' }"
      >
      <template #item="{ element , index}">
        <v-tab @click="paginaStore.MudarSubPaginaAtiva(index)" class="tab" :class="element.id == subpaginaAtiva.id ? 'selecionado': ''" >{{ element.nome + index }}</v-tab>
      </template>
    </Draggable>
  </div>

   <Draggable :style="pan ? 'pointer-events: none' : ''"
   :list="subpaginaAtiva.filhos"
   :item-key="_cmsProps.id"
   class="v-container v-container--fluid pr-10 containerSpace"
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
   <v-btn :style="pan ? 'pointer-events: none' : ''"
   location="bottom"
   class="mt-6 "
   icon="mdi-plus"
   @click.exact="adicionarLinha()"
   />
   <v-btn
   location="bottom"
   class="mt-6 ml-10 "
   icon="mdi-minus"
   @click.exact="refaz()"
   />
   </div>
 </template>
 <template v-slot:matrix="{ composePoint }">
   <svg xmlns="http://www.w3.org/2000/svg" @click="handleClickOnLayer">
     <!-- This circle will stick to the center of the canvas -->
     <circle :cx="composePoint(0.5, 0.5)[0]" :cy="composePoint(0.5, 0.5)[1]" r="5" style="opacity: 0;" />
   </svg>
 </template>
 </zoompinch>
 <MenuConfiguracao />
   </main>

 </template>
 
 <script setup>
 import Draggable from "vuedraggable";
 import { usePaginaStore } from '@/stores/pagina.js';
 import { computed, ref } from 'vue';
 import { Zoompinch } from '@/libs/zoompinch/index';
 import '@/libs/zoompinch/style.css';
 import { useRefHistory } from '@vueuse/core'
 import { VTabs } from 'vuetify/components/VTabs';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';

draggable.components = { ...draggable.components, VTabs };
 
 const pan = ref(false)
 const zoompinchRef = ref();
 const route = useRoute()
 const tab = ref(0)
 console.log(route.params.id)
 const transform = ref({
   x: 0,
   y: 0,
   scale: 0.1,
 });
 function teste(){
  console.log(tab.value)
 }
 const tamanho = computed(()=>{
   return {
     largura: window.innerWidth,
     altura: window.innerHeight,
   }
 })
 let paginaStore = usePaginaStore();
 const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = storeToRefs(paginaStore)
 
 
 const { history,undo,redo } = useRefHistory(ref(subpaginaAtivaAtual), {deep: true})
 function adicionarLinha() {
   paginaStore.adicionarLinhaStore()
   console.log(history)
 
 }
 function refaz(){
   undo()
   console.log(history)
 }
 
 onMounted(() => {
   document.addEventListener('keydown', handleKeyDown);
   document.addEventListener('keyup', handleKeyUp);
   
 });
 
 onUnmounted(() => {
   document.removeEventListener('keydown', handleKeyDown);
   document.removeEventListener('keyup', handleKeyUp);
 });
 function handleKeyDown(event) {
   if (event.code === 'Space') {
     pan.value = true;
   }
 }
 
 function handleKeyUp(event) {
   if (event.code === 'Space') {
     pan.value = false;
   }
 }
 
 function handleClickOnLayer(event) {
   const [x, y] = zoompinchRef.value?.normalizeMatrixCoordinates(event.clientX, event.clientY);
 }
 </script>
 
 <style scoped lang="scss">
 
 main {
   height: 100%;
   width: 100%;
 }
 
 .board {
   background: #b6b6b6c0;
   height: auto;
   min-height: 90vh;
   width: 71vw;
   border: 2px #aeaeaec0 solid;
   border-radius:15px ;
   margin-top: 15vh;
   margin-left: 5vw;
   position: relative;
   padding: 1em;
 }
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
 .abaWrap > .tab{
  height: 50px;
  &.selecionado{
    border-bottom: white 1px solid
  }
 }
 .flutuante{
  top: 0;
  left: 0;
  position: absolute;
 }
 .containerSpace{
  padding-top: 80px;
 }
 .panOn:hover{
   cursor: grab;
 
 }
 </style>
