<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <v-text-field
        :variant="dados.atributos.definicoes.variante"
        v-model="infoModel[NomeCampo]"
        :rules="rules"
        :label="dados.atributos.definicoes.tipo"
      ></v-text-field>
  </template>
  <script setup>

  import { defineModel,ref } from 'vue';
  const props = defineProps(['dados'])
  const infoModel = defineModel()
  
  let NomeCampo = "Nome"
      const rules = [
        value => {
          if (value) return true

          return 'Você precisa digitar um Nome.'
        },
      ]
  </script>
  