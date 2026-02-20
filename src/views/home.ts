// ============================================
// DONA DE MIM - Home Page
// ============================================

import { type Product, products } from '../data/products'
import { getProductImagePath } from '../utils/helpers'

function getImagePath(product: Product): string {
  return getProductImagePath(product.sku, product.categoria)
}

function renderProductCard(product: Product): string {
  const img = getImagePath(product)
  const price =
    product.em_promocao && product.preco_promocional
      ? `<span class="price-original">R$ ${product.preco_venda.toFixed(2)}</span><span class="price-current">R$ ${product.preco_promocional.toFixed(2)}</span>`
      : `<span class="price-current">R$ ${product.preco_venda.toFixed(2)}</span>`

  const tags = product.lancamento
    ? '<span class="product-tag tag-new">Lançamento</span>'
    : product.em_promocao
      ? '<span class="product-tag tag-sale">Promoção</span>'
      : product.destaque
        ? '<span class="product-tag tag-featured">Destaque</span>'
        : ''

  return `
    <a href="/produto/${product.slug}" class="product-card">
      <div class="product-image">
        ${tags}
        <img src="${img}" alt="${product.nome}" loading="lazy" />
        <div class="product-overlay">
          <button class="quick-view-btn" data-product-id="${product.id}" data-product-slug="${product.slug}">
            <i class="fas fa-eye"></i> Ver Detalhes
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoria}</span>
        <h4>${product.nome}</h4>
        <div class="product-prices">${price}</div>
        <div class="product-sizes-mini">
          ${product.tamanhos_disponiveis.map((t: number) => `<span>${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `
}

export function HomePage(cartCount: number = 0): string {
  const highlights = products.filter((p: Product) => p.destaque && p.ativo).slice(0, 8)
  const newArrivals = products.filter((p: Product) => p.lancamento && p.ativo).slice(0, 4)
  const blusas = products.filter((p: Product) => p.categoria === 'blusas' && p.ativo).slice(0, 4)
  const vestidos = products.filter((p: Product) => p.categoria === 'vestidos' && p.ativo).slice(0, 4)
  const shorts = products.filter((p: Product) => p.categoria === 'shorts' && p.ativo).slice(0, 1)
  const conjuntos = products.filter((p: Product) => p.categoria === 'conjuntos' && p.ativo).slice(0, 1)

  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona De Mim | Plus Size - Moda Para Mulheres Reais</title>
  <meta name="description" content="Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}
  
  <section class="hero">
    <div class="hero-content">
      <p class="hero-subtitle">Nova Coleção</p>
      <h1>Realçando As Curvas <span>De Quem É</span> dona De Si</h1>
      <p class="hero-tagline">Moda Para Mulheres Reais ❤️</p>
      <span class="hero-sizes">Do 46 ao 54</span>
      <br><br>
      <a href="#colecoes" class="btn">Explorar Agora</a>
    </div>
  </section>

  <section class="about">
    <div class="about-content">
      <h2>Bem-vinda à <span>Dona De Mim</span></h2>
      <p>Somos uma marca feita por e para mulheres reais. Acreditamos que a moda deve se adaptar ao seu corpo, e não o contrário. Nossa curadoria exclusiva foca em peças que trazem <strong>conforto, estilo e empoderamento</strong>. Do 46 ao 54, aqui você é a dona da sua história. ❤️</p>
    </div>
  </section>

  <section class="categories" id="colecoes">
    <h2 class="section-title">Nossas Categorias</h2>
    <div class="categories-grid">
      <a href="/categoria/vestidos" class="category-card">
        <img src="${vestidos.length > 0 ? getImagePath(vestidos[0]) : '/assets/imgs/placeholder.jpg'}" alt="Vestidos">
        <div class="category-overlay">
          <div class="category-info">
            <h3>Vestidos</h3>
            <span>Ver Coleção</span>
          </div>
        </div>
      </a>
      <a href="/categoria/blusas" class="category-card">
        <img src="${blusas.length > 0 ? getImagePath(blusas[0]) : '/assets/imgs/placeholder.jpg'}" alt="Blusas">
        <div class="category-overlay">
          <div class="category-info">
            <h3>Blusas</h3>
            <span>Ver Coleção</span>
          </div>
        </div>
      </a>
      <a href="/categoria/shorts" class="category-card">
        <img src="${shorts.length > 0 ? getImagePath(shorts[0]) : '/assets/imgs/placeholder.jpg'}" alt="Shorts">
        <div class="category-overlay">
          <div class="category-info">
            <h3>Shorts</h3>
            <span>Ver Coleção</span>
          </div>
        </div>
      </a>
      <a href="/categoria/conjuntos" class="category-card">
        <img src="${conjuntos.length > 0 ? getImagePath(conjuntos[0]) : '/assets/imgs/placeholder.jpg'}" alt="Conjuntos">
        <div class="category-overlay">
          <div class="category-info">
            <h3>Conjuntos</h3>
            <span>Ver Coleção</span>
          </div>
        </div>
      </a>
    </div>
  </section>

  <section class="products" id="highlights">
    <h2 class="section-title">Destaques da Semana</h2>
    <div class="products-grid">
      ${highlights.length > 0 ? highlights.map((p: Product) => renderProductCard(p)).join('') : '<p class="no-data">Novidades chegando em breve...</p>'}
    </div>
  </section>

  <section class="features">
    <div class="feature-item">
      <i class="fas fa-truck"></i>
      <h4>Frete Inteligente</h4>
      <p>Envio rápido para todo o Brasil. Frete grátis em compras acima de R$ 299.</p>
    </div>
    <div class="feature-item">
      <i class="fas fa-sync-alt"></i>
      <h4>Troca Descomplicada</h4>
      <p>Sua primeira troca é por nossa conta em até 30 dias.</p>
    </div>
    <div class="feature-item">
      <i class="fas fa-shield-alt"></i>
      <h4>Compra 100% Segura</h4>
      <p>Seus dados estão protegidos com criptografia de ponta a ponta.</p>
    </div>
    <div class="feature-item">
      <i class="fab fa-whatsapp"></i>
      <h4>Atendimento VIP</h4>
      <p>Dúvidas sobre tamanhos? Fale com nossas consultoras no WhatsApp.</p>
    </div>
  </section>

  <section class="instagram-section" id="contato">
    <div class="instagram-content">
      <h2 class="section-title">Siga-nos no Instagram</h2>
      <p class="instagram-subtitle">Junte-se à nossa comunidade e inspire-se com mulheres reais que são Dona de Mim</p>
      <a href="https://www.instagram.com/use_donademiim/" target="_blank" class="btn btn-instagram">
        <i class="fab fa-instagram"></i> @use_donademiim
      </a>
    </div>
  </section>

  ${renderFooter()}

  <a href="https://wa.me/557591561769" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <script src="/assets/js/app.js"></script>
</body>
</html>`
}

function renderHeader(cartCount: number): string {
  return `<header>
    <div class="header-top">Moda Plus Size • Do 46 ao 54 • ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="/" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/categoria/vestidos">Vestidos</a></li>
          <li><a href="/categoria/blusas">Blusas</a></li>
          <li><a href="/categoria/shorts">Shorts</a></li>
          <li><a href="/categoria/conjuntos">Conjuntos</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button id="themeToggle" aria-label="Alternar Tema"><i class="fas fa-moon"></i></button>
        <button aria-label="Buscar" id="searchBtn"><i class="fas fa-search"></i></button>
        <a href="/carrinho" class="cart-btn" aria-label="Carrinho">
          <i class="fas fa-shopping-bag"></i>
          ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
        </a>
      </div>
    </div>
    <div class="search-modal" id="searchModal">
      <div class="search-content">
        <form action="/api/busca" method="get">
          <input type="search" name="q" placeholder="Buscar produtos..." id="searchInput">
          <button type="submit"><i class="fas fa-search"></i></button>
        </form>
        <button class="search-close" id="searchClose"><i class="fas fa-times"></i></button>
        <div class="search-results" id="searchResults"></div>
      </div>
    </div>
  </header>`
}

function renderFooter(): string {
  return `<footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="/" class="logo">DONA DE <span>MIM</span></a>
        <p>Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.<br><br><strong>A DONA</strong> - 75 9156-1769</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/use_donademiim/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/557591561769" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h5>Institucional</h5>
        <ul><li><a href="#">Sobre Nós</a></li><li><a href="#">Nossas Lojas</a></li><li><a href="#">Trabalhe Conosco</a></li></ul>
      </div>
      <div class="footer-column">
        <h5>Ajuda</h5>
        <ul><li><a href="#">Central de Ajuda</a></li><li><a href="#">Frete e Entrega</a></li><li><a href="#">Trocas e Devoluções</a></li></ul>
      </div>
      <div class="footer-column">
        <h5>Contato</h5>
        <ul><li><a href="https://wa.me/557591561769"><i class="fab fa-whatsapp"></i> 75 9156-1769</a></li><li><a href="https://www.instagram.com/use_donademiim/" target="_blank"><i class="fab fa-instagram"></i> @use_donademiim</a></li></ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 DONA DE MIM. Todos os direitos reservados. Feito com ❤️ para mulheres reais.</p>
    </div>
  </footer>`
}
