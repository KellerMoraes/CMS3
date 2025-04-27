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