<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <Draggable
    :list="dados.filhos"
    tag="div"
    :style="gridStyle"
    :class="`${ferramentaStore.itemSelecionado.nomeTag == dados.nomeTag ? 'ativa' : ''}`"
    :item-key="dados.nomeTag"
    :group="{ name: 'celulas' }"
  >
    <template #item="{ element,index}">
      <BaseGridCell v-if="element" :key="element.nomeTag" v-model="dados.filhos[index]" ></BaseGridCell>
    </template>
  </Draggable>
    </template>
  </BaseComponenteItem>
</template>
<script setup>
import { defineModel,ref } from 'vue';
import { useFerramentaStore } from '@/stores/ferramenta';
import Draggable from "vuedraggable";

const ferramentaStore = useFerramentaStore()
let dados = defineModel()


const gridStyle = computed(() => {
  // tentar ajustar isso aqui para que cada celula tenha o seu tamanho definido e reflita no pai para determinar o tamanho do grid??
  let row = ""
  dados.value.filhos.forEach((celula)=>{
    row += celula.estrutura
  })
  const rows = Array(dados.value.atributos.definicoes.grid[0]).fill('1fr').join(' ');
    const columns = Array(dados.value.atributos.definicoes.grid[1]).fill('1fr').join(' ');
    return {
      display: 'grid',
      gridTemplateRows: rows,
      gridTemplateColumns: columns,
      height: '200px',
      gap: '5px',
      backgroundColor: 'teal'

    };
  });
</script>
