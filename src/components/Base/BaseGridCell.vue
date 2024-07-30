<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Draggable
    :list="dados.filhos"
    tag="div"
    style="transition: all 0.3s ease-out;"
    :class="`${ferramentaStore.itemSelecionado.nomeTag == dados.nomeTag ? 'ativa' : ''}`"
    class="grid-cell-comp"
    :item-key="dados.nomeTag"
    :group="{ name: 'componentes' }"
    @click.exact="selecionarCelula(dados)"
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
  import { useFerramentaStore } from '@/stores/ferramenta';
  import Draggable from "vuedraggable";
  const ferramentaStore = useFerramentaStore()
  let dados = defineModel()
  function selecionarCelula(valor){
    console.log(valor)
  }
  
  </script>
  <style lang="scss" scoped>
    .grid-cell-comp{
        width: 100%;
        background-color: grey;
      }
      .grid-cell-comp > .componente-item:hover{
        border: 4px #7e303d solid !important;
        border-top: 12px #7e303d solid !important;

      }
      
</style>