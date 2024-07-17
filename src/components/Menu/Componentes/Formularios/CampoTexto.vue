<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BaseComponenteItem v-model="dados">
      <template
        v-if="dados"
        #edicao
      >
      <component :is="'Campo'+dados.atributos.definicoes.tipo" v-model="dados"></component>
      </template>
    </BaseComponenteItem>
  </template>
  <script setup>
  import { defineModel,ref } from 'vue';
import { useFerramentaStore } from '@/stores/ferramenta';
  const ferramentaStore = useFerramentaStore()
  let dados = defineModel()
  console.log(dados)
  </script>
  