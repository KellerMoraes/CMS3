<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Draggable
    style="position: relative; transition: all 0.2s ease-out;"
    :list="dados.filhos"
    :class="`v-row linha ${ ferramentaStore.itemSelecionado.nomeTag == dados.nomeTag ? 'ativo' : '' } `" 
    :item-key="dados.nomeTag"
    :group="{ name: 'colunas' }"
    @click.ctrl.exact="selecionarLinha(dados)"
    @click.self.exact="selecionarLinha(dados)"
  >
    <template #item="{ element,index }">
      <component
        :is="Coluna"
        v-model="dados.filhos[index]"
        :estrutura="element.estrutura"
      />
    </template>
  </Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import Coluna from '@/components/Componentes/Genericos/Coluna.vue';
import { defineModel } from 'vue';
let dados = defineModel()

const ferramentaStore = useFerramentaStore()
  function selecionarLinha(elemento) {
    ferramentaStore.selecionarLinha(elemento)
  }
  // function geraEstilos(dados) {
  //   ferramentaStore.itemSelecionado?.filhos?.forEach((coluna) => {
  //     console.log(coluna)
  //     coluna.atributos.cor.valor = dados.atributos?.cor?.valor ?? ''
  //    })
  // }


</script>
<style>
</style>
