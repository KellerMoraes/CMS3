import { $cms } from '@/helpers/cmsProviderHelper';
export function encontrarItemPorPath(dados, path) {
  let atual = dados;

  for (const etapa of path) {
    const container = atual[$cms('container')];
    if (!Array.isArray(container)) {
      throw new Error('Estrutura de filhos inválida no path');
    }

    const proximo = container.find(item => item[$cms('id')] === etapa[$cms('id')]);
    if (!proximo) {
      throw new Error(`Item com ID ${etapa[$cms('id')]} não encontrado`);
    }

    atual = proximo;
  }

  return atual;
}

export function setValueAtPath(obj, path, value) {
  // console.log(value)
  if (!path.length) return;

  const lastKey = path[path.length - 1];
  const target = path.slice(0, -1).reduce((acc, key) => {
    if (!acc[key]) acc[key] = {}; // cria objeto se não existir
    return acc[key];
  }, obj);

  target[lastKey] = value;
}
