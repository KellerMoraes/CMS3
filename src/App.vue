<template>
  <v-app>
    <div :class="theme.global.name.value" >
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

  //
</script>
<style scoped>
.dark{
height: 100%;
background-color: rgb(var(--v-theme-surface-light));
}
.light{
height: 100%;
background-color: #D8D8D8;

}
</style>
