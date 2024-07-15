<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BaseComponenteItem v-model="dados">
      <template
        v-if="dados"
        #edicao
      >
      <v-text-field
  :label="componenteDados.rotulo"
  :variant="componenteDados.variante"
  :density="componenteDados.densidade"
        v-model="ferramentaStore.formularioSelecionado.conteudo[dados.atributos.configuracoes.nomeCampo]"
        :rules="rules"
      ></v-text-field>
      </template>
    </BaseComponenteItem>
  </template>
  <script setup>
  import { defineModel,ref } from 'vue';
import { useFerramentaStore } from '@/stores/ferramenta';
  const ferramentaStore = useFerramentaStore()
  let dados = defineModel()
  const componenteDados = computed(()=>{return dados.value.atributos.configuracoes  })
  const firstName = ref("")
  const rules = [
        value => {
          if (value) return true

          return 'Você precisa digitar um Nome.'
        },
      ]
  </script>
  