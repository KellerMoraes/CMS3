<!-- components/RichTextRenderer.vue -->
<template>
  <component :is="tag" :data-id="bloco.id">
    <template v-for="(item, i) in bloco.conteudo" :key="item.id">
      <span :style="getStyle(item)">{{ item.texto }}</span>
    </template>
  </component>
</template>

<script setup>
const props = defineProps({ bloco: Object })

const tag = computed(() => {
  switch (props.bloco.tipo) {
    case "h1": return "h1"
    case "h2": return "h2"
    case "paragrafo": return "p"
    default: return "div"
  }
})

function getStyle(item) {
  return {
    fontWeight: item.estilos.bold ? "bold" : "normal",
    fontStyle: item.estilos.italic ? "italic" : "normal",
    textDecoration: item.estilos.underline ? "underline" : "none",
  }
}
</script>
