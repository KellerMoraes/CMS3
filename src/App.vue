<template>
    <v-app v-if="!route.fullPath.includes('/editor')">
    <v-main :class="theme.global.name.value" >
      
      <v-navigation-drawer permanent rail-width="100" :rail="formatoExibicaoOpcoesRail" class="d-flex justify-center" color="#ededed" style=" border: none;">

        <!-- <v-list v-if="!formatoExibicaoOpcoesRail"> -->
          <v-list v-model:opened="open" v-if="!formatoExibicaoOpcoesRail">
            <router-link to="/" style="text-decoration: none;">
            <v-list-item :ripple="false" class="mb-8 mt-2 px-16">
                <v-list-item-title style="font-weight: 800;  font-size: 26px; color: #1167b1;" >
                  <v-icon style="vertical-align: top;">mdi-webhook</v-icon><span class="ma-1" style="font-family: Poppins;" >CMS</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>
          <!-- <v-list-item class="menu-buttons px-10" v-for="opcao in opcoes" :key="opcao.id" :to="opcao.link" ><v-list-item-title>
             <v-icon class="px-3" size="20">{{ opcao.icon }}</v-icon> <span style="font-family: Poppins;">{{ opcao.nome }}</span>
            </v-list-item-title>
          </v-list-item> -->

      <v-list-group class="menu-buttons pl-2" v-for="opcao in opcoes" :key="opcao.id" :to="opcao.link" :value="opcao.id" :expand-icon="opcao.subgrupos ? 'mdi-chevron-down' : ''"
      :collapse-icon="opcao.subgrupos ? 'mdi-chevron-up' : ''">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="opcao.icon"
            :title="opcao.nome"
            :to="opcao.subgrupos ? '' : opcao.link"
          ></v-list-item>
        </template>

        <v-list-item v-if="opcao.subgrupos" v-for="x in opcao?.subgrupos" :to.prevent="x.link" :title="x.nome" :value="x.nome" >
        </v-list-item>
      </v-list-group>





      <!-- <v-list-item class="mb-8 mt-2 px-16">
        <v-list-item-title style="font-weight: 800;  font-size: 26px; color: #1167b1;" >
          <v-icon style="vertical-align: top;">mdi-vector-square</v-icon><span class="ma-1" style="font-family: Poppins;" >CMS</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="menu-buttons px-10" v-for="opcao in opcoes" :key="opcao.id" :to="opcao.link" ><v-list-item-title>
         <v-icon class="px-3" size="20">{{ opcao.icon }}</v-icon> <span style="font-family: Poppins;">{{ opcao.nome }}</span>
        </v-list-item-title></v-list-item> -->
    </v-list>






          
        <!-- </v-list> -->

        <v-list v-else class="d-flex flex-column align-center justify-center mx-auto" style="height: 100%; " nav>
          <v-list-item v-for="opcao in opcoes" :key="opcao.nome" rounded="circle" variant="plain" height="60px"  value="home">
            <template v-slot:prepend>
          <v-avatar size="40">
            <v-icon size="30" color="blue">{{ opcao.icon }}</v-icon>
          </v-avatar>
        </template>
          </v-list-item>
          </v-list>
      </v-navigation-drawer>
      <v-card class="ma-0 pl-1" height="100vh" color="#ececec">
        <router-view />
      </v-card>
    </v-main>
  </v-app>
  <v-app v-else>
      <router-view />
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { provide } from 'vue';
import properties from '../config';
import atalhosTecladoIniciador from '@/composables/atalhosTeclado'
atalhosTecladoIniciador()
const cmsHelper = (key) => properties[key];
provide('$cms', cmsHelper);
const route = useRoute()
const theme = useTheme()
const opcoes = [
  {nome: "Site", link: "/",icon: "mdi-web", 
  
  subgrupos: 
  [
  {nome: "Páginas", link: "/site/paginas"},
  {nome: "Notícias", link: "/site/noticias"},
  {nome: "Destaques", link: "/site/destaques"},
  {nome: "Menus", link: "/site/menus"},
  {nome: "Rádio", link: "/site/radio"},
  {nome: "Tv", link: "/site/tv"},
  {nome: "Templates", link: "/site/templates"},
  ], 
  
  id: 0},
  {nome: "Editais", link: "/editais",icon: "mdi-text-box-multiple-outline", id: 1},
  {nome: "Alertas", link: "/alertas",icon: "mdi-alert-decagram-outline", 
  
  subgrupos:
  [
  {nome: "Minha UFN", link: "/alertas/minha-ufn"},
  {nome: "Site", link: "/alertas/site"},
  ],
  id: 2},

  {nome: "Ferramentas", link: "/ferramentas",icon: "mdi-tools", 
  
  subgrupos:
  [
  {nome: "Provas", link: "/ferramentas/provas"},
  ], 
  
  id: 3},

  {nome: "Configurações", link: "/configuracoes", 
  
  subgrupos:
  [
  {nome: "Aparência", link: "/configuracoes/aparencia"},
  {nome: "outra coisa", link: "/configuracoes/cet"},
  ], 
  icon: "mdi-cog-outline" , id: 4},
]
const formatoExibicaoOpcoesRail = ref(false)
const open = ref(null)
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.dark{
height: 100%;
background-color: rgb(var(--v-theme-surface-light));
}
.light{
height: 100%;
background-color: #ececec;
/* background-color: #505050; */

}
.menu-buttons{
  color: #505050; 
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}
</style>
