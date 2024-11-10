<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <p
        :id="dados ? dados[this._cmsProps.id] : ''"
        @dblclick="habilitarEditavel(dados.conteudo)"
      >
        <BaseConteudoEditavel
          v-model:conteudo="dados.conteudo"
          v-model:editavel="editavel"
        />
      </p>
    </template>
    <template
      v-else
      #visualizacao
    >
      <!-- componente que será mostrado na lista de adição -->
      <p :id="''">
        Parágrafo de Texto
      </p>
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
