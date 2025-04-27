import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaginaStore } from '@/stores/pagina'

export const useCommandStore = defineStore('command', () => {
  const paginaStore = usePaginaStore()

  // Histórico de comandos executados
  const historico = ref([])
  const futuro = ref([])
  const comando = ref({})

  function executar(comando, alvo = paginaStore.boards[0]) {
    // la dentro desse executar só vai fazer mesmo se não for um evento nativo(de usuario)
    comando.executar(alvo)
    // la dentro desse executar só vai fazer mesmo se não for um evento nativo(de usuario)
    comando.eventoNativo = false
    historico.value.push(comando)
    console.log(historico.value)
    futuro.value = [] // limpa comandos futuros
    limparComando()
  }
  
  function desfazer(alvo = paginaStore.pagina) {
    const comandoDesfazer = historico.value.pop()
    if (comandoDesfazer) {
      comandoDesfazer.desfazer(alvo)
      futuro.value.push(comandoDesfazer)
    }
  }
  
  function refazer(alvo = paginaStore.pagina) {
    const comandoRefazer = futuro.value.pop()
    if (comandoRefazer) {
      comandoRefazer.executar(alvo)
      historico.value.push(comandoRefazer)
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