<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
    <v-radio-group :style="gridStyle">
      <div v-if="dados.filhos" >
        <BaseGridCell 
        v-for="cell in (dados.filhos, index)" :key="cell" v-model="dados.filhos[index]" ></BaseGridCell>
      </div>
      </v-radio-group>
    </template>
  </BaseComponenteItem>
</template>
<script setup>
import { defineModel,ref } from 'vue';
import { useFerramentaStore } from '@/stores/ferramenta';
import Draggable from "vuedraggable";
import { ListaDeElementos } from '@/model/Elementos';
const ferramentaStore = useFerramentaStore()
let dados = defineModel()
let quantidadeCelulas = ref(dados.value.atributos.definicoes.grid[0] * dados.value.atributos.definicoes.grid[1])

for(let x = 1; x < dados.value.atributos.definicoes.grid[0] * dados.value.atributos.definicoes.grid[1]; x++){
  dados.value.filhos.push(new ListaDeElementos.Celula(dados.value.atributos.definicoes.grid[0]++))
}

const gridStyle = computed(() => {
  const rows = Array(dados.value.atributos.definicoes.grid[0]).fill('auto').join(' ');
    const columns = Array(dados.value.atributos.definicoes.grid[1]).fill('auto').join(' ');
    return {
      display: 'grid',
      gridTemplateRows: rows,
      gridTemplateColumns: columns,
    };
  });
</script>
