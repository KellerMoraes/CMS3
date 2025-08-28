<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel  v-for="(config, index) in ferramentaStore.itemSelecionado.configuracoes" :key="index" :value="index">
      <v-expansion-panel-title style="min-height: 50px;">
        <h4>{{config}}</h4>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="py-0">
      <component :is="'Config'+config"></component>
    </v-expansion-panel-text>
    </v-expansion-panel>

  </v-expansion-panels>
  <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado.nome == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
let ferramentaStore = useFerramentaStore()
const panel = ref([0])

</script>