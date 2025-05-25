<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="overflow: auto;">
    <v-layout style="height: calc(100vh - 65px); overflow-y: auto">
      <v-app-bar class="px-4"
        :color="ferramentaStore.corSelecionada"
      >
        <v-app-bar-title> {{ !paginaAtual.filhos ? ferramentaStore.tipoSelecionado ?? 'Configuração Inicial' : ferramentaStore.tipoSelecionado }} </v-app-bar-title>
      </v-app-bar>

      <v-main>
        <v-container fluid>
    <MenuConfigCabecalho v-if="ferramentaStore.tipoSelecionado == 'Cabecalho'" />
    <MenuConfigLinha v-if="ferramentaStore.tipoSelecionado == 'Linha'" />
    <MenuConfigColuna v-if="ferramentaStore.tipoSelecionado == 'Coluna'" />
    <MenuConfigComponente v-if="ferramentaStore.tipoSelecionado == 'Componente'" />

        </v-container>
      </v-main>
    </v-layout>

    <!-- <v-sheet
    style="transition: 0.2s;border-left: 1px #ededed solid; overflow-y: auto; z-index: 1000;"
    :width="'30vw'"
    >
    <v-card
    style="transition: 0.5s; position: sticky; top: 0; z-index: 1000;"
    width="100%"
    flat
    class="mx-auto"
    rel="noopener"
    
    :subtitle="ferramentaStore.tipoSelecionado ? 'Configuração' : '' "
    :color="ferramentaStore.corSelecionada"
    :rounded="0"
    >
    <v-spacer />
  </v-card>
  <v-sheet class="configuracoesComponentes" />
  <v-sheet>
    <MenuConfigCabecalho v-if="ferramentaStore.tipoSelecionado == 'Cabecalho'" />
    <MenuConfigLinha v-if="ferramentaStore.tipoSelecionado == 'Linha'" />
    <MenuConfigColuna v-if="ferramentaStore.tipoSelecionado == 'Coluna'" />
    <MenuConfigComponente v-if="ferramentaStore.tipoSelecionado == 'Componente'" />
  </v-sheet>
</v-sheet> -->
</div>
</template>
<script setup>
// import { Splitpanes, Pane } from 'splitpanes'
// import 'splitpanes/dist/splitpanes.css'
// import Editor from '@tinymce/tinymce-vue'
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { usePaginaStore } from '@/stores/pagina.js';
import { useDisplay } from 'vuetify'
const { xxl } = useDisplay()
const ferramentaStore = useFerramentaStore()
const paginaStore = usePaginaStore()
const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,desfaz } = paginaStore

</script>