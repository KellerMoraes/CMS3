<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    cet
  </div>
  <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado.nome == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
let ferramentaStore = useFerramentaStore()
</script>