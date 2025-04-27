import { $cms } from '@/helpers/cmsProviderHelper';
export function encontrarItemPorPath(dados, path) {
  let atual = dados;

  for (const etapa of path) {
    if (!dados[[$cms('container')]] || !Array.isArray(atual[$cms('container')])) {
      throw new Error("Estrutura de filhos inválida no path");
    }

    // pode usar .find ou o index mesmo se quiser garantir performance
    const proximo = atual[$cms('container')].find(item => item[$cms('id')] === etapa[$cms('id')]);

    if (!proximo) {
      throw new Error(`Item com ID ${etapa[$cms('id')]} não encontrado`);
    }

    atual = proximo;
  }
  return atual; // objeto final do path
}
export function getValueAtPath(obj, path) {
  return path.reduce((acc, key) => acc && acc[key], obj);
}

export function setValueAtPath(obj, path, value) {
  console.log(obj)
  console.log(path[path.length - 1])
  console.log(path.slice(0, -1))
  // console.log(value)
  if (!path.length) return;

  const lastKey = path[path.length - 1];
  const target = path.slice(0, -1).reduce((acc, key) => {
    if (!acc[key]) acc[key] = {}; // cria objeto se não existir
    return acc[key];
  }, obj);

  target[lastKey] = value;
}
