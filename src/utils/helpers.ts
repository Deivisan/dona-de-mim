// ============================================
// DONA DE MIM - Image Helper
// ============================================

export function getProductImagePath(sku: string, categoria: string): string {
  // Mapeamento de categoria para sufixo de arquivo
  const mapping: Record<string, string> = {
    'blusas': 'blusa',
    'vestidos': 'vestido',
    'conjuntos': 'conjunto',
    'shorts': 'short'
  }
  
  const type = mapping[categoria] || 'produto'
  return `/assets/imgs/${categoria}/${sku}-${type}.jpeg`
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2)}`
}

export function formatDiscount(original: number, promo: number): number {
  return Math.round((1 - promo / original) * 100)
}
