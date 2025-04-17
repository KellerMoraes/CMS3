export function getAtPath(obj, path) {
  return path.reduce((acc, key) => acc[key], obj)
}

export function removeFromPath(obj, path, index) {
  const array = getAtPath(obj, path)
  return array.splice(index, 1)[0]
}

export function insertAtPath(obj, path, index, item) {
  const array = getAtPath(obj, path)
  array.splice(index, 0, item)
}

export function navegarPorPath(dados, path) {
  let atual = dados;
  for (let i = 0; i < path.length; i++) {
    const { tipo, id } = path[i];
    const proximo = atual.find(el => el.tipo === tipo && el.id === id);
    if (!proximo) return null;
    atual = proximo.filhos;
  }
  

  return { alvo: atual }; // alvo é o array onde o item vai ser manipulado
}
export function encontrarItemPorPath(dados, path) {
  let atual = dados;

  for (const etapa of path) {
    if (!atual?.filhos || !Array.isArray(atual.filhos)) {
      throw new Error("Estrutura de filhos inválida no path");
    }

    // pode usar .find ou o index mesmo se quiser garantir performance
    const proximo = atual.filhos.find(item => item.id === etapa.id);

    if (!proximo) {
      throw new Error(`Item com ID ${etapa.id} não encontrado`);
    }

    atual = proximo;
  }
  return atual; // objeto final do path
}