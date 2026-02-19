// ============================================
// DONA DE MIM - Product Page
// ============================================

import { type Product, products } from '../data/products'
import { getProductImagePath } from '../utils/helpers'

function getImagePath(product: Product): string {
  return getProductImagePath(product.sku, product.categoria)
}

function renderHeader(cartCount: number): string {
  return `<header>
    <div class="header-top">Moda Plus Size • Do 46 ao 54 • ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="/" class="logo">DONA DE <span>MIM</span></a>
      <nav><ul>
        <li><a href="/">Home</a></li>
        <li><a href="/categoria/vestidos">Vestidos</a></li>
        <li><a href="/categoria/blusas">Blusas</a></li>
        <li><a href="/categoria/shorts">Shorts</a></li>
        <li><a href="/categoria/conjuntos">Conjuntos</a></li>
      </ul></nav>
      <div class="header-actions">
        <button id="themeToggle" aria-label="Alternar Tema"><i class="fas fa-moon"></i></button>
        <button aria-label="Buscar" id="searchBtn"><i class="fas fa-search"></i></button>
        <a href="/carrinho" class="cart-btn"><i class="fas fa-shopping-bag"></i>${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}</a>
      </div>
    </div>
  </header>`
}

function renderFooter(): string {
  return `<footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="/" class="logo">DONA DE <span>MIM</span></a>
        <p>Moda plus size feita para mulheres reais.<br><br><strong>A DONA</strong> - 75 9156-1769</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/use_donademiim/" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/557591561769" target="_blank"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-column"><h5>Institucional</h5><ul><li><a href="#">Sobre Nós</a></li></ul></div>
      <div class="footer-column"><h5>Ajuda</h5><ul><li><a href="#">Central de Ajuda</a></li></ul></div>
      <div class="footer-column"><h5>Contato</h5><ul><li><a href="https://wa.me/557591561769">75 9156-1769</a></li></ul></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 DONA DE MIM.</p></div>
  </footer>`
}

export function ProductPage(slug: string, cartCount: number = 0): string {
  const product = products.find((p: Product) => p.slug === slug)

  if (!product) {
    return `<!DOCTYPE html><html><head><title>Produto não encontrado</title></head><body><h1>Produto não encontrado</h1><a href="/">Voltar</a></body></html>`
  }

  const img = getImagePath(product)
  const related = products
    .filter((p: Product) => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 4)
  const categoriaTitle = product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)

  const priceHtml =
    product.em_promocao && product.preco_promocional
      ? `<span class="price-original">R$ ${product.preco_venda.toFixed(2)}</span><span class="price-promo">R$ ${product.preco_promocional.toFixed(2)}</span><span class="price-discount">${Math.round((1 - product.preco_promocional / product.preco_venda) * 100)}% OFF</span>`
      : `<span class="price-current">R$ ${product.preco_venda.toFixed(2)}</span>`

  const sizesHtml = product.tamanhos_disponiveis
    .map((t: number) => `<button class="size-btn" data-size="${t}">${t}</button>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product.nome} | Dona De Mim</title>
  <meta name="description" content="${product.descricao_curta}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}
  
  <nav class="breadcrumb">
    <a href="/">Home</a><span>/</span>
    <a href="/categoria/${product.categoria}">${categoriaTitle}</a><span>/</span>
    <span>${product.nome}</span>
  </nav>

  <section class="product-detail">
    <div class="product-gallery">
      <div class="product-main-image">
        <img src="${img}" alt="${product.nome}" id="mainImage">
      </div>
      <div class="product-colors">
        <span>Cor Dominante: <strong>${product.imagem_principal.cor_dominante}</strong></span>
        <div class="color-palette">
          ${product.imagem_principal.paleta
            .slice(0, 4)
            .map(
              (c: { hex: string; nome: string }) =>
                `<div class="color-swatch" style="background-color: ${c.hex}" title="${c.nome}"></div>`,
            )
            .join('')}
        </div>
      </div>
    </div>

    <div class="product-info-detail">
      <span class="product-category-tag">${categoriaTitle}</span>
      <h1>${product.nome}</h1>
      <p class="product-sku">SKU: ${product.sku}</p>
      
      <div class="product-price-detail">${priceHtml}</div>

      <div class="product-sizes">
        <span>Selecione seu Tamanho (46 ao 54):</span>
        <div class="size-options">${sizesHtml}</div>
      </div>

      <div class="product-quantity">
        <span>Quantidade:</span>
        <div class="quantity-selector">
          <button type="button" id="qtyMinus">-</button>
          <input type="number" id="quantity" value="1" min="1" max="10">
          <button type="button" id="qtyPlus">+</button>
        </div>
      </div>

      <button class="btn btn-add-cart" id="addToCart" data-product-id="${product.id}">
        <i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho
      </button>

      <a href="https://wa.me/557591561769?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto: ${product.nome} (${product.sku})`)}" target="_blank" class="btn btn-whatsapp">
        <i class="fab fa-whatsapp"></i> Tirar Dúvidas via WhatsApp
      </a>

      <div class="product-details-tabs">
        <details open>
          <summary>Descrição do Produto</summary>
          <div class="tab-content"><p>${product.descricao}</p></div>
        </details>
        <details>
          <summary>Especificações & Material</summary>
          <div class="tab-content">
            <ul>
              <li><strong>Material:</strong> ${product.material}</li>
              <li><strong>Modelagem:</strong> Plus Size Real</li>
              <li><strong>Categoria:</strong> ${categoriaTitle}</li>
              <li><strong>Grade:</strong> Do 46 ao 54</li>
            </ul>
          </div>
        </details>
        <details>
          <summary>Instruções de Lavagem</summary>
          <div class="tab-content"><p>${product.cuidados}</p></div>
        </details>
      </div>
    </div>
  </section>

  ${
    related.length > 0
      ? `
  <section class="products related-products">
    <h2 class="section-title">Você também pode gostar</h2>
    <div class="products-grid">
      ${related
        .map(
          (p: Product) => `
        <a href="/produto/${p.slug}" class="product-card">
          <div class="product-image">
            <img src="${getImagePath(p)}" alt="${p.nome}" loading="lazy">
          </div>
          <div class="product-info">
            <h4>${p.nome}</h4>
            <div class="product-prices">
              <span class="price-current">R$ ${p.preco_venda.toFixed(2)}</span>
            </div>
          </div>
        </a>
      `,
        )
        .join('')}
    </div>
  </section>
  `
      : ''
  }

  ${renderFooter()}

  <a href="https://wa.me/557591561769" target="_blank" class="floating-whatsapp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <script src="/assets/js/app.js"></script>
</body>
</html>`
}
