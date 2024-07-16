import { defineStore } from 'pinia';
import { ListaDeElementos } from '@/model/Elementos';
import { reactive, ref } from 'vue';
export const useFerramentaStore = defineStore('ferramenta', { 
    state: () => ({
        // Ferramentas
        itemSelecionado: reactive({}),
        ferramentaSelecionada: reactive({nome: "" , cor: "white" }),
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
          this.ferramentaSelecionada.cor = "green"
          this.ferramentaSelecionada.nome = "Linha"
        },
        selecionarFormulario(formulario) {
          this.itemSelecionado = formulario
          this.formularioSelecionado = formulario
          this.ferramentaSelecionada.cor = "#ffd900"
          this.ferramentaSelecionada.nome = "Formulário"
        },
        selecionarColuna(coluna) {
          this.itemSelecionado = coluna
          this.ferramentaSelecionada.nome = "Coluna"
          this.ferramentaSelecionada.cor = "blue"
        },
        selecionarComponente(componente) {
          this.itemSelecionado = componente
          this.ferramentaSelecionada.nome = "Componente"
          this.ferramentaSelecionada.cor = "purple"
        },
        configuracaoCabecalho() {
    
          this.itemSelecionado = this.subpaginaAtiva
          this.ferramentaSelecionada.nome = "Cabecalho"
          this.ferramentaSelecionada.cor = "#830909"
        }
      },
})