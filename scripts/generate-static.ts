// ============================================
// DONA DE MIM - Gerador de Páginas Estáticas
// Gera HTML estático para GitHub Pages
// ============================================

import { products } from '../src/data/products.ts'

const BASE_URL = 'https://deivisan.github.io/dona-de-mim/'

// Função para gerar o CSS base
const generateCSS = () => `
:root {
  --primary: #1a1a1a;
  --secondary: #c9a87c;
  --accent: #8b7355;
  --light: #fafafa;
  --gray: #6b6b6b;
  --border: #e5e5e5;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Poppins', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-body); color: var(--primary); background: var(--light); line-height: 1.6; }

/* Floating WhatsApp */
.floating-whatsapp { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 1000; transition: all 0.3s; text-decoration: none; }
.floating-whatsapp:hover { transform: scale(1.1); box-shadow: 0 6px 25px rgba(37,211,102,0.5); }
.floating-whatsapp i { color: white; font-size: 28px; }

/* Header */
header { background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-top { background: var(--primary); color: #fff; text-align: center; padding: 8px; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; }
.header-main { max-width: 1400px; margin: 0 auto; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; letter-spacing: 3px; text-decoration: none; color: var(--primary); }
.logo span { color: var(--secondary); }
nav ul { display: flex; list-style: none; gap: 40px; }
nav a { text-decoration: none; color: var(--primary); font-size: 0.85rem; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; transition: color 0.3s; }
nav a:hover { color: var(--secondary); }
.header-actions { display: flex; gap: 20px; }
.header-actions button { background: none; border: none; cursor: pointer; font-size: 1.2rem; color: var(--primary); transition: color 0.3s; }
.header-actions button:hover { color: var(--secondary); }

/* Hero */
.hero { height: 60vh; background: linear-gradient(135deg, #f5f5f5 0%, #e8e4df 100%); display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; top: -50%; right: -20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,124,0.15) 0%, transparent 70%); border-radius: 50%; }
.hero-content { position: relative; z-index: 1; max-width: 800px; padding: 0 20px; }
.hero-subtitle { font-size: 0.9rem; letter-spacing: 4px; text-transform: uppercase; color: var(--gray); margin-bottom: 20px; }
.hero h1 { font-family: var(--font-display); font-size: 3rem; font-weight: 400; margin-bottom: 20px; line-height: 1.1; }
.hero h1 span { color: var(--secondary); font-style: italic; }
.hero-tagline { font-size: 1.3rem; color: var(--primary); font-weight: 500; margin-bottom: 15px; }
.hero p { font-size: 1.1rem; color: var(--gray); max-width: 500px; margin: 0 auto 40px; }
.hero-sizes { display: inline-block; background: var(--secondary); color: #fff; padding: 8px 24px; border-radius: 30px; font-size: 0.9rem; font-weight: 500; letter-spacing: 1px; margin-bottom: 30px; }

/* Buttons */
.btn { display: inline-block; padding: 16px 48px; background: var(--primary); color: #fff; text-decoration: none; font-size: 0.85rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; border: none; cursor: pointer; }
.btn:hover { background: var(--secondary); transform: translateY(-2px); }
.btn-outline { background: transparent; border: 1px solid var(--primary); color: var(--primary); }
.btn-outline:hover { background: var(--primary); color: #fff; }

/* About */
.about { background: #fff; padding: 80px 40px; text-align: center; }
.about-content { max-width: 800px; margin: 0 auto; }
.about h2 { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 20px; font-weight: 400; }
.about h2 span { color: var(--secondary); }
.about p { font-size: 1.1rem; color: var(--gray); line-height: 1.8; }

/* Categories */
.categories { max-width: 1400px; margin: 60px auto; padding: 0 40px; }
.section-title { font-family: var(--font-display); font-size: 2.5rem; text-align: center; margin-bottom: 40px; font-weight: 400; }
.categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.category-card { position: relative; aspect-ratio: 3/4; overflow: hidden; cursor: pointer; }
.category-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.category-card:hover img { transform: scale(1.05); }
.category-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%); display: flex; align-items: flex-end; padding: 30px; }
.category-info h3 { font-family: var(--font-display); font-size: 1.5rem; color: #fff; font-weight: 400; margin-bottom: 8px; }
.category-info span { color: rgba(255,255,255,0.8); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }
.category-link { text-decoration: none; display: block; }

/* Products */
.products { background: #fff; padding: 80px 0; }
.products-grid { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.product-card { cursor: pointer; text-decoration: none; display: block; }
.product-image { aspect-ratio: 3/4; background: #f5f5f5; margin-bottom: 16px; position: relative; overflow: hidden; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.product-card:hover .product-image img { transform: scale(1.05); }
.product-tag { position: absolute; top: 15px; left: 15px; background: var(--secondary); color: #fff; padding: 4px 12px; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; }
.product-info h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 400; margin-bottom: 8px; color: var(--primary); }
.product-price { color: var(--secondary); font-weight: 500; }
.product-original { color: var(--gray); text-decoration: line-through; font-size: 0.85rem; margin-left: 10px; }

/* Features */
.features { max-width: 1400px; margin: 60px auto; padding: 60px 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; }
.feature-item i { font-size: 2rem; color: var(--secondary); margin-bottom: 20px; }
.feature-item h4 { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 10px; font-weight: 500; }
.feature-item p { color: var(--gray); font-size: 0.85rem; }

/* Instagram */
.instagram-section { background: #fff; padding: 80px 40px; text-align: center; }
.instagram-link { display: inline-flex; align-items: center; gap: 10px; color: var(--primary); text-decoration: none; font-size: 1.1rem; font-weight: 500; margin-bottom: 40px; transition: color 0.3s; }
.instagram-link:hover { color: var(--secondary); }
.instagram-link i { font-size: 1.5rem; }
.insta-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; max-width: 1000px; margin: 0 auto; }
.insta-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; transition: opacity 0.3s; }
.insta-grid img:hover { opacity: 0.8; }

/* Footer */
footer { background: var(--primary); color: #fff; padding: 60px 40px 30px; }
.footer-content { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 40px; }
.footer-brand .logo { color: #fff; margin-bottom: 20px; display: inline-block; }
.footer-brand p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.8; }
.footer-social { display: flex; gap: 15px; margin-top: 20px; }
.footer-social a { width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; transition: background 0.3s; }
.footer-social a:hover { background: var(--secondary); }
.footer-column h5 { font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 25px; font-weight: 500; }
.footer-column ul { list-style: none; }
.footer-column li { margin-bottom: 12px; }
.footer-column a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.3s; }
.footer-column a:hover { color: var(--secondary); }
.whatsapp-link { color: #25D366; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; text-align: center; color: rgba(255,255,255,0.4); font-size: 0.8rem; }

/* Page Header */
.page-header { background: linear-gradient(135deg, #f5f5f5 0%, #e8e4df 100%); padding: 60px 40px; text-align: center; }
.page-header h1 { font-family: var(--font-display); font-size: 3rem; font-weight: 400; margin-bottom: 10px; }
.page-header h1 span { color: var(--secondary); }
.page-header p { color: var(--gray); font-size: 1.1rem; }
.page-header .breadcrumb { margin-top: 20px; font-size: 0.85rem; }
.page-header .breadcrumb a { color: var(--gray); text-decoration: none; }
.page-header .breadcrumb a:hover { color: var(--secondary); }
.page-header .breadcrumb span { margin: 0 10px; color: var(--gray); }

/* Product Detail */
.product-detail { max-width: 1200px; margin: 60px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.product-gallery { aspect-ratio: 3/4; background: #f5f5f5; overflow: hidden; }
.product-gallery img { width: 100%; height: 100%; object-fit: cover; }
.product-info-detail h1 { font-family: var(--font-display); font-size: 2rem; font-weight: 400; margin-bottom: 10px; }
.product-sku { color: var(--gray); font-size: 0.85rem; margin-bottom: 20px; }
.product-price-detail { font-size: 2rem; color: var(--secondary); font-weight: 500; margin-bottom: 20px; }
.product-price-detail .original { text-decoration: line-through; color: var(--gray); font-size: 1.2rem; margin-left: 15px; }
.product-description { color: var(--gray); line-height: 1.8; margin-bottom: 30px; }
.product-sizes { margin-bottom: 30px; }
.product-sizes h4 { font-family: var(--font-display); font-size: 1rem; margin-bottom: 15px; }
.size-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
.size-btn { padding: 12px 20px; border: 1px solid var(--border); background: #fff; cursor: pointer; font-size: 0.9rem; transition: all 0.3s; }
.size-btn:hover { border-color: var(--secondary); }
.size-btn.selected { background: var(--secondary); color: #fff; border-color: var(--secondary); }
.product-actions { display: flex; gap: 15px; }
.btn-whatsapp { background: #25D366; color: #fff; padding: 16px 32px; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
.btn-whatsapp:hover { background: #20BD5A; transform: translateY(-2px); }

/* Category Filter */
.category-filter { max-width: 1400px; margin: 40px auto; padding: 0 40px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
.filter-btn { padding: 10px 24px; border: 1px solid var(--border); background: #fff; text-decoration: none; color: var(--primary); font-size: 0.85rem; transition: all 0.3s; }
.filter-btn:hover, .filter-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }

/* Responsive */
@media (max-width: 1024px) {
  .categories-grid, .products-grid { grid-template-columns: repeat(2, 1fr); }
  .features { grid-template-columns: repeat(2, 1fr); }
  .footer-content { grid-template-columns: repeat(2, 1fr); }
  .insta-grid { grid-template-columns: repeat(3, 1fr); }
  .product-detail { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .header-main { padding: 15px 20px; }
  nav { display: none; }
  .hero h1 { font-size: 2rem; }
  .categories-grid, .products-grid { grid-template-columns: 1fr; }
  .features, .footer-content { grid-template-columns: 1fr; }
  .insta-grid { grid-template-columns: repeat(2, 1fr); }
}
`

