<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <v-expansion-panel
        
        :value="3"
      >
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Tipo campo</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-select v-model="ferramentaStore.itemSelecionado.atributos.definicoes.tipo" :items="ferramentaStore.formularioSelecionado.tiposCampo">

          </v-select>

        </v-expansion-panel-text>
      </v-expansion-panel>
   <v-expansion-panel
        
        :value="4"
      >
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Estilo campo</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-select v-model="ferramentaStore.itemSelecionado.atributos.definicoes.variante" :items="estiloCampoOpcoes">

          </v-select>

        </v-expansion-panel-text>
      </v-expansion-panel>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta.js';
  let ferramentaStore = useFerramentaStore()

  // COLOCAR ISSO NA STORE PARA PODER COMPARTILHAR EM TODOS SE DEIXAR AS OPCOES PARA QUE CADA UM DEFINA SE TEM OU NÃO, NÃO VAI FUNCIONAR
  let tipoCampoOpcoes = ref(
  [
    "Nome",
    "CPF",
    "Telefone",
    "Email",
    "Descricao",


  ])
  
  let estiloCampoOpcoes = [
    "default",
    "outlined",
    "solo",
    "solo-filled",
    "solo-inverted",
    "underlined"


  ]
  
  </script>
  