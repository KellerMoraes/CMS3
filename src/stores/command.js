import { defineStore } from 'pinia'
import CommandManager from '@/command/gerenciadorDeComandos'

export const useCommandStore = defineStore('command', { 
    state: () => ({
        // Ferramentas
        manager: new CommandManager()
    
      }),
      actions: {
        executar(comando) {
            this.manager.executar(comando)
          },
          desfazer() {
            this.manager.desfazer()
          },
          refazer() {
            this.manager.refazer()
          },
          mostrarHistorico() {
          }
      },
})