// Função para gerar o header
const generateHeader = (currentPage = '') => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona De Mim | Plus Size - Moda Para Mulheres Reais</title>
  <meta name="description" content="Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>${generateCSS()}</style>
</head>
<body>
  <a href="https://wa.me/557591561769" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <header>
    <div class="header-top">Moda Plus Size &bull; Do 46 ao 54 &bull; ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="${BASE_URL}#novidades">Novidades</a></li>
          <li><a href="${BASE_URL}blusas.html">Blusas</a></li>
          <li><a href="${BASE_URL}vestidos.html">Vestidos</a></li>
          <li><a href="${BASE_URL}conjuntos.html">Conjuntos</a></li>
          <li><a href="${BASE_URL}#contato">Contato</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="${BASE_URL}#busca" aria-label="Buscar"><i class="fas fa-search"></i></a>
        <a href="${BASE_URL}#favoritos" aria-label="Favoritos"><i class="far fa-heart"></i></a>
        <a href="${BASE_URL}#carrinho" aria-label="Carrinho"><i class="fas fa-shopping-bag"></i></a>
      </div>
    </div>
  </header>
`

// Função para gerar o footer
const generateFooter = () => `
  <section class="features">
    <div class="feature-item"><i class="fas fa-shipping-fast"></i><h4>Frete Grátis</h4><p>Frete grátis para pedidos acima de R$ 299</p></div>
    <div class="feature-item"><i class="fas fa-undo"></i><h4>Troca Fácil</h4><p>Troca em até 30 dias</p></div>
    <div class="feature-item"><i class="fas fa-lock"></i><h4>Compra Segura</h4><p>Seus dados protegidos</p></div>
    <div class="feature-item"><i class="fab fa-whatsapp"></i><h4>Atendimento</h4><p>Seg. a sáb., 9h às 19h</p></div>
  </section>

  <section class="instagram-section" id="contato">
    <a href="https://www.instagram.com/use_donademiim/" target="_blank" class="instagram-link">
      <i class="fab fa-instagram"></i>@use_donademiim
    </a>
    <div class="insta-grid">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.58.jpeg" alt="@use_donademiim">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.59.jpeg" alt="@use_donademiim">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.40.jpeg" alt="@use_donademiim">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.39.jpeg" alt="@use_donademiim">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.47.jpeg" alt="@use_donademiim">
      <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.46 (1).jpeg" alt="@use_donademiim">
    </div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
        <p>Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.<br><br><strong>A DONA</strong> - 75 9156-1769</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/use_donademiim/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/557591561769" target="_blank" aria-label="WhatsApp" class="whatsapp-link"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h5>Institucional</h5>
        <ul>
          <li><a href="${BASE_URL}#sobre">Sobre Nós</a></li>
          <li><a href="${BASE_URL}#lojas">Nossas Lojas</a></li>
          <li><a href="${BASE_URL}#trabalhe">Trabalhe Conosco</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Ajuda</h5>
        <ul>
          <li><a href="${BASE_URL}#ajuda">Central de Ajuda</a></li>
          <li><a href="${BASE_URL}#frete">Frete e Entrega</a></li>
          <li><a href="${BASE_URL}#trocas">Trocas e Devoluções</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Contato</h5>
        <ul>
          <li><a href="https://wa.me/557591561769" class="whatsapp-link"><i class="fab fa-whatsapp"></i> 75 9156-1769</a></li>
          <li><a href="https://www.instagram.com/use_donademiim/" target="_blank"><i class="fab fa-instagram"></i> @use_donademiim</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 DONA DE MIM. Todos os direitos reservados. Feito com ❤️ para mulheres reais.</p>
    </div>
  </footer>
