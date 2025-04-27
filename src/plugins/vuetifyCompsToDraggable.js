import draggable from 'vuedraggable'
import { VRow, VCol, VContainer } from 'vuetify/components'

export function injectVuetifyToDraggable() {
  draggable.components = {
    ...draggable.components,
    VRow,
    VCol,
    VContainer
    // qualquer outro que quiser usar
  }
}