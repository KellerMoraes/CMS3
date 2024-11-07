<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-container>
        <!-- Linhas -->

        <component v-for="Linha in Linhas" :key="Linha[_cmsProps.id]" :is="componenteNome(Linha.nome)" :dados="Linha" ></component>
    </v-container>
    </template>
    
    <script setup>
   import { usePaginaStore } from "@/stores/pagina";
const paginaStore = usePaginaStore()
let Linhas = paginaStore.pagina.filhos[0].filhos
function componenteNome(nome){return defineAsyncComponent(() => import(`./${nome}.vue`))}
    
    </script>
    <style>
    </style>
    