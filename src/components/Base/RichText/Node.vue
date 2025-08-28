<template>
  <!-- Se for bloco -->
  <div v-if="isBloco" :id="model.id">
    <Node
      v-for="(child, i) in model.conteudo"
      :key="child.id"
      :style="applyEstilos(child.estilos)"
      v-model="model.conteudo[i]"
    />
  </div>

  <!-- Se for texto -->
  <span
    v-else
    :id="model.id"
    :style="inlineStyle"
  >{{ model.texto }}</span>
</template>

<script setup>
import Node from '@/components/Base/RichText/Node.vue'
const model = defineModel()

const isBloco = model.tipo !== undefined

function applyEstilos(estilos) {
  const map = {
    bold: estilos.bold ? "font-weight: bold" : "",
    italic: estilos.italic ? "font-style: italic" : "",
    underline: estilos.underline ? "text-decoration: underline" : "",
  }
  return Object.values(map).filter(Boolean).join(";")
}
const inlineStyle = computed(() => {
  const estilos = model.estilos || {}
  return {
    fontWeight: estilos.bold ? "bold" : "normal",
    fontStyle: estilos.italic ? "italic" : "normal",
    textDecoration: estilos.underline ? "underline" : "none"
  }
})
</script>
