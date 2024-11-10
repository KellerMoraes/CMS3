<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <h1
        :id="dados[this._cmsProps.id] ?? ''"
        @dblclick="habilitarEditavel(dados.conteudo)"
      >
        <BaseConteudoEditavel
          v-model:conteudo="dados.conteudo"
          v-model:editavel="editavel"
        />
      </h1>
    </template>
    <template
      v-else
      #visualizacao
    >
      <!-- componente que será mostrado na lista de adição -->
      <h1 :id="''">
        Titulo 1
      </h1>
    </template>
  </BaseComponenteItem>
</template>
<script setup>
import { useEditorStore } from '@/stores/editor.js';
import { defineModel,ref } from 'vue';
let dados = defineModel()
let editavel = ref(false)
const editorStore = useEditorStore()
function habilitarEditavel(valor) {
      editavel.value = true
      editorStore.campoSelecionado = valor
    }
</script>
