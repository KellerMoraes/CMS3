import { ElementoBase } from '@/model/BaseElemento';

class Pagina extends ElementoBase {
  static criar(nomePagina, dominioId, dataInicial) {
    return {
      ...this.criarEstrutura({ tipo: 'pagina', nome: nomePagina }),
      dominioId,
      versao: 'cms-3.0',
      inicial: dataInicial,
      atributos: {
        imagem: {
          mostrar: false,
          desktop: '',
          mobile: '',
          pontoFocal: '',
        },
      },
    };
  }
}

class Linha extends ElementoBase {
  static criar(componente = null) {
    // Cria a coluna (sem filhos inicialmente)
    const coluna = Coluna.criar();

    // Se um componente for fornecido, adiciona à coluna
    if (componente) {
      coluna.filhos.push(componente);
    }

    // Cria a estrutura da linha com a coluna
    return this.criarEstrutura({
      tipo: 'linha',
      nome: 'Linha',
      filhos: [coluna],  // A linha sempre terá ao menos uma coluna
      atributos: {
        estilo: { background: '#ffffff', 'min-height': 105 },
        tipoFundo: 'Cor sólida',
      },
    });
  }
}

class Coluna extends ElementoBase {
  static criar() {
    return this.criarEstrutura({
      tipo: 'coluna',
      nome: 'Coluna',
      atributos: {
        estilo: { background: '#ffffff' },
        tipoFundo: 'Cor sólida',
      },
    });
  }
}

class SubPagina extends ElementoBase {
  static criar() {
    return this.criarEstrutura({
      tipo: 'subpagina',
      nome: 'Subpágina',
      atributos: {
        visibilidade: { nome: 'display', valor: 'block', extensao: null },
        imagem: { mostrar: false, desktop: '', mobile: '', pontoFocal: '' },
      },
    });
  }
}

// class Celula extends ElementoBase {
//   static criar(indice) {
//     return this.criarEstrutura({
//       tipo: 'celula',
//       nome: `Celula ${indice}`,
//     });
//   }
// }

export const Elementos = {
  Pagina,
  SubPagina,
  Linha,
  Coluna,
//   Celula,
};
export function criarElemento(tipo, ...args) {
  const classe = Elementos[tipo];
  if (!classe || typeof classe.criar !== 'function') {
    throw new Error(`Tipo de elemento "${tipo}" não é válido.`);
  }
  return classe.criar(...args);
}