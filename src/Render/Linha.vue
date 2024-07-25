<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row :style="geraEstilos()" class="linha">
    <component v-for="dado in dados.filhos" :key="dado.nomeTag" :is="componenteNome(dado.nome)" v-model="infoModel" :dados="dado" ></component>
  </v-row>
  </template>
  
  <script setup>
  const props = defineProps(['dados'])
  const infoModel = defineModel()
    function geraEstilos() {
      let dados = props.dados
      let atributos = dados.atributos
      let estiloCSS = '';
        for (let indexEstilo in atributos.estilo) {
              estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
        }
        return estiloCSS;
      
      }
      function componenteNome(nome){return defineAsyncComponent(() => import(`./${nome}.vue`))}
  
  </script>
  <style>
  </style>
  