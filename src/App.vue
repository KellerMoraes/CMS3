<template>
  <v-app>
    <v-main :class="theme.global.name.value" >
      <v-navigation-drawer permanent style="background-color: #ececec; border: none;">

        <v-list>
          <v-list-item class="mb-4">
            <v-list-item-title style="font-weight: 800;  font-size: 22px;" >
              <v-icon style="vertical-align: top;">mdi-vector-square</v-icon><span class="ma-2" >CMS</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menu-buttons" v-for="opcao in opcoes" :key="opcao.nome" :to="opcao.link" ><v-list-item-title>
             <v-icon>{{ opcao.icon }}</v-icon> {{ opcao.nome }}
            </v-list-item-title></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-card class="ma-2" height="98vh">
        <router-view />
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const opcoes = [
  {nome: "Inicial", link: "/",icon: "mdi-home"},
  {nome: "Páginas", link: "/paginas",icon: "mdi-file"},
  {nome: "Templates", link: "/templates",icon: "mdi-newspaper-variant"},
]

  //
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
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
