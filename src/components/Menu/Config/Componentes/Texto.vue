<template>
    <div>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2">Tamanho da fonte</h5>
                <v-slider
                v-model="fontSize"
                :max="72"
                :min="10"
                :step="1"
                label="10"
                hide-details
                >
                <template v-slot:append>
                    <v-text-field
                    v-model="fontSize"
                    :max="72"
                    :min="10"
                    density="compact"
                    style="width: 80px"
                    type="number"
                    variant="outlined"
                    hide-details
                    ></v-text-field>
                </template>
            </v-slider>
        </v-col>
    </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2">Estilo</h5>
                <v-btn-toggle
                variant="outlined"
                selected-class="btnAtivo"
      multiple
      v-model="ferramentaStore.estilosAtivos"
    >
    <v-btn icon="mdi-format-text" @click="toggleEstilo('thin')" value="thin"></v-btn>
      <v-btn @click="toggleEstilo('bold')" icon="mdi-format-bold" value="bold"></v-btn>
      <v-btn icon="mdi-format-color-text" value="regular"></v-btn>
      <v-btn @click="toggleEstilo('italic')"  icon="mdi-format-italic" value="italic"></v-btn>
    </v-btn-toggle>
    <v-btn variant="outlined" height="45" min-width="40" class="ml-5"><v-icon size="25">mdi-format-clear</v-icon></v-btn>
        </v-col>
    </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2">Alinhamento</h5>
                <v-btn-toggle
                variant="outlined"
      v-model="toggleStyle"
      multiple
    >
      <v-btn icon="mdi-format-align-left" value="left"></v-btn>
      <v-btn icon="mdi-format-align-center" value="center"></v-btn>
      <v-btn icon="mdi-format-align-right" value="right"></v-btn>
      <v-btn icon="mdi-format-align-justify" value="justify"></v-btn>
    </v-btn-toggle>
        </v-col>
    </v-row>
        </div>
   </template>
   <script setup>
   import { useFerramentaStore } from '@/stores/ferramenta'
   const ferramentaStore = useFerramentaStore()
   const fontSize = ref(10)
   const toggleStyle = ref([])

// watch(fontSize, (val) => {
//   ferramenta.aplicarEstilo('fontSize', `${val}px`)
// })
function toggleEstilo(chave) {
  // Alterna o estilo atual, chamando a função exposta no editor
  const ativo = ferramentaStore.estilosAtivos[chave]
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) {
      ferramentaStore.aplicarEstiloNoCursorEditor(chave, !ativo)
    return
  }
  ferramentaStore.aplicarEstiloNoEditor(chave, !ativo)
}
   </script>
   <style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
   .tituloConfig{
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 6px;
    color: #FFB30C;
   }
   .btnAtivo {
  background-color: #ffc107;
}

    </style>
   