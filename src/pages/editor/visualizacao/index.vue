<template>
  <v-main style="background-color: grey;">
    <v-img :src="imagemDesktop" height="700"></v-img>
    <div style="background-color: white; padding: 0 15% 0 15%!important; min-height: 800px;" >
      <fieldset class="tituloPagina">
        <legend class="pr-12" style="text-transform: uppercase;">{{ tituloPagina }}</legend>
      </fieldset>
        <Pagina v-if="pagina" v-model="pagina" >
      </Pagina>
    </div>
    <v-footer
    class="bg-indigo-lighten-1 text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
  </v-main>
</template>

<script setup>
import Pagina from "@/Render/Pagina.vue"
import { $cms } from '@/helpers/cmsProviderHelper';
import channel from '@/helpers/broadCast';
const pagina = ref(null)
const tituloPagina = ref(null)
const imagemDesktop = ref(null)
channel.onmessage = (event) => {
  if (event.data.tipo === 'atualizar-pagina') {
    console.log(JSON.parse(event.data.payload))
    pagina.value = JSON.parse(event.data.payload)
    tituloPagina.value = pagina.value[$cms('name')]
    // // Atualize sua visualização com os novos dados
  }
};
const icons = [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ]
// const imagemDesktop = paginaStore.pagina.atributos['imagem'].desktop
// const imagemMobile = paginaStore.pagina.atributos['imagem'].mobile
// const mostrarCabecalho = paginaStore.pagina.atributos['imagem'].mostrar
</script>

<style lang="scss">
.tituloPagina{
  font-size: 3em;
    display: block;
    margin-top: 1rem;
    border-left: none;
    border-right: none;
    color: #183c7b;
    border-bottom: none;
    border-top: 2px solid #f8b525;
}
</style>