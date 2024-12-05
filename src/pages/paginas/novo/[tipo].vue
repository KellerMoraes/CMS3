<template>
  <v-sheet>
    <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs>

    <v-card width="500" color="blue">
        {{ route.params.tipo }}
    </v-card>
  </v-sheet>
</template>

<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';

let ferramentaStore = useFerramentaStore()
const items = [
        {
          title: 'Inicial',
          disabled: false,
          href: '/',
        },
        {
          title: 'Páginas',
          disabled: false,
          href: '/paginas',
        },
        {
          title: 'Nova Página',
          disabled: true
        }
    ]
const route = useRoute()
onMounted(()=>{
console.log(route.params)
console.log(route.params.tipo)

})
</script>
<style scoped>
</style>
