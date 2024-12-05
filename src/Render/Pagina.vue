<!-- eslint-disable vue/multi-word-component-names -->
<template>
        <!-- Linhas -->
             <component v-for="Linha in Linhas" :key="Linha[this._cmsProps.id]" :is="componenteNome(Linha.nome)" :dados="Linha" ></component>
            
    </template>
    
    <script setup>
   import { usePaginaStore } from "@/stores/pagina";
const paginaStore = usePaginaStore()
let Linhas = paginaStore.pagina.filhos[0].filhos
function componenteNome(nome){return defineAsyncComponent(() => import(`./${nome}.vue`))}
    
    </script>
    <style>
    </style>
    