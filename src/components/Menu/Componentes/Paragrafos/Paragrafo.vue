<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <p
        :id="dados[$cms('id')] ?? ''"
      >
        <BaseConteudoEditavel v-if="dados" :config="Config"
          v-model="dados"
        />
      </p>
    </template>
  </BaseComponenteItem>
</template>
<script setup>
let dados = defineModel()
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { $cms } from '@/helpers/cmsProviderHelper';

const DocParagraphOnly = Document.extend({ content: 'paragraph' })
const Config = [DocParagraphOnly, Paragraph]
</script>
