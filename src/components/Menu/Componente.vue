<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-click-outside="{
      handler: ()=>{ editorStore.recursoSelecionado = false },
      closeConditional: ()=>{return editorStore.recursoSelecionado !== false}
    }">
     <!-- MENU DOS COMPONENTES -->

  <v-navigation-drawer
  style="top: 65px; "
    v-model="drawer"
    permanent
    width="70"
  >
 <div style="height: 65px;" class="d-flex justify-center align-center">

      <v-icon color="primary" size="32">
        mdi-vector-square
      </v-icon>
  
    </div>

    <v-divider />
    <v-sheet width="100%" class="d-flex flex-column justify-center align-center py-2" >
     

        <v-btn v-for="recurso in recursos" @click="selecionar(recurso)"  :variant="recurso.Nome == editorStore.recursoSelecionado ? 'tonal' : 'plain'" size="43" :key="recurso.Nome">
          <v-icon size="30">
            {{ recurso.Icone }}
          </v-icon>
          
        </v-btn>
    </v-sheet>
  </v-navigation-drawer>
  <!-- MENU DOS COMPONENTES -->
  <!-- COMPONENTES DO MENU SELECIONADO -->
  <v-navigation-drawer
  style="top: 65px; "
    :width="xlAndUp ? 300 : 180"
    permanent
    
    v-model="editorStore.recursoSelecionado"
    
  >
  <div>

  <div class="d-flex justify-space-between align-center ma-2 mt-4 mb-4">

    <span class="titulo">{{ editorStore.recursoSelecionado.Nome  }}</span>
    <v-btn
    @click="fecharComponentes()"
    icon
    class="btnTitulo"
    variant="text"
    size="x-small"
    >
    <v-icon size="large">
      mdi-close
    </v-icon>
  </v-btn>
</div>
<div class="d-flex justify-space-between align-center ma-1 mx-2">

  <v-text-field 
  append-inner-icon="mdi-magnify"
  density="compact"
  label="Pesquisar"
  variant="outlined"
  hide-details
  single-line
  ></v-text-field>
</div>
<div v-for="elemento in editorStore.recursoSelecionado.Itens" :key="elemento.Nome"  class="mt-4">

  <span class="subtitulo">{{ elemento.Nome }}</span>
    <Draggable
    v-if="editorStore.opcaoComponenteSelecionado"
    :list="elemento.Componentes"
    class="listaDeComponentes v-sheet d-flex flex-wrap ma-2"
    tag="div"
    :clone="clonar"
    @end="teste"
    :sort="false"
    :item-key="idKey"
    :group="{ name: elemento.Grupo, pull: 'clone', put: false, }"
    >
    <template #item="{ element }">
          <v-card color="#f5f5f5" width="85px" height="105px" class="mx-1 my-1 ">
            <v-card-title class="text-center pb-0">
              <v-icon size="40">{{ element.icone }}</v-icon>
            </v-card-title>
            <v-card-text style="height: 28px;" class="pa-1">
              <div class="text-center">{{ element.nome }}</div>
            </v-card-text>
            <div class="d-flex justify-center">
              <v-icon size="32" class="d-flex justify-center" color="#d9d9d9">mdi-drag-horizontal</v-icon>
            </div>
          </v-card>
       
        </template>
      </Draggable>
</div>

  </div>
  
  </v-navigation-drawer>

</div>

</template>
<!-- COMPONENTES DO MENU SELECIONADO -->
<script setup>

import { ref } from "vue";
import Draggable from "vuedraggable";
import { useDisplay } from 'vuetify'
import { useEditorStore } from '@/stores/editor.js';
import _ from 'lodash'
import { Recursos } from "@/model/Recursos";
import { criarElemento } from "@/model/Elementos";
// VARIAVEIS TEMPLATE
import useCms from '@/composables/useCms';
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
let editorStore = useEditorStore()
const { xlAndUp } = useDisplay()
let drawer = ref(true)
let recursos = Recursos

function fecharComponentes() {
  editorStore.recursoSelecionado = false
}
function teste(e){
  console.log(e)
}
function clonar(item) {
  console.log(item)
  return criarElemento(item.nome)
  
}
function gerarId() {
    return Math.random().toString(36).slice(2);
}
function selecionar(recurso) {
  editorStore.selecionarRecurso(recurso)
  }

</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
.listaDeComponentes > div:first-child {
  margin: 10px;
  border-radius: 5px;
}
.listaDeComponentes .componente-item:hover{
    opacity: 0.7;
    cursor: pointer;
  }
.listaDeComponentes .v-card * :not(.v-icon) {
  font-size: 14px !important;
}
.titulo{
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
display: inline-block;
padding: 4px;
}
.btnTitulo{
  margin-top: 5px;
}
.subtitulo{
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: inline-block;
  
  margin-left: 10px;

}
</style>