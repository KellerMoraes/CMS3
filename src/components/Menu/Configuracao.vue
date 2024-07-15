<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-sheet
    style="position: fixed; right: 0%; bottom: 0%; transition: 0.2s; overflow-y: auto; z-index: 1000;"
    :width="'22vw'"
    height="80%"
  >
    <v-card
      style="transition: 0.5s; position: sticky; top: 0; z-index: 1000;"
      width="100%"
      append-icon="mdi-cog"
      class="mx-auto"
      rel="noopener"
      
      :subtitle="ferramentaStore.ferramentaSelecionada ? 'Configuração' : '' "
      :color="ferramentaStore.corBarra.cor"
      :rounded="0"
      :title="!paginaAtual.filhos ? ferramentaStore.ferramentaSelecionada ?? 'Configuração Inicial' : ferramentaStore.ferramentaSelecionada "
    >
      <v-divider />
      <v-spacer />
    </v-card>
    <v-sheet class="configuracoesComponentes" />
    <v-sheet>
      <MenuConfigCabecalho v-if="ferramentaStore.ferramentaSelecionada == 'Cabecalho'" />
      <MenuConfigLinha v-if="ferramentaStore.ferramentaSelecionada == 'Linha'" />
      <MenuConfigColuna v-if="ferramentaStore.ferramentaSelecionada == 'Coluna'" />
      <MenuConfigComponente v-if="ferramentaStore.ferramentaSelecionada == 'Componente'" />
      <!-- {{ ferramentaStore.itemSelecionado.atributos }} -->
    </v-sheet>
  </v-sheet>
</template>
<script setup>
// import Editor from '@tinymce/tinymce-vue'
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { usePaginaStore } from '@/stores/pagina.js';
import { useDisplay } from 'vuetify'
const { xxl } = useDisplay()
const ferramentaStore = useFerramentaStore()
const paginaStore = usePaginaStore()
const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,criarSubPagina,desfaz } = paginaStore

</script>