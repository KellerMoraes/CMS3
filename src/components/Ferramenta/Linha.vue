<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="overflow-y: auto;">
    <v-expansion-panels
      v-model="panel"
      multiple
      variant="accordion"
    >
      <v-expansion-panel :value="1">
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Colunagem</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="py-0">
          <v-item-group mandatory>
            <v-container>
              <v-row>
                <v-col
                  v-for="(coluna,i) in colunas"
                  :key="i"
                  cols="12"
                  md="4"
                  class="pa-0"
                  @click="colunagem(coluna.colunagem.opcao,coluna.colunagem.colunas)"
                >
                  <v-item v-slot="{ isSelected, toggle }">
                    <v-card
                      :color="isSelected ? 'primary' : ''"
                      class="d-flex align-center ma-1"
                      height="60"
                      @click="toggle"
                      flat
                      variant="tonal"
                    >
                    <v-tooltip
        activator="parent"
        location="top"
      ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  >{{ coluna.nome }}</span></v-tooltip>
                      <v-scroll-y-transition>
                        <div
                          class="flex-grow-1 text-center font-weight-bold"
                        >
                        <v-icon :class="coluna.classe ?? '' " size="55">{{ theme.name.value == 'dark' ? '$'+coluna.icone+"Light" : '$'+coluna.icone+"Dark" }}</v-icon>
                          <small>
                          
                            <!-- {{ coluna.nome }} -->
                          </small>
                        </div>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- <v-expansion-panel :value="2">
        <v-expansion-panel-title><h5>Ações</h5></v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-btn
            v-for="(botao,i) in botoes"
            :key="i"
            variant="outlined"
            size="x-small"
            stacked
          >
            <v-icon class="my-1">
              {{ botao.icone }}
            </v-icon>
            <span v-html="botao.nome" />
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel> -->
      <v-expansion-panel
        
        :value="2"
      >
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Cor de Fundo</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-color-picker
            v-model="ferramentaStore.itemSelecionado.atributos.cor.valor"
            tile
            width="14vw"
            :swatches="swatches"
            hide-inputs
            show-swatches
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { reactive } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
let panel = reactive([1, 2, 3])
let ferramentaStore = useFerramentaStore()
let swatches = [
['#FF0000', '#AA0000',],
['#FFFF00', '#AAAA00',],
['#550000', '#555500',],
]
let colunas = [
    
      { nome: "6:6", icone: "Colunagem6x6", colunagem: {opcao: [6,6], colunas:2} },
      { nome: "4:4:4", icone: "Colunagem4x4x4", colunagem: {opcao: [4,4,4], colunas:3} },
      { nome: "3:3:3:3", icone: "Colunagem3x3x3x3", colunagem: {opcao: [3,3,3,3], colunas:4} },
  { nome: "4:8", icone: "Colunagem4x8", colunagem: {opcao: [4,8], colunas:2}},
      { nome: "8:4", icone: "Colunagem4x8", classe: "fh" ,  colunagem: {opcao: [8,4], colunas:2} },
      { nome: "3:6:3", icone: "Colunagem3x6x3", colunagem: {opcao: [3,6,3], colunas:3} },
      { nome: "2:4:6", icone: "Colunagem2x4x6", colunagem: {opcao: [2,4,6], colunas:3} },
      { nome: "6:4:2", icone: "Colunagem2x4x6", classe: "fh" , colunagem: {opcao: [6,4,2], colunas:3} },
      { nome: "Livre", icone: "ColunagemCustom", colunagem: {opcao: [3,4,3], colunas:3} },
]
function colunagem(opcao, colunas) {
    ferramentaStore.mudarColunagem(opcao,colunas)
  }
</script>
<style scoped>
.fh{
  transform: scaleX(-1);
}
.fv{
  transform: scaleY(-1);
}
</style>