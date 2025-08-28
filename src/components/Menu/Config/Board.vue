<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels>
    <v-expansion-panel :value="1">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Posição</h3>
    </v-expansion-panel-title>
    <v-card class="pa-2 pb-5">
      <v-row class="d-flex justify-center">
        <v-col cols="1" class="px-2 d-flex justify-end align-center">
          X:
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-text-field type="number" hide-details="" variant="outlined" density="compact" width="100" v-model="ferramentaStore.itemSelecionado.posicao.x"></v-text-field>
        </v-col>
        <v-col cols="1" class="px-2 d-flex justify-end align-center">
          Y:
        </v-col>
        <v-col cols="4" class="pl-0">
          <v-text-field type="number" variant="outlined" hide-details="" density="compact" width="100" v-model="ferramentaStore.itemSelecionado.posicao.y"></v-text-field>

        </v-col>
      </v-row>
    </v-card>
</v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
  let ferramentaStore = useFerramentaStore()
</script>