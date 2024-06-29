<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
  <Draggable
    :list="dados.filhos"
    tag="div"
    style="transition: all 0.3s ease-out;"
    :class="`v-col cols-${dados.estrutura} coluna ${ferramentaStore.itemSelecionado.nomeTag == dados.nomeTag ? 'ativa' : ''}`"
    :style="geraEstilos(dados.atributos)"
    :item-key="dados.nomeTag"
    :group="{ name: 'componentes' }"
    @click.self.exact="selecionarColuna(dados)"
  >
    <template #item="{ element,index}">
      <component
        v-if="element"
        :is="'Comp'+element.nome"
        v-model="dados.filhos[index]"
        :key="element.nomeTag"
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
  function geraEstilos(estilos) {
    console.log(estilos)
    let estiloCSS = '';
      for (let estilo in estilos.estilo) {
        estiloCSS += `${estilo}: ${estilos.estilo[estilo]}; `;
        console.log(estiloCSS)
      }
      return estiloCSS;
    
    }
</script>

