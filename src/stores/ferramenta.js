import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useFerramentaStore = defineStore('ferramenta', () => {
  const itemSelecionado = ref(null);
  const pathSelecionado = ref([]);
  const tipoSelecionado = ref('');
  const corSelecionada = ref('');

  function selecionarItem(item, path, tipo, cor) {
    itemSelecionado.value = item;
    pathSelecionado.value = path;
    tipoSelecionado.value = tipo;
    corSelecionada.value = cor;
  }

  function selecionarLinha(linha, path) {
    selecionarItem(linha, path, 'Linha', 'green');
  }

  function selecionarColuna(coluna, path) {
    selecionarItem(coluna, path, 'Coluna', 'blue');
  }

  function selecionarComponente(componente, path) {
    selecionarItem(componente, path, 'Componente', 'purple');
  }

  return {
    itemSelecionado,
    pathSelecionado,
    tipoSelecionado,
    corSelecionada,
    selecionarLinha,
    selecionarColuna,
    selecionarComponente,
  };
});
