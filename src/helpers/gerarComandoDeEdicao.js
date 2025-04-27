// gerarComandoDeEdicao.js
import EditarElementoCommand from '@/commands/EditarElementoCommand';

/**
 * Compara dois objetos e gera comandos de edição para as diferenças.
 * @param {Object} original Objeto original.
 * @param {Object} editado Objeto editado.
 * @param {Array} pathItem Caminho até o item dentro da árvore.
 * @param {Function} dispatchFun Função para despachar o comando.
 */
export function gerarComandoDeEdicao(original, editado, pathItem, dispatchFun) {
  const diferencas = encontrarDiferencas(original, editado);

  diferencas.forEach(({ propPath, valorAntigo, novoValor }) => {
    const comando = new EditarElementoCommand({
      path: pathItem,
      propPath,
      valorAntigo,
      novoValor,
      eventoNativo: false,
    });
    dispatchFun(comando);
  });
}

/**
 * Encontra diferenças recursivamente entre dois objetos.
 * Retorna uma lista de { propPath, valorAntigo, novoValor }
 */
function encontrarDiferencas(obj1, obj2, caminho = []) {
  const diferencas = [];

  const chaves = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
  
  chaves.forEach(key => {
    const valor1 = obj1 ? obj1[key] : undefined;
    const valor2 = obj2 ? obj2[key] : undefined;

    if (JSON.stringify(valor1) !== JSON.stringify(valor2)) {
      if (valor1 && typeof valor1 === 'object' && valor2 && typeof valor2 === 'object') {
        diferencas.push(...encontrarDiferencas(valor1, valor2, [...caminho, key]));
      } else {
        diferencas.push({
          propPath: [...caminho, key],
          valorAntigo: valor1,
          novoValor: valor2
        });
      }
    }
  });

  return diferencas;
}
