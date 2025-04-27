// src/helpers/commandHandlers.js
import AdicionarElementoCommand from '@/command/comandoAdicionar';
import MoverElementoCommand from '@/command/comandoMover';
import { useCommandStore } from '@/stores/command';

/**
 * Função chamada quando um item é adicionado.
 * @param {Object} evt - Evento do draggable.
 * @param {Array} path - Caminho onde o item foi adicionado.
 */
export function itemAdd(evt, path) {
  const commandStore = useCommandStore();

  if (evt.from.classList.contains('listaDeComponentes')) {
    commandStore.criarComando('elemento', evt.item._underlying_vm_);
    commandStore.criarComando('destino', { path, index: evt.newIndex });
    commandStore.criarComando('eventoNativo', true);
    commandStore.executar(new AdicionarElementoCommand(commandStore.comando));
    return;
  }

  commandStore.criarComando('itemId', evt.item._underlying_vm_['id']);
  commandStore.criarComando('destino', { path, index: evt.newIndex });
  commandStore.criarComando('eventoNativo', true);
}

export function itemRemove(evt, path) {
  const commandStore = useCommandStore();
  commandStore.criarComando('origem', { path, index: evt.oldIndex });
}

export function itemMoved() {
  const commandStore = useCommandStore();
  if (
    commandStore.comando.destino &&
    commandStore.comando.origem &&
    commandStore.comando.itemId
  ) {
    commandStore.executar(new MoverElementoCommand(commandStore.comando));
  }
}

export function itemSort(evt, path) {
  if (evt.from.classList.contains('listaDeComponentes')) return;

  const commandStore = useCommandStore();
  commandStore.criarComando('origem', { path, index: evt.oldIndex });
  commandStore.criarComando('destino', { path, index: evt.newIndex });
  commandStore.criarComando('itemId', evt.item._underlying_vm_['id']);
  commandStore.criarComando('eventoNativo', true);

  if (
    commandStore.comando.destino &&
    commandStore.comando.origem &&
    commandStore.comando.itemId
  ) {
    commandStore.executar(new MoverElementoCommand(commandStore.comando));
  }
}
