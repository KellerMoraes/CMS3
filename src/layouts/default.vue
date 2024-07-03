<template>
  <!-- <v-app-bar
    flat
    color="#2e211a"
  >
    Cabecalho
  </v-app-bar> -->
  <!-- <MenuConfiguracao></MenuConfiguracao> -->
  <v-toolbar
  style="z-index: 1005;  position: fixed; background-color:  rgb(var(--v-theme-surface));"
  >
  <Ferramentas />
</v-toolbar>
<div>
  
  <MenuComponente />
</div>
<MenuConfiguracao />
<router-view />

</template>

<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';

let ferramentaStore = useFerramentaStore()
</script>
<style scoped>
</style>
