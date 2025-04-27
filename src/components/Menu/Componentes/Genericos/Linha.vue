<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <Draggable style="position: relative; transition: all 0.2s ease-out;" :list="dados.filhos" :style="geraEstilos(dados)"
    :class="`linha ${ferramentaStore?.itemSelecionado[idKey] == dados[idKey] ? 'ativo' : ''} `" tag="VRow"
    :item-key="idKey" :group="{ name: 'colunas' }" @click.ctrl.exact="selecionarLinha(dados)"
    @click.self.exact="selecionarLinha(dados)" @end="itemMoved" @udpdate="itemSort($event,path)" @remove="itemRemove($event,path)" @add="itemAdd($event,path)">
    <template #item="{ element, index }">
      <component :is="'Comp' + element.nome" v-model="dados.filhos[index]"
        :path='[...path, { tipo: element.tipo, index, id: element[idKey] }]' 
        :estrutura="dados[$cms('structure')]"
        />
    </template>
  </Draggable>
</template>

<script setup>

import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { defineModel } from 'vue';
import useCms from '@/composables/useCms';
// Command-pattern imports 
import { itemAdd, itemRemove, itemSort, itemMoved } from "@/command/command";
// Command-pattern imports 


// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
const props = defineProps({
  path: {
    type: Array,
    required: true
  }
})
let dados = defineModel()
const ferramentaStore = useFerramentaStore()
function selecionarLinha(elemento) {
  ferramentaStore.selecionarLinha(elemento)
}

function geraEstilos(dados) {
  let atributos = dados.atributos
  let estiloCSS = '';
  for (let indexEstilo in atributos.estilo) {
    if (indexEstilo == 'background') {
      // gambiarra para tornar possivel a excução do visual
      dados.filhos.forEach((coluna) => {
        coluna.atributos.estilo['background'] = atributos.estilo[indexEstilo]
      })
    }
    else {
      estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo]}; `;
    }
  }
  return estiloCSS;

}

</script>
<style></style>
