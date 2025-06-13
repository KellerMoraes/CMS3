import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaginaStore } from '@/stores/pagina'
import { useEditorStore } from '@/stores/editor'

export const useCommandStore = defineStore('command', () => {
  const editorStore = useEditorStore()

  // Histórico de comandos executados
  const historico = ref([])
  const futuro = ref([])
  const comando = ref({})

  function executar(comando, alvo = editorStore.canvas.boards) {
    // Verifica se estamos usando um comando com a estrutura correta
    if (!comando || typeof comando.executar !== 'function') {
      console.error('Comando inválido', comando)
      return
    }

    // Executa o comando
    comando.executar(alvo)
    
    // Marca como não nativo (se aplicável)
    if ('eventoNativo' in comando) {
      comando.eventoNativo = false
    }
    
    // Adiciona ao histórico
    historico.value.push(comando)
    console.log('Comando executado:', comando, 'Histórico:', historico.value)
    
    // Limpa comandos futuros quando executamos algo novo
    futuro.value = []
    limparComando()
  }
  
  function desfazer(alvo = editorStore.canvas.boards) {
    const comandoDesfazer = historico.value.pop()
    if (comandoDesfazer && typeof comandoDesfazer.desfazer === 'function') {
      comandoDesfazer.desfazer(alvo)
      futuro.value.push(comandoDesfazer)
      console.log('Comando desfeito:', comandoDesfazer)
    }
  }
  
  function refazer(alvo = editorStore.canvas.boards) {
    const comandoRefazer = futuro.value.pop()
    if (comandoRefazer && typeof comandoRefazer.executar === 'function') {
      comandoRefazer.executar(alvo)
      historico.value.push(comandoRefazer)
      console.log('Comando refeito:', comandoRefazer)
    }
  }

  function criarComando(propriedade, valor) {
    comando.value[propriedade] = valor
  }

  function limparComando() {
    if (comando.value && typeof comando.value === 'object') {
      Object.keys(comando.value).forEach(key => {
        delete comando.value[key]
      })
    }
  }

  return {
    // Estado
    historico,
    futuro,
    comando,

    // Ações
    executar,
    desfazer,
    refazer,
    criarComando,
    limparComando
  }
})