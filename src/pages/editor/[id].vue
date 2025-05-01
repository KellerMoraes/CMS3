<template>
   <v-toolbar
   style="z-index: 1005;border-bottom: 1px #e1e1e1 solid;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
   >
   <Ferramentas />
 </v-toolbar>
   <div>
     
     <MenuComponente />
    </div>
  <Splitpanes @resize="disableTextSelection" @splitter-dblclick="tamanhoBarraConfig = tamanhoMaximoBarraConfig" @resized="enableTextSelection" :class="{'default-theme': true, 'telasDivisao': true, 'hovering-config': isHoveringConfig}">
    <Pane min-size="70" size="75" max-size="80">
      <BaseCanvas></BaseCanvas>
      <!-- Conteúdo principal -->
    </Pane>
    <Pane min-size="20" :size="tamanhoBarraConfig" :max-size="tamanhoMaximoBarraConfig">
      <MenuConfiguracao  />
      <!-- Seu painel configurador -->
    </Pane>
  </Splitpanes>

 </template>
 
 <script setup>
 import { usePaginaStore } from '@/stores/pagina.js';
import useCms from '@/composables/useCms';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'


// VARIAVEIS TEMPLATE
const $cms = useCms();
// const idKey = $cms('id')
const tamanhoMaximoBarraConfig = ref(30)
const tamanhoBarraConfig = ref(25)

 let paginaStore = usePaginaStore();
 function disableTextSelection() {
  document.body.style.userSelect = 'none';
}

function enableTextSelection() {
  document.body.style.userSelect = '';
}

 
 </script>
 <style lang="scss">
/* .default-theme.splitpanes__splitter {background-color: #ccc;position: relative;} */
.splitpanes.default-theme .splitpanes__splitter:before, .splitpanes.default-theme .splitpanes__splitter:after{
  background-color: rgb(194, 194, 194);
}
.splitpanes.default-theme .splitpanes__splitter{
  transition: 0.5s;
  background-color: white;position: relative;
}
.default-theme.splitpanes--vertical>.splitpanes__splitter, .default-theme .splitpanes--vertical>.splitpanes__splitter{
  width: 10px;
  border-left: none;
}
.splitpanes.default-theme .splitpanes__splitter:hover{
  transition: 0.5s;
  background-color: #313131;position: relative;
}
.splitpanes.default-theme .splitpanes__splitter:hover:before, .splitpanes.default-theme .splitpanes__splitter:hover:after{
  background-color: white;
}
    </style>
 
 <style scoped lang="scss">
 .viewport-container{
  width: 85vw;
 }
 main {
   height: 100%;
   width: 100%;
 }
 
 .abas{
  width: 100%;
  border-radius: 12px 12px 0px 0px;
 }
 .abaSubpages{
  height: 50px;
  &.selecionado{
    border-bottom: white 1px solid
  }
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
 .panOn:hover{
   cursor: grab;
 
 }
 .highlight{
  background: rgba(60, 122, 255, 0.699) ;
  transition: 0.3s;
 }
 
 </style>
