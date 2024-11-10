<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BaseComponenteItem v-model="dados">
      <template
        v-if="dados"
        #edicao
      >
        <v-btn
          :id="dados[this._cmsProps.id] ?? ''"
          :variant="dados.atributos?.definicoes?.variante ?? 'outlined'"
          :type="dados.atributos?.definicoes?.tipo ?? ''"
          @dblclick="habilitarEditavel(dados.conteudo)"
        >
          <BaseConteudoEditavel
            v-model:conteudo="dados.conteudo"
            v-model:editavel="editavel"
          />
        </v-btn>
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
  