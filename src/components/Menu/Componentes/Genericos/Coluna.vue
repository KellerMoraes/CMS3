<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
  <Draggable
    :list="dados.filhos"
    tag="div"
    style="transition: all 0.3s ease-out;"
    :class="`v-col cols-${dados.estrutura} coluna ${ferramentaStore.itemSelecionado[this._cmsProps.id] == dados[this._cmsProps.id] ? 'ativa' : ''}`"
    :style="geraEstilos(dados)"
    :item-key="this._cmsProps.id"
    :group="{ name: 'componentes' }"
    @click.self.exact="selecionarColuna(dados)"
  >
    <template #item="{ element,index}">
      <component
        v-if="element"
        :is="'Comp'+element[_cmsProps.name]"
        v-model="dados.filhos[index]"
        :key="element[this._cmsProps.id]"
      />
    </template>
  </Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { defineModel } from 'vue';
let dados = defineModel()
const ferramentaStore = useFerramentaStore()
  function selecionarColuna(coluna) {
      ferramentaStore.selecionarColuna(coluna)
  }
  function geraEstilos(dados) {
    let atributos = dados.atributos
    let estiloCSS = '';
      for (let indexEstilo in atributos.estilo) {
        estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
      }
      return estiloCSS;
    
    }
</script>

