import { $cms } from '@/helpers/cmsProviderHelper';
export function findItemByPath(data, path) {
  let current = data;
  
  for (const pathStep of path) {
    const container = current;
    if (!Array.isArray(container)) {
      throw new Error('Estrutura de filhos inválida no path');
    }
    
    const next = container.find(item => item[$cms('id')] === pathStep[$cms('id')]);
    if (!next) {
      throw new Error(`Item com ID ${pathStep[$cms('id')]} não encontrado`);
    }
    
    current = next;
  }
  return current;
}
