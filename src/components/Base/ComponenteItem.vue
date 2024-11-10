<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div 
    @click.self.exact="dados ? selecionarComponente() : ''"  
    :style="dados ? ferramentaStore.itemSelecionado[this._cmsProps.id] == dados[this._cmsProps.id] ? 'border: 4px pink solid; border-top: 12px pink solid' : '' : ''"  
    class="componente-item"
  >
    <slot name="edicao" />
  </div>
</template>

<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { defineModel} from 'vue';
let dados = defineModel()
// let visibilidade = desabilitado == true ? "componente-desabilitado" : ""
const ferramentaStore = useFerramentaStore()
  function selecionarComponente() {
    ferramentaStore.selecionarComponente(dados.value)
  }
    



</script>