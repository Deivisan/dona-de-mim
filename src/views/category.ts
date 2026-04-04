// ============================================
// DONA DE MIM - Category & Cart Pages
// ============================================

import { type Product, products } from '../data/products'
import { getProductImagePath } from '../utils/helpers'
import { renderHeader, renderFooter, renderFloatingWhatsApp } from './components'

function getImagePath(product: Product): string {
  return getProductImagePath(product.sku, product.categoria, product.imagem_principal.arquivo_novo)
}

function renderProductCard(product: Product): string {
  const img = getImagePath(product)
  const price =
    product.em_promocao && product.preco_promocional
      ? `<span class="price-original">R$ ${product.preco_venda.toFixed(2)}</span><span class="price-current">R$ ${product.preco_promocional.toFixed(2)}</span>`
      : `<span class="price-current">R$ ${product.preco_venda.toFixed(2)}</span>`

  return `<a href="/produto/${product.slug}" class="product-card">
    <div class="product-image">${product.lancamento ? '<span class="product-tag tag-new">Lançamento</span>' : product.em_promocao ? '<span class="product-tag tag-sale">Promoção</span>' : ''}
      <img src="${img}" alt="${product.nome}" loading="lazy">
    </div>
    <div class="product-info">
      <span class="product-category">${product.categoria}</span>
      <h4>${product.nome}</h4>
      <div class="product-prices">${price}</div>
    </div>
  </a>`
}

export function CategoryPage(categoria: string, cartCount: number = 0): string {
  const categoriaProdutos = products.filter((p: Product) => p.categoria === categoria && p.ativo)
  const nomeCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1)

  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nomeCategoria} Plus Size | Dona De Mim</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}
  
  <section class="category-hero">
    <h1>${nomeCategoria} Plus Size</h1>
    <p>Peças exclusivas desenhadas para valorizar suas curvas e realçar sua beleza.</p>
    <span class="product-count">${categoriaProdutos.length} modelos encontrados</span>
  </section>

  <section class="filters-bar">
    <div class="filter-group">
      <label>Ordenar por:</label>
      <select id="sortProducts">
        <option value="relevance">Mais Relevantes</option>
        <option value="price-asc">Menor Preço</option>
        <option value="price-desc">Maior Preço</option>
      </select>
    </div>
    <div class="filter-group">
      <label>Grade de Tamanhos:</label>
      <div class="size-filters">
        <button class="size-filter active" data-size="all">Todos</button>
        <button class="size-filter" data-size="46">46</button>
        <button class="size-filter" data-size="48">48</button>
        <button class="size-filter" data-size="50">50</button>
        <button class="size-filter" data-size="52">52</button>
        <button class="size-filter" data-size="54">54</button>
      </div>
    </div>
  </section>

  <section class="products category-products">
    <div class="products-grid" id="productsGrid">
      ${
        categoriaProdutos.length > 0
          ? categoriaProdutos.map((p: Product) => renderProductCard(p)).join('')
          : '<p class="no-data">Nenhum produto encontrado nesta categoria no momento.</p>'
      }
    </div>
  </section>

  ${renderFooter()}
  ${renderFloatingWhatsApp()}
  <script src="/assets/js/app.js"></script>
</body>
</html>`
}

export function CartPage(items: Array<{ id: number; quantity: number; product: Product; tamanho: number }>, total: number, cartCount: number = 0): string {
  const isEmpty = items.length === 0

  const cartItemsHtml = items
    .map((item: { id: number; quantity: number; product: Product; tamanho: number }) => {
      const product = item.product
      const img = getImagePath(product)
      // Usar preço promocional se aplicável
      const itemPrice = product.em_promocao && product.preco_promocional 
        ? product.preco_promocional 
        : product.preco_venda
      return `<div class="cart-item" data-item-id="${item.id}">
      <div class="cart-item-image"><img src="${img}" alt="${product.nome}"></div>
      <div class="cart-item-info">
        <h3>${product.nome}</h3>
        <p>Tamanho: <strong>${item.tamanho}</strong></p>
        <p class="item-price">R$ ${itemPrice.toFixed(2)}${product.em_promocao && product.preco_promocional ? ' <span class="badge-promo">PROMO</span>' : ''}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-action="increase">+</button>
      </div>
      <div class="cart-item-total">R$ ${(itemPrice * item.quantity).toFixed(2)}</div>
      <button class="cart-item-remove" data-item-id="${item.id}"><i class="fas fa-trash"></i></button>
    </div>`
    })
    .join('')

  // Calcular total considerando promoções
  const totalComPromocao = items.reduce((sum, item) => {
    const price = item.product.em_promocao && item.product.preco_promocional 
      ? item.product.preco_promocional 
      : item.product.preco_venda
    return sum + (price * item.quantity)
  }, 0)

  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Carrinho | Dona De Mim</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}
  
  <main class="cart-page">
    <h1>Meu Carrinho</h1>
    
    ${
      isEmpty
        ? `
    <div class="cart-empty">
      <i class="fas fa-shopping-bag"></i>
      <h2>Seu carrinho está vazio no momento</h2>
      <p>Aproveite para conferir as peças exclusivas da nossa nova coleção.</p>
      <a href="/" class="btn">Explorar Coleção</a>
    </div>
    `
        : `
    <div class="cart-container">
      <div class="cart-items">
        <div class="cart-header">
          <span>Produto</span><span>Detalhes</span><span>Qtd</span><span>Subtotal</span>
        </div>
        ${cartItemsHtml}
      </div>
      
      <div class="cart-summary">
        <h2>Resumo do Pedido</h2>
        <div class="summary-row"><span>Subtotal</span><span>R$ ${totalComPromocao.toFixed(2)}</span></div>
        <div class="summary-row"><span>Frete</span><span>${totalComPromocao >= 299 ? '<strong style="color: #25D366">GRÁTIS</strong>' : 'A calcular'}</span></div>
        <div class="summary-row total"><span>Total</span><span>R$ ${totalComPromocao.toFixed(2)}</span></div>
        
        <form id="checkoutForm" class="checkout-form">
          <h3>Seus Dados para Contato</h3>
          <div class="form-group">
            <label for="customerName">Nome Completo *</label>
            <input type="text" id="customerName" name="customerName" placeholder="Como podemos te chamar?" required>
          </div>
          <div class="form-group">
            <label for="customerPhone">WhatsApp com DDD *</label>
            <input type="tel" id="customerPhone" name="customerPhone" placeholder="(00) 00000-0000" required>
          </div>
          <div class="form-group">
            <label for="customerEmail">E-mail (Opcional)</label>
            <input type="email" id="customerEmail" name="customerEmail" placeholder="seu@email.com">
          </div>
          <button type="submit" class="btn btn-checkout">
            <i class="fab fa-whatsapp"></i> Finalizar Pedido via WhatsApp
          </button>
        </form>
        <p style="font-size: 0.75rem; color: var(--gray); margin-top: 15px; text-align: center;">
          Ao finalizar, você será redirecionada para o WhatsApp para combinar a entrega e pagamento.
        </p>
        <a href="/" class="btn btn-continue">Continuar Comprando</a>
      </div>
    </div>
    `
    }
  </main>

  ${renderFooter()}
  ${renderFloatingWhatsApp()}
  <script src="/assets/js/app.js"></script>
</body>
</html>`
}
