<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div 
    @click.self.exact="dados ? selecionarComponente() : ''"    
    @click="dados ? selecionarComponente() : ''"    
    :class="{componenteItem: true, ativo: ferramentaStore.itemSelecionado?.[idKey] === dados[idKey]}"
  >
    <slot name="edicao" />
  </div>
</template>

<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { defineModel} from 'vue';
import useCms from '@/composables/useCms';
let dados = defineModel()
// let visibilidade = desabilitado == true ? "componente-desabilitado" : ""
const ferramentaStore = useFerramentaStore()
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
  function selecionarComponente() {
    ferramentaStore.selecionarComponente(dados.value)
  }
    



</script>