</body>
</html>
`

// Função para gerar card de produto
const generateProductCard = (product: typeof products[0], baseUrl = BASE_URL) => {
  const price = product.preco_promocional || product.preco_venda
  const originalPrice = product.preco_promocional ? product.preco_venda : null
  const tag = product.lancamento ? 'Novo' : (product.destaque ? 'Destaque' : (product.em_promocao ? 'Promoção' : null))
  
  // Tentar múltiplos padrões de nome de arquivo
  const patterns = [
    `assets/imgs/produtos/${product.categoria}/${product.sku}-${product.slug}.jpeg`,
    `assets/imgs/produtos/${product.categoria}/${product.sku}-${product.imagem_principal.arquivo_original}`,
    `assets/imgs/colecoes/${product.imagem_principal.arquivo_original}`,
  ]
  const imgPath = baseUrl + patterns[0]
  const fallbackPath = baseUrl + 'assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.45.jpeg'
  
  return `
    <a href="${baseUrl}produto-${product.slug}.html" class="product-card">
      <div class="product-image">
        ${tag ? `<span class="product-tag">${tag}</span>` : ''}
        <img src="${imgPath}" alt="${product.nome}" onerror="this.src='${fallbackPath}'">
      </div>
      <div class="product-info">
        <h4>${product.nome}</h4>
        <p class="product-price">R$ ${price.toFixed(2).replace('.', ',')}${originalPrice ? `<span class="product-original">R$ ${originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}</p>
      </div>
    </a>
  `
}

