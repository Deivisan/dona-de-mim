// ============================================
// DONA DE MIM - Image Helper
// ============================================

export function getProductImagePath(sku: string, categoria: string, arquivoNome?: string): string {
  // Se tiver o nome específico do arquivo, usa diretamente
  if (arquivoNome) {
    return `/imgs/${categoria}/${arquivoNome}`
  }
  
  // Fallback para geração dinâmica
  return `/imgs/${categoria}/${sku}.jpeg`
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2)}`
}

export function formatDiscount(original: number, promo: number): number {
  return Math.round((1 - promo / original) * 100)
}
