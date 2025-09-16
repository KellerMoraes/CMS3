// editorPresets.js
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

// Document customizado para cada caso
const DocHeadingOnly = Document.extend({ content: 'heading' })
const DocParagraphOnly = Document.extend({ content: 'paragraph' })
const DocFree = Document.extend({ content: 'block+' })

export const editorPresets = {
  Titulo: {
    extensions: [
      DocHeadingOnly,
      Heading.configure({ levels: [1] }),
      Text,
      Bold,
      Italic,
    ],
  },

  Paragrafo: {
    extensions: [
      DocParagraphOnly,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
    ],
    defaultContent: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Texto do parágrafo' }],
        },
      ],
    },
  },

  campoEditavel: {
    extensions: [
      DocFree, // libera qualquer bloco
      Heading.configure({ levels: [1, 2, 3] }),
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
    ],
    defaultContent: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Texto livre' }],
        },
      ],
    },
  },
}
