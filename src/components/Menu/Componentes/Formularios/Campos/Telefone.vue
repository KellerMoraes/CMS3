<template>
    <v-text-field
      :variant="dados.atributos.definicoes.variante"
      v-model="ferramentaStore.formularioSelecionado.conteudo[dados.atributos.definicoes?.nomeCampo ?? NomeCampo]"
      v-maska="'(##)#.####-####'"
      :label="dados.atributos.definicoes.tipo"
    ></v-text-field>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta';
import { defineModel,ref } from 'vue';
import { vMaska } from "maska/vue"
const ferramentaStore = useFerramentaStore()

let dados = defineModel()
console.log(dados)
let NomeCampo = "Telefone"
    // const rules = [
    //   value => {
    //     if (value) return true

    //     return 'CPF inválido.'
    //   },
    // ]

    
</script>