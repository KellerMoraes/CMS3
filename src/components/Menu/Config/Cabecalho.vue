<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pa-3">
    <v-row>
      <div class="Titulos">
        Nome da Subpágina
      </div>
      <v-col
        cols="12"
        class="pb-0"
      >
        <v-text-field
          v-model="subpagina[_cmsProps.name]"
          placeholder="Nome"
          variant="outlined"
        />
      </v-col>
      <div class="Titulos">
        Visibilidade da Subpágina
      </div>
      <v-col
        cols="12"
        class="pb-2 d-flex justify-center"
      >
        <v-btn
          v-if="subpagina.atributos['visibilidade'].valor === 'none'"
          stacked
          seize="large"
          height="90"
          color="primary"
          variant="outlined"
          @click="subpagina.atributos['visibilidade'].valor = 'block'"
        >
          <v-icon
            size="large"
          >
            mdi-eye
          </v-icon> 
          Habilitar
        </v-btn>
        <v-btn
          v-else
          stacked
          seize="large"
          height="90"
          color="error"
          variant="outlined"
          @click="subpagina.atributos['visibilidade'].valor = 'none'"
        >
          <v-icon
          
            size="large"
          >
            mdi-eye-off
          </v-icon> 
          Desabilitar
        </v-btn>
      </v-col>
      <div class="Titulos">
        Imagem Cabeçalho
      </div>
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <v-btn
          variant="outlined"
          :color="paginaStore.pagina.atributos['imagem'].mostrar ? 'primary' : ''"
          :prepend-icon="paginaStore.pagina.atributos['imagem'].mostrar ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
          @click="paginaStore.pagina.atributos['imagem'].mostrar = !paginaStore.pagina.atributos['imagem'].mostrar"
        >
          Mostrar Imagem
        </v-btn>
      </v-col>
      
      <v-col
        v-if="paginaStore.pagina.atributos['imagem'].mostrar"
        md="12"
        cols="12"
      >
        <v-btn-group
          class="d-flex justify-center"
          divided
          variant="outlined"
          style="transition: 0.5s; height: 100%;"
        >
          <v-btn
            height="90"
            width="120"
            size="x-large"
            prepend-icon="mdi-monitor"
            :color="paginaStore.pagina.atributos['imagem'].desktop ? 'primary' : ''"
            stacked
            :variant="paginaStore.pagina.atributos['imagem'].desktop ? 'tonal' : 'outlined'"
            @click="paginaStore.pagina.atributos['imagem'].desktop = 'https://www.ufn.edu.br/Arquivos/vue/Destaque/70f52ca8-732b-419a-b0d4-ce21b812bb89.jpg'"
          >
            <small>Desktop</small>
          </v-btn>
          <v-btn
          
            height="90"
            width="120"
            prepend-icon="mdi-cellphone"
            size="x-large"
            stacked
            :color="paginaStore.pagina.atributos['imagem'].mobile ? 'primary' : ''"
            :variant="paginaStore.pagina.atributos['imagem'].mobile ? 'tonal' : 'outlined'"
            @click="paginaStore.pagina.atributos['imagem'].mobile = 'https://www.ufn.edu.br/Arquivos/vue/Destaque/db1e7bc5-8951-481a-84e2-f1d489783ebb.jpg'"
          >
            <small>Mobile</small>
          </v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import {  computed } from 'vue';
import { usePaginaStore } from '@/stores/pagina.js';

let paginaStore = usePaginaStore()
let subpagina = computed(() => { 
  return paginaStore.subpaginaAtiva
})


</script>
<style>
.Titulos{
  background-color: rgb(107, 107, 107);
  color: white;
  padding: 4px;
  width: 100%;
  text-align: center;
}
</style>