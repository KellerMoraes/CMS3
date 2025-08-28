<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-expansion-panels>
      <v-expansion-panel :value="1">
        <v-expansion-panel-title style="min-height: 50px;">
          <h3>Configuração</h3>
      </v-expansion-panel-title>
      <v-card class="pa-2 pb-5">
       <v-text-field label="Nome" variant="outlined" v-model="ferramentaStore.itemSelecionado.sp.nome">
       </v-text-field>
      </v-card>
      <v-card class="pa-2 pb-5">
       Imagem:
      </v-card>
      <v-card class="pa-2 pb-5">
       Visibilidade:
      </v-card>
  </v-expansion-panel>
    </v-expansion-panels>
    <!-- <MenuConfigComponentesCampoTexto v-if="ferramentaStore.itemSelecionado.nome == 'CampoTexto'"></MenuConfigComponentesCampoTexto> -->
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta.js';
    import { useEditorStore } from '@/stores/editor.js';
import { $cms } from '@/helpers/cmsProviderHelper';
    let editorStore = useEditorStore()
    let ferramentaStore = useFerramentaStore()
    watch(() => ferramentaStore.itemSelecionado.sp.nome, (novoNome) => {
  const board = editorStore.canvas.boards.find(p => p[$cms('id')] === ferramentaStore.itemSelecionado.boardId)
  const subpaginaOriginal = board.subpaginas.find(p => p[$cms('id')] === ferramentaStore.itemSelecionado.sp.id)
  console.log(subpaginaOriginal)
  if (subpaginaOriginal) {
    subpaginaOriginal.nome = novoNome;
  }
});
  </script>