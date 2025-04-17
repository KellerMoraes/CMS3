import { usePaginaStore } from '@/stores/pagina.js';
export default class CommandManager {
  constructor() {
    this.historico = []
    this.futuro = []
    this.paginaStore = usePaginaStore()
  }

  executar(comando) {
    comando.executar(this.paginaStore.boards[0].subpaginas[0])
    this.historico.push(comando)
    this.futuro = []
    console.log(this.historico)
  }

  desfazer() {
    const comando = this.historico.pop()
    console.log(comando)
    if (comando) {
      comando.desfazer(this.paginaStore.boards[0].subpaginas[0])
      this.futuro.push(comando)
    }
  }

  refazer() {
    const comando = this.futuro.pop()
    if (comando) {
      comando.executar(this.paginaStore.boards[0].subpaginas[0])
      this.historico.push(comando)
    }
  }
}
