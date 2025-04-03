<template>
    <v-dialog v-model="dialogImportar" max-width="700px">
            <template v-slot:activator="{ props }">
              <v-btn color="blue" variant="flat" class="mx-1" v-bind="props">
               {{ propsNome }} <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card color="blue" height="600px" border-radius="6px" class="pt-3 ma-1 border-radius-2" >
              <v-card-title class="pt-4" style="background-color: white; color: black; font-size: 30px; font-weight: 500; font-family: var(--fonte-titulos2);">
                <v-avatar class="mr-2" size="70" color="blue"><v-icon size="50">mdi-school</v-icon></v-avatar>
                Criar nova página
                <v-divider class="mx-1 mt-5"></v-divider>
              </v-card-title>
              <v-card-text style="background-color: white; color: black; font-weight: 300; font-family: var(--fonte-titulos);">
                <!-- NOME -->
                <div class="my-2">Nome:</div>
                <v-text-field hide-details variant="outlined" density="compact"></v-text-field>
                <!-- NOME -->
                <!-- URL -->
                <div class="my-2">URL:</div>
                <v-text-field readonly variant="outlined" density="compact">
                  <template v-slot:append>
                    <v-btn height="100%" variant="tonal" style="margin-left: -10px;"><v-icon>mdi-content-copy</v-icon></v-btn>
                  </template>
                </v-text-field>
                <!-- URL -->
                <!-- Datas -->
                <v-menu>
                  <template v-slot:activator="{ props }">
        <span class="my-2">Inicial:</span>
        <v-text-field width="200px" v-bind="props" readonly variant="outlined" density="compact">
        </v-text-field>
      </template>
      <v-date-picker></v-date-picker>
    </v-menu>                
                <!-- URL -->
              </v-card-text>
              <v-card-actions style="background-color: white;">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialogImportar = false">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="confirmarImportacao">
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>
<script setup>
const dialogImportar = ref(false)
const paginaImportadaCarregada = ref(true)
const props = defineProps(['tipo', 'propsNome'])
const emit = defineEmits(['paginaRetorno'])
function confirmarImportacao(){
console.log("ceta")
}
function mostrarArquivoSelecionado(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
        console.log("Arquivo selecionado:", arquivo);
    }
}
</script>