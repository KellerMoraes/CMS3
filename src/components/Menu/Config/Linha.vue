<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="overflow-y: auto;">
    <v-expansion-panels
    class="mb-10"
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
      ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  >{{ coluna[_cmsProps.name] }}</span></v-tooltip>
                      <v-scroll-y-transition>
                        <div
                          class="flex-grow-1 text-center font-weight-bold"
                        >
                        <v-icon :class="coluna.classe ?? '' " size="55">{{ theme.name.value == 'dark' ? '$'+coluna.icone+"Light" : '$'+coluna.icone+"Dark" }}</v-icon>
                          <small>
                          
                            <!-- {{ coluna[_cmsProps.name] }} -->
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
            <span v-html="botao[_cmsProps.name]" />
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel> -->
      <v-expansion-panel
        
        :value="2"
      >
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Fundo</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="d-flex justify-center align-center">
          <v-btn-toggle base-color="#E2E2E2" class="ma-2 ml-12" v-model="ferramentaStore.itemSelecionado.atributos.tipoFundo">
            <v-btn value="Cor sólida">Cor</v-btn>
            <v-btn value="Imagem">Imagem</v-btn>
            <v-btn value="Degradê">Degradê</v-btn>
          </v-btn-toggle>
          <v-color-picker class="ml-6" v-if="ferramentaStore.itemSelecionado.atributos.tipoFundo == 'Cor sólida'"
            v-model="ferramentaStore.itemSelecionado.atributos.estilo['background']"
            tile
            :swatches="swatches"
            :modes="['hexa',]"
            show-swatches
          />
          <div v-if="ferramentaStore.itemSelecionado.atributos.tipoFundo == 'Imagem'">
            <v-card elevation="0" color="#CDCDCD" link :dropzone="true" height="160px" style="border: 3px dashed grey;" class="d-flex flex-column text-center justify-center  align-center">
              <div>

                Arraste e Solte ou <span style="display: contents; color: #1867C0;">Busque...</span>
                <br>
                <small>jpg,png ou svg</small>
              </div>
            </v-card>
            <v-row>
              <v-col cols="6">
                <v-btn class="ma-4 ml-0 mr-0">Abrir Galeria...</v-btn>

              </v-col>
              <v-col cols="6">
                <v-select persistent-hint hint="Comportamento" density="compact" variant="solo-filled" class="ma-3 mr-0" :items="['Cover', 'Contain', 'Fill']"></v-select>

              </v-col>
            </v-row>

          </div>
          <div v-if="ferramentaStore.itemSelecionado.atributos.tipoFundo == 'Degradê'">Degradê</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel
        
        :value="3"
      >
        <v-expansion-panel-title style="min-height: 50px;">
          <h5>Tamanhos</h5>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="7" class="pt-5">
              <span>

                Altura
              </span>
            </v-col>
            <v-col cols="5">
              <v-number-input v-model="ferramentaStore.itemSelecionado.atributos.estilo['min-height']" width="150" suffix="px" rounded="5" flat variant="outlined" inset density="compact" control-variant="stacked"></v-number-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pt-5">
              <span>
                
                Margin
              </span>
            </v-col>
          </v-row>
            <BaseSeletorInterativo tipo="margin" :habilitados="['top', 'bottom']" ></BaseSeletorInterativo>







        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { reactive } from 'vue'
import { useTheme } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const theme = useTheme()
let panel = reactive([1, 2, 3])
let ferramentaStore = useFerramentaStore()
const tipoFundo = ref("Cor sólida")
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