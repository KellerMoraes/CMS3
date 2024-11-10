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
    :class="`${ferramentaStore.itemSelecionado[this._cmsProps.id] == dados[this._cmsProps.id] ? 'ativa' : ''}`"
    :item-key="this._cmsProps.id"
    :group="{ name: 'celulas' }"
  >
    <template #item="{ element,index}">
      <BaseGridCell v-if="element" :key="element[this._cmsProps.id]" v-model="dados.filhos[index]" ></BaseGridCell>
    </template>
  </Draggable>
  <div style="position: absolute; top: 1%;" :style="ferramentaStore.celulasSelecionadas.length > 1 ? 'display: block': 'display: none'"><v-btn @click="ferramentaStore.combinarCelulas()">Merge</v-btn></div>
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
  console.log("cet")
  // tentar ajustar isso aqui para que cada celula tenha o seu tamanho definido e reflita no pai para determinar o tamanho do grid??
  let row = ""
  let col = ""
  let qtdRows = dados.value.atributos.definicoes.grid[0]
  let qtdCols = dados.value.atributos.definicoes.grid[1]
  for(let x = 0; x < qtdRows; x++){
    row += `${dados.value.filhos[x]?.estrutura}fr `
    // HORIZONTAL(LINHA)
  }
  for(let y = 0; y < qtdCols; y++){
    col += `${dados.value.filhos[y]?.estrutura}fr `
    // VERTICAL(COLUNA)
  }

  // const rows = Array(dados.value.atributos.definicoes.grid[0]).fill('1fr').join(' ');
  //   const columns = Array(dados.value.atributos.definicoes.grid[1]).fill('1fr').join(' ');
    return {
      display: 'grid',
      gridTemplateRows: row,
      gridTemplateColumns: col,
      height: '200px',
      gap: '5px',
      padding: '8px'

    };
  });
</script>
