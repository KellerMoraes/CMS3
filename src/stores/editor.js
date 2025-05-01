import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
export const useEditorStore = defineStore('editor', { 
    state: () => ({

        // Edições
        campoSelecionado: reactive({}),
        opcaoComponenteSelecionado: ref(false),
        recursoSelecionado: ref(false),

    
      }),
      actions: {
        selecionarRecurso(recurso){
          this.recursoSelecionado = recurso
          this.opcaoComponenteSelecionado = true
        },
      }
})