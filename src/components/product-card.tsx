// ============================================
// DONA DE MIM - Product Card Component
// ============================================

import { Html } from '@elysiajs/html'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
}

function getImagePath(product: Product): string {
  const type = product.categoria === 'blusas' ? 'blusa' : 'vestido'
  return `/assets/imgs/${product.categoria}/${product.sku}-${type}.jpeg`
}

export function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product)

  return (
    <a href={`/produto/${product.slug}`} class="product-card">
      <div class="product-image">
        {product.lancamento && <span class="product-tag tag-new">Lançamento</span>}
        {product.em_promocao && !product.lancamento && (
          <span class="product-tag tag-sale">Promoção</span>
        )}
        {product.destaque && !product.lancamento && !product.em_promocao && (
          <span class="product-tag tag-featured">Destaque</span>
        )}

        <img src={imagePath} alt={product.nome} loading="lazy" />

        <div class="product-overlay">
          <button class="quick-view-btn" data-product-id={product.id}>
            <i class="fas fa-eye"></i>
            Ver Detalhes
          </button>
        </div>
      </div>

      <div class="product-info">
        <span class="product-category">{product.categoria}</span>
        <h4>{product.nome}</h4>

        <div class="product-prices">
          {product.em_promocao && product.preco_promocional ? (
            <>
              <span class="price-original">R$ {product.preco_venda.toFixed(2)}</span>
              <span class="price-current">R$ {product.preco_promocional.toFixed(2)}</span>
            </>
          ) : (
            <span class="price-current">R$ {product.preco_venda.toFixed(2)}</span>
          )}
        </div>

        <div class="product-sizes-mini">
          {product.tamanhos_disponiveis.map((t) => (
            <span>{t}</span>
          ))}
        </div>
      </div>
    </a>
  )
}
