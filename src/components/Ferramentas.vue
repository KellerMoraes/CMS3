<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row>
    <v-col cols="8">
      <v-btn size="large">
        <v-icon class="mr-2">
          mdi-eye-off
        </v-icon>
        Desabilitar
      </v-btn>
      <div
        class="d-inline"
        v-if="ferramentaStore.ferramentaSelecionada[_cmsProps.name] == 'Linha'"
      >
        <v-btn 
          
          v-for="(botao, i) in botoesLinha" 
          :key="i"
          size="large"
        >
          <v-icon class="mr-2">
            {{ botao.icone }}
          </v-icon>
          {{ botao[_cmsProps.name] }}
        </v-btn>
      </div>
      <div
        class="d-inline"
        v-if="ferramentaStore.ferramentaSelecionada[_cmsProps.name] == 'Coluna'"
      >
        <v-btn
          
          v-for="(botao, i) in botoesColuna"
          :key="i"
        >
          <v-icon class="mr-2">
            {{ botao.icone }}
          </v-icon>
          {{ botao[_cmsProps.name] }}
        </v-btn>
      </div>
      <div
        class="d-inline"
        v-if="ferramentaStore.ferramentaSelecionada[_cmsProps.name] == 'Componente'"
      >
        <v-btn
          
          v-for="(botao, i) in botoes"
          :key="i"
        >
          <v-icon class="mr-2">
            {{ botao.icone }}
          </v-icon>
          {{ botao[_cmsProps.name] }}
        </v-btn>
      </div>
    </v-col>
    <v-col
      cols="4"
      class="pr-2"
    >
      <v-btn size="large">
        <v-icon class="mr-2">
          mdi-content-save
        </v-icon>
        Salvar
      </v-btn>
      <v-btn size="large">
        <v-icon class="mr-2">
          mdi-upload
        </v-icon>
        Publicar
      </v-btn>
      <v-btn size="large" to="/visualizacao">
        <v-icon class="mr-2">
          mdi-eye
        </v-icon>
        Visualizar
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { useFerramentaStore } from '@/stores/ferramenta.js';
export default {
  data() {
    return {
      botoesLinha: [
        { nome: "Colar coluna", icone: "mdi-clipboard-file-outline", funcao: this.colarColuna },
        { nome: `Copiar linha`, icone: "mdi-content-copy", funcao: this.copiarLinha },
        { nome: "Excluir", icone: "mdi-delete", funcao: this.excluirLinha },
      ],
      botoesColuna: [
        { nome: "Colar componente", icone: "mdi-clipboard-file-outline", funcao: this.colarColuna },
        { nome: `Copiar coluna`, icone: "mdi-content-copy", funcao: this.copiarLinha },
        { nome: "Excluir", icone: "mdi-delete", funcao: this.excluirLinha },
      ],
      ferramentaStore: useFerramentaStore(),
    }
  },
  methods: {
    salvar() {
      console.log(this.ferramentaStore.itemSelecionado)
    }
  }
}
</script>