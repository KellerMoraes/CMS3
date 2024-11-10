<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
    <v-col :style="geraEstilos()" :cols="dados.estrutura">
      <component v-for="dado in dados.filhos" :key="dado[this._cmsProps.id]" :is="componenteNome(dado[_cmsProps.name])" v-model="infoModel" :dados="dado" ></component>
    </v-col>
  </template>
  
  <script setup>
  const props = defineProps(['dados'])
  const infoModel = defineModel()
  function componenteNome(nome){return defineAsyncComponent(() => import(`./${nome}.vue`))}
    function geraEstilos() {
      let dados = props.dados
      console.log(dados)
      let atributos = dados.atributos
      let estiloCSS = '';
        for (let indexEstilo in atributos.estilo) {
          estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
        }
        return estiloCSS;
      
      }
  </script>
  
  