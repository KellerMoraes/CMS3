<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels>

    <component :is="'Config'+config" v-for="config in ferramentaStore.itemSelecionado.configuracoes" :key="config"></component>
  </v-expansion-panels>
  <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado[_cmsProps.name] == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
let ferramentaStore = useFerramentaStore()
</script>