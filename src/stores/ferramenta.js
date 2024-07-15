import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive, ref } from 'vue';
export const useFerramentaStore = defineStore('ferramenta', { 
    state: () => ({
        // Ferramentas
        corBarra: reactive({ cor: "white" }),
        itemSelecionado: reactive({}),
        ferramentaSelecionada: ref(null),
        colunaSelecionada: ref(""),
        formularioSelecionado: reactive({})
    
      }),
      actions: {
        mudarColunagem(opcao, qtdColunas) {
          console.log(opcao)
          this.itemSelecionado.filhos.pop()
          for (let i = 0; i < qtdColunas; i++) {
            let coluna = new ListaDeElementos.Coluna()
            coluna.estrutura = opcao[i]
            this.itemSelecionado.filhos.push(coluna)
    
          }
        },
        selecionarLinha(linha) {
          this.itemSelecionado = linha
          this.corBarra.cor = "green"
          this.ferramentaSelecionada = "Linha"
        },
        selecionarFormulario(formulario) {
          this.itemSelecionado = formulario
          this.formularioSelecionado = formulario
          this.corBarra.cor = "#ffd900"
          this.ferramentaSelecionada = "Formulário"
        },
        selecionarColuna(coluna) {
          this.itemSelecionado = coluna
          this.ferramentaSelecionada = "Coluna"
          this.corBarra.cor = "blue"
        },
        selecionarComponente(componente) {
          this.itemSelecionado = componente
          this.ferramentaSelecionada = "Componente"
          this.corBarra.cor = "purple"
        },
        configuracaoCabecalho() {
    
          this.itemSelecionado = this.subpaginaAtiva
          this.ferramentaSelecionada = "Cabecalho"
          this.corBarra.cor = "#830909"
        }
      },
})