// Função para gerar card de categoria
const generateCategoryCard = (categoria: string, titulo: string, imagem: string, baseUrl = BASE_URL) => {
  const categoryImages: Record<string, string> = {
    'vestidos': 'WhatsApp Image 2026-02-19 at 13.18.47 (1).jpeg',
    'blusas': 'WhatsApp Image 2026-02-19 at 13.18.48.jpeg',
    'conjuntos': 'WhatsApp Image 2026-02-19 at 13.18.46.jpeg',
    'shorts': 'WhatsApp Image 2026-02-19 at 13.18.52.jpeg'
  }
  
  return `
    <a href="${baseUrl}${categoria}.html" class="category-link">
      <div class="category-card">
        <img src="${baseUrl}assets/imgs/colecoes/${categoryImages[categoria] || 'WhatsApp Image 2026-02-19 at 13.18.45.jpeg'}" alt="${titulo}">
        <div class="category-overlay">
          <div class="category-info">
            <h3>${titulo}</h3>
            <span>Ver coleção</span>
          </div>
        </div>
      </div>
    </a>
  `
}

// ============================================
// GERAR PÁGINAS
// ============================================

console.log('🎀 Gerando páginas estáticas para Dona de Mim...')
console.log(`📦 Total de produtos: ${products.length}`)

// 1. Gerar index.html atualizado
const indexContent = `
${generateHeader()}

<section class="hero">
  <div class="hero-content">
    <p class="hero-subtitle">Moda Plus Size</p>
    <h1>Realçando As Curvas <span>De Quem É</span> Dona De Si</h1>
    <p class="hero-tagline">Moda Para Mulheres Reais ❤️</p>
    <span class="hero-sizes">Do 46 ao 54</span>
    <br><br>
    <a href="${BASE_URL}blusas.html" class="btn">Ver Coleção</a>
  </div>
</section>

<section class="about" id="sobre">
  <div class="about-content">
    <h2>Bem-vinda à <span>Dona De Mim</span></h2>
    <p>Somos uma marca feita para mulheres reais, que celebra a diversidade e a beleza de cada corpo. Nossa missão é realçar suas curvas com peças exclusivas, modernas e cheias de estilo. Do 46 ao 54, aqui você encontra moda que te representa. <strong>A DONA</strong> é quem decide o que usar. ❤️</p>
  </div>
</section>

<section class="categories" id="colecoes">
  <h2 class="section-title">Nossas Coleções</h2>
  <div class="categories-grid">
    ${generateCategoryCard('vestidos', 'Vestidos', '')}
    ${generateCategoryCard('blusas', 'Blusas', '')}
    ${generateCategoryCard('conjuntos', 'Conjuntos', '')}
  </div>
</section>

<section class="products" id="novidades">
  <h2 class="section-title">Novidades</h2>
  <div class="products-grid">
    ${products.filter(p => p.ativo).slice(0, 8).map(p => generateProductCard(p)).join('')}
  </div>
</section>

${generateFooter()}
`

// 2. Gerar páginas de categorias
const categorias = [
  { slug: 'blusas', titulo: 'Blusas Plus Size', products: products.filter(p => p.categoria === 'blusas' && p.ativo) },
  { slug: 'vestidos', titulo: 'Vestidos Plus Size', products: products.filter(p => p.categoria === 'vestidos' && p.ativo) },
  { slug: 'conjuntos', titulo: 'Conjuntos Plus Size', products: products.filter(p => p.categoria === 'conjuntos' && p.ativo) },
  { slug: 'shorts', titulo: 'Shorts Plus Size', products: products.filter(p => p.categoria === 'shorts' && p.ativo) },
]

for (const cat of categorias) {
  const pageContent = `
${generateHeader()}

<div class="page-header">
  <h1>${cat.titulo}</h1>
  <p>${cat.products.length} peças exclusivas esperando por você</p>
  <div class="breadcrumb">
    <a href="${BASE_URL}">Início</a><span>›</span>${cat.titulo}
  </div>
</div>

<section class="products">
  <div class="products-grid">
    ${cat.products.map(p => generateProductCard(p)).join('')}
  </div>
</section>

${generateFooter()}
`
  await Bun.write(`./${cat.slug}.html`, pageContent)
  console.log(`✅ Gerado: ${cat.slug}.html (${cat.products.length} produtos)`)
}

// 3. Gerar páginas de produtos individuais
for (const product of products.filter(p => p.ativo)) {
  // Usar SKU para imagem correta
  const imgPath = `${BASE_URL}assets/imgs/produtos/${product.categoria}/${product.sku}-${product.slug}.jpeg`
  
  const sizes = product.tamanhos_disponiveis.map(s => 
    `<button class="size-btn" onclick="selectSize(${s})">${s}</button>`
  ).join('')
  
  const price = product.preco_promocional || product.preco_venda
  const originalPrice = product.preco_promocional ? product.preco_venda : null
  
  // Mensagem WhatsApp
  const whatsappMsg = encodeURIComponent(`Olá! Gostaria de comprar:\n\n*${product.nome}*\nTamanho: \nQuantidade: 1\n\nValor: R$ ${price.toFixed(2).replace('.', ',')}`)
  
  const productContent = `
${generateHeader()}

<div class="page-header">
  <h1>${product.nome}</h1>
  <p class="breadcrumb">
    <a href="${BASE_URL}">Início</a><span>›</span>
    <a href="${BASE_URL}${product.categoria}.html">${product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}</a><span>›</span>
    ${product.nome}
  </p>
</div>

<section class="product-detail">
  <div class="product-gallery">
    <img src="${BASE_URL}${imgPath}" alt="${product.nome}" onerror="this.src='${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.45.jpeg'">
  </div>
  <div class="product-info-detail">
    <h1>${product.nome}</h1>
    <p class="product-sku">SKU: ${product.sku}</p>
    <p class="product-price-detail">
      R$ ${price.toFixed(2).replace('.', ',')}
      ${originalPrice ? `<span class="original">R$ ${originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
    </p>
    <p class="product-description">${product.descricao_curta || product.descricao.split('\\n')[0]}</p>
    
    <div class="product-sizes">
      <h4>Selecione o tamanho:</h4>
      <div class="size-buttons">
        ${sizes}
      </div>
    </div>
    
    <div class="product-actions">
      <a href="https://wa.me/557591561769?text=${whatsappMsg}" class="btn-whatsapp" target="_blank">
        <i class="fab fa-whatsapp"></i> Comprar via WhatsApp
      </a>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 10px;"><strong>Material:</strong> ${product.material}</p>
      <p style="font-size: 0.9rem; color: var(--gray);"><strong>Cuidados:</strong> ${product.cuidados}</p>
    </div>
  </div>
</section>

<section class="products" style="padding-top: 40px;">
  <h2 class="section-title">Outros produtos que você pode gostar</h2>
  <div class="products-grid">
    ${products.filter(p => p.categoria === product.categoria && p.id !== product.id && p.ativo).slice(0, 4).map(p => generateProductCard(p)).join('')}
  </div>
</section>

${generateFooter()}

<script>
function selectSize(size) {
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
}
</script>
`
  
  await Bun.write(`./produto-${product.slug}.html`, productContent)
  console.log(`✅ Gerado: produto-${product.slug}.html`)
}

// 4. Sobrescrever index.html
await Bun.write('./index.html', indexContent)

console.log('\\n🎉 Todas as páginas geradas com sucesso!')
console.log(`📄 Páginas geradas: ${1 + categorias.length + products.filter(p => p.ativo).length}`)
