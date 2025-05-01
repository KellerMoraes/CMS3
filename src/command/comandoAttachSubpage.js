// src/command/comandoAttachSubpage.js
import { $cms } from '@/helpers/cmsProviderHelper';
import _ from 'lodash';

export default class AttachSubpageCommand {
  constructor(info) {
    this.sourceBoardIndex = info.sourceBoardIndex; // Índice do board de origem
    this.targetBoardIndex = info.targetBoardIndex; // Índice do board de destino
    this.subpageIndex = info.subpageIndex; // Índice da subpágina a ser anexada
    this.targetIndex = info.targetIndex ?? null; // Índice onde inserir no destino (opcional)
    this.subpageRemoved = null; // Armazenará a subpágina removida
    this.boardRemoved = false; // Flag para indicar se o board foi removido
  }

  executar(pagina) {
    const boards = pagina.boards;
    
    // Não permitir anexar para o mesmo board
    if (this.sourceBoardIndex === this.targetBoardIndex) {
      return false;
    }
    
    // Verificar se os boards existem
    if (this.sourceBoardIndex >= boards.length || this.targetBoardIndex >= boards.length) {
      return false;
    }
    
    const sourceBoard = boards[this.sourceBoardIndex];
    const targetBoard = boards[this.targetBoardIndex];
    
    // Verificar se o índice da subpágina é válido
    if (this.subpageIndex >= sourceBoard.subpaginas.length) {
      return false;
    }
    
    // Remover a subpágina do board original
    this.subpageRemoved = sourceBoard.subpaginas.splice(this.subpageIndex, 1)[0];
    
    // Ajustar o índice ativo do board de origem
    if (this.subpageIndex <= sourceBoard.subpaginaAtiva) {
      sourceBoard.subpaginaAtiva = Math.max(0, sourceBoard.subpaginaAtiva - 1);
    }
    
    // Inserir no board de destino
    if (this.targetIndex === null || this.targetIndex > targetBoard.subpaginas.length) {
      targetBoard.subpaginas.push(this.subpageRemoved);
      this.targetIndex = targetBoard.subpaginas.length - 1;
    } else {
      targetBoard.subpaginas.splice(this.targetIndex, 0, this.subpageRemoved);
    }
    
    // Se o board de origem ficar vazio, remover
    if (sourceBoard.subpaginas.length === 0) {
      boards.splice(this.sourceBoardIndex, 1);
      this.boardRemoved = true;
      
      // Ajustar índices se necessário
      if (this.targetBoardIndex > this.sourceBoardIndex) {
        this.targetBoardIndex--;
      }
    }
    
    return true;
  }

  desfazer(pagina) {
    if (!this.subpageRemoved) return false;
    
    const boards = pagina.boards;
    
    // Se o board de origem foi removido, recriá-lo
    if (this.boardRemoved) {
      const sourceBoard = {
        nome: this.subpageRemoved[$cms('name')],
        id: this.subpageRemoved[$cms('id')],
        posicao: { x: 0, y: 0 }, // Posição padrão
        subpaginas: [],
        subpaginaAtiva: 0
      };
      
      // Inserir o board na posição original
      boards.splice(this.sourceBoardIndex, 0, sourceBoard);
      
      // Ajustar índices se necessário
      if (this.targetBoardIndex > this.sourceBoardIndex) {
        this.targetBoardIndex++;
      }
    }
    
    // Remover a subpágina do board de destino
    const targetBoard = boards[this.targetBoardIndex];
    targetBoard.subpaginas.splice(this.targetIndex, 1);
    
    // Ajustar o índice ativo do board de destino se necessário
    if (this.targetIndex <= targetBoard.subpaginaAtiva) {
      targetBoard.subpaginaAtiva = Math.max(0, targetBoard.subpaginaAtiva - 1);
    }
    
    // Reinserir a subpágina no board original
    const sourceBoard = boards[this.sourceBoardIndex];
    sourceBoard.subpaginas.splice(this.subpageIndex, 0, this.subpageRemoved);
    
    // Restaurar o índice ativo do board de origem se necessário
    if (this.subpageIndex <= sourceBoard.subpaginaAtiva) {
      sourceBoard.subpaginaAtiva = Math.min(
        sourceBoard.subpaginaAtiva + 1,
        sourceBoard.subpaginas.length - 1
      );
    }
    
    return true;
  }
}