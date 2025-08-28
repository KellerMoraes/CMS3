<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
        <BaseEditor
         v-model="model"></BaseEditor>
</template>
<script setup>
let model = defineModel()
// onMounted(()=>{console.log(model.value)})
</script>

<style>
</style>
