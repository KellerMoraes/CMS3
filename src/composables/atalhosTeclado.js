import { onMounted, onBeforeUnmount } from 'vue'
import { useCommandStore } from '@/stores/command'

export default function atalhosTecladoIniciador() {
  const commandStore = useCommandStore()

  const handleKeyDown = (e) => {
    if (
  ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) ||
  document.activeElement.isContentEditable
) {
  return
}
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

    if (ctrlOrCmd && e.code == 'KeyZ') {
      if (e.shiftKey) {
        // CTRL+SHIFT+Z → refazer
        commandStore.refazer()
      } else {
        // CTRL+Z → desfazer
        commandStore.desfazer()
      }
      e.preventDefault()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}