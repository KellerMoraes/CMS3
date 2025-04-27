<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-sheet
    style="transition: 0.2s;border-left: 1px #ededed solid; margin-top: 65px; overflow-y: auto; z-index: 1000;"
    :width="'30vw'"
    height="100%"

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
      :title="!paginaAtual.filhos ? ferramentaStore.tipoSelecionado ?? 'Configuração Inicial' : ferramentaStore.tipoSelecionado "
    >
      <!-- <v-divider /> -->
      <v-spacer />
    </v-card>
    <v-sheet class="configuracoesComponentes" />
    <v-sheet>
      <MenuConfigCabecalho v-if="ferramentaStore.tipoSelecionado == 'Cabecalho'" />
      <MenuConfigLinha v-if="ferramentaStore.tipoSelecionado == 'Linha'" />
      <MenuConfigColuna v-if="ferramentaStore.tipoSelecionado == 'Coluna'" />
      <MenuConfigComponente v-if="ferramentaStore.tipoSelecionado == 'Componente'" />
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
const {pagina,subpaginaAtiva, paginaAtual,subpaginaAtivaAtual, adicionarLinhaStore,deletarLinha, MudarSubPaginaAtiva,desfaz } = paginaStore

</script>