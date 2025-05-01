import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';

class Pagina extends ElementoBase {
  static criar(args) {
    // ARGS: NAME, IDDOMAIN, STARTDATE
    const subpaginaInicial = SubPagina.criar();
    const subpaginaInicial2 = SubPagina.criar();
    return {
      ...this.criarEstrutura({ 
        [$cms('type')]: 'pagina', 
        [$cms('name')]: args[$cms('name')],
        [$cms('container')]: [subpaginaInicial, subpaginaInicial2], 
      }),
      [$cms('idDomain')]: args[$cms('idDomain')],
      [$cms('version')]: '3.0',
      [$cms('startDate')]: args[$cms('startDate')],
      [$cms('attrs')]: {
        [$cms('image')]: {
          [$cms('show')]: false,
          [$cms('desktop')]: '',
          [$cms('mobile')]: '',
          [$cms('imagePosition')]: '',
        },
      },
    };
  }
  static adicionarSubpagina(pagina, subpagina = null) {
    const novaSub = subpagina || SubPagina.criar();
    pagina[$cms('container')].push(novaSub);
    return novaSub;
  }
}

class Linha extends ElementoBase {
  static criar(componente = null) {
    // Cria a coluna (sem filhos inicialmente)
    const coluna = Coluna.criar();

    // Se um componente for fornecido, adiciona à coluna
    if (componente) {
      coluna[$cms('container')].push(componente);
    }

    // Cria a estrutura da linha com a coluna
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'linha',
        [$cms('name')]: 'Linha',  // A linha sempre terá ao menos uma coluna
        [$cms('container')]: [coluna],  // A linha sempre terá ao menos uma coluna
        [$cms('attrs')]: {
          [$cms('style')]: { 'background': '#ffffff', 'min-height': 105 },
          [$cms('bgStyle')]: 'Cor sólida',
        },
      }),
    [$cms('structure')]: [12]
  }
}
}

class Coluna extends ElementoBase {
  static criar() {
    return this.criarEstrutura({
      [$cms('type')]: 'coluna',
      [$cms('name')]: 'Coluna',
      [$cms('attrs')]: {
        [$cms('style')]: { 'background': '#ffffff' },
        [$cms('bgStyle')]: 'Cor sólida',
      },
    });
  }
}

class SubPagina extends ElementoBase {
  static criar(name = "Subpágina") {
    return this.criarEstrutura({
      [$cms('type')]: 'subpagina',
      [$cms('container')]: [],
      [$cms('name')]: name,
      [$cms('attrs')]: {
        [$cms('visibility')]: { [$cms('name')]: 'display', [$cms('value')]: 'block', [$cms('extension')]: null },
        [$cms('image')]: { [$cms('show')]: false, [$cms('desktop')]: '', [$cms('mobile')]: '', [$cms('imagePosition')]: '' },
      },
    });
  }
}

export const Elementos = {
  Pagina,
  SubPagina,
  Linha,
  Coluna,
//   Celula,
};