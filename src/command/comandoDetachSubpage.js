// src/command/comandoDetachSubpage.js
import { $cms } from '@/helpers/cmsProviderHelper';
import { gerarId } from '@/helpers/gerarId';
import _ from 'lodash';

export default class DetachSubpageCommand {
  constructor(info) {
    this.boardIndex = info.boardIndex; // Índice do board de origem
    this.subpageIndex = info.subpageIndex; // Índice da subpágina a ser desanexada
    this.newPosition = { ...info.position }; // Posição onde a nova board será criada
    this.newBoardId = gerarId(); // ID do novo board a ser criado
    this.subpageRemoved = null; // Armazenará a subpágina removida
  }

  executar(pagina) {
    // Só podemos desanexar se o board tiver mais de uma subpágina
    const boards = pagina.boards;
    
    if (boards[this.boardIndex].subpaginas.length <= 1) {
      console.warn("Não é possível desanexar a única subpágina de um board");
      return false;
    }

    // Remover a subpágina do board original
    this.subpageRemoved = boards[this.boardIndex].subpaginas.splice(this.subpageIndex, 1)[0];
    
    // Se a subpágina removida era a ativa, ajusta o índice ativo
    if (this.subpageIndex <= boards[this.boardIndex].subpaginaAtiva) {
      boards[this.boardIndex].subpaginaAtiva = Math.max(0, boards[this.boardIndex].subpaginaAtiva - 1);
    }
    
    // Criar novo board com a subpágina removida
    const newBoard = {
      nome: this.subpageRemoved[$cms('name')],
      id: this.newBoardId,
      posicao: { x: this.newPosition.x, y: this.newPosition.y },
      subpaginas: [this.subpageRemoved],
      subpaginaAtiva: 0
    };
    
    // Adicionar o novo board à lista
    boards.push(newBoard);
    
    return true;
  }

  desfazer(pagina) {
    if (!this.subpageRemoved) return false;
    
    const boards = pagina.boards;
    
    // Encontrar o novo board pelo ID
    const newBoardIndex = boards.findIndex(board => board.id === this.newBoardId);
    if (newBoardIndex === -1) return false;
    
    // Remover o board criado
    boards.splice(newBoardIndex, 1);
    
    // Reinserir a subpágina no board original
    boards[this.boardIndex].subpaginas.splice(this.subpageIndex, 0, this.subpageRemoved);
    
    // Restaurar o índice da subpágina ativa se necessário
    if (this.subpageIndex <= boards[this.boardIndex].subpaginaAtiva) {
      boards[this.boardIndex].subpaginaAtiva = Math.min(
        boards[this.boardIndex].subpaginaAtiva + 1,
        boards[this.boardIndex].subpaginas.length - 1
      );
    }
    
    return true;
  }
}