<template>
     <!-- <v-app-bar
      flat
      color="#2e211a"
    >T
      Cabecalho
    </v-app-bar> -->
    <!-- <MenuConfiguracao></MenuConfiguracao> -->
    <v-toolbar
    style="z-index: 1005;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
    >
    <Ferramentas />
  </v-toolbar>
  <div>
    
    <MenuComponente />
  </div>
  <MenuConfiguracao />
    <main :class="pan ? 'panOn': '' " >
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
    <Draggable :style="pan ? 'pointer-events: none' : ''"
    :list="subpaginaAtiva.filhos"
    :item-key="this._cmsProps.id"
    class="v-container v-container--fluid pr-10"
    :group="{ name: 'linhas' }"
    >
    <template #item="{ element, index }">
      <component
      :is="'Comp'+element[_cmsProps.name]"
      :key="element[this._cmsProps.id]"
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
    </main>
  </template>
  
  <script setup>
  import Draggable from "vuedraggable";
  import { usePaginaStore } from '@/stores/pagina.js';
  import { computed, ref } from 'vue';
  import { Zoompinch } from '@/libs/zoompinch/index';
  import '@/libs/zoompinch/style.css';
  import { useRefHistory } from '@vueuse/core'
  
  const pan = ref(false)
  const zoompinchRef = ref();
  const transform = ref({
    x: 0,
    y: 0,
    scale: 0.1,
  });
  const tamanho = computed(()=>{
    return {
      largura: window.innerWidth,
      altura: window.innerHeight,
    }
  })
  let paginaStore = usePaginaStore();
  const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina } = paginaStore
  
  
  const { history,undo,redo } = useRefHistory(ref(subpaginaAtivaAtual), {deep: true})
  function adicionarLinha() {
    adicionarLinhaStore()
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
    margin-top: 8vh;
    margin-left: 5vw;
    padding: 1em;
  }
  .panOn:hover{
    cursor: grab;
  
  }
  </style>
