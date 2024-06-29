<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-btn-toggle
    variant="outlined"
    divided
    style="transition: 0.5s; height: 100%;"
    class="mx-4"
  >
    <v-btn
      v-for="(botao, index) in botoes"
      :key="index"
      @click="botao.funcao"
      size="small"
      :prepend-icon="botao.icone"
      stacked
      variant="text"
    >
      {{ botao.nome }}<small style="font-size: 8px;">({{ botao.atalho }})</small>
    </v-btn>
  </v-btn-toggle>
</template>
<script>
import { useComponentStore } from '@/stores/store';
export default {
    components: {
    },
    data () {
        return {
            componentStore: useComponentStore(),
            botoes: [
                { nome: "Copiar componente", icone: "mdi-content-copy" , funcao: this.copiarLinha, atalho: "CTRL + C" },
                { nome: "Excluir", icone: "mdi-delete" , funcao: this.excluirLinha, atalho: "Delete" },
            ]
        
      }
    },
    methods: {
        adicionarColuna() {
            this.componentStore.adicionarColuna()
        },
        copiarLinha() {
                        console.log("teste")

        },
        colarColuna() {
                        console.log("teste")

        },
        excluirLinha() {
                        console.log("teste")

        },
        abrirLayouts() {
                        console.log("teste")

        },
        editarFundo() {
                        console.log("teste")

        }
    }
  }
</script>