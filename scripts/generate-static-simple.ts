#!/usr/bin/env bun
// ============================================
// DONA DE MIM - Gerador de Páginas Estáticas
// Gera HTML estático para GitHub Pages usando as views do servidor
// ============================================

import { mkdirSync, writeFileSync, rmSync, readdirSync, cpSync } from 'fs'
import { products, categories } from '../src/data/products'
import { HomePage } from '../src/views/home'
import { ProductPage } from '../src/views/product'
import { CategoryPage } from '../src/views/category'
import { SobreNosPage, GuiaTamanhosPage, PoliticasPage } from '../src/views/static'

const OUTPUT_DIR = './products'

// Limpar pasta de saída
console.log('🗑️  Limpando pasta de saída...')
try {
  rmSync(OUTPUT_DIR, { recursive: true, force: true })
} catch (e) {}
mkdirSync(OUTPUT_DIR, { recursive: true })

// Criar subpastas
mkdirSync(`${OUTPUT_DIR}/assets/css`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/assets/js`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/shorts`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/conjuntos`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/macacoes`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/bodys`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/blusas`, { recursive: true })
mkdirSync(`${OUTPUT_DIR}/imgs/produtos/vestidos`, { recursive: true })

// Copiar imagens dos produtos

const copiarImagens = (categoria: string) => {
  try {
    const files = readdirSync(`./public/imgs/${categoria}`)
    for (const file of files) {
      if (file.endsWith('.jpeg')) {
        cpSync(`./public/imgs/${categoria}/${file}`, `${OUTPUT_DIR}/imgs/produtos/${categoria}/${file}`)
      }
    }
    console.log(`   ✓ Imagens de ${categoria} copiadas`)
  } catch (e) {
    console.log(`   ⚠ Erro ao copiar ${categoria}:`, e)
  }
}

copiarImagens('shorts')
copiarImagens('conjuntos')
copiarImagens('macacoes')
copiarImagens('bodys')

// Copiar CSS e JS
const cssContent = `
/* Dona de Mim - Styles */
:root {
  --primary: #1a1a1a;
  --secondary: #c9a87c;
  --accent: #8b7355;
  --bg: #ffffff;
  --text: #1a1a1a;
  --border: #e0e0e0;
  --shadow: rgba(0,0,0,0.1);
  --shadow-hover: rgba(0,0,0,0.15);
}

[data-theme="dark"] {
  --primary: #f5f5f5;
  --secondary: #d4b484;
  --accent: #9c8365;
  --bg: #1a1a1a;
  --text: #f5f5f5;
  --border: #333;
  --shadow: rgba(0,0,0,0.3);
  --shadow-hover: rgba(0,0,0,0.5);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Poppins', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

a { text-decoration: none; color: inherit; }

/* Header */
header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-top {
  background: var(--primary);
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.logo span { color: var(--secondary); }

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
}

nav a {
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover { color: var(--secondary); }

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.header-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text);
}

.cart-btn {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--secondary);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, var(--secondary), var(--accent));
  color: #fff;
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero span { color: var(--bg); }

.btn {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-hover);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.product-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-hover);
}

.product-image {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--secondary);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: 1rem;
}

.product-category {
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-info h4 {
  font-size: 1rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.price-current {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--secondary);
}

.product-sizes-mini {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.product-sizes-mini span {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
}

/* Footer */
footer {
  background: var(--primary);
  color: #fff;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto 2rem;
}

.footer-column h5 {
  margin-bottom: 1rem;
  color: var(--secondary);
}

.footer-column ul {
  list-style: none;
}

.footer-column li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--accent);
  font-size: 0.875rem;
}

/* Static Pages */
.static-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.static-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--secondary), var(--accent));
  color: #fff;
  border-radius: 8px;
}

.static-content section {
  margin-bottom: 3rem;
}

.static-content h2 {
  margin-bottom: 1.5rem;
  color: var(--secondary);
}

/* Floating WhatsApp */
.floating-whatsapp {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #25D366;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  z-index: 999;
}

.floating-whatsapp:hover {
  transform: scale(1.1);
}
`

const jsContent = `
// Dona de Mim - App JS
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement
      const current = html.getAttribute('data-theme')
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
      themeToggle.innerHTML = current === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'
    })
  }

  // Search Modal
  const searchBtn = document.getElementById('searchBtn')
  const searchModal = document.getElementById('searchModal')
  const searchClose = document.getElementById('searchClose')

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.style.display = 'flex'
      document.getElementById('searchInput')?.focus()
    })

    searchClose?.addEventListener('click', () => {
      searchModal.style.display = 'none'
    })

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.style.display = 'none'
      }
    })
  }
})
`

writeFileSync(`${OUTPUT_DIR}/assets/css/styles.css`, cssContent)
writeFileSync(`${OUTPUT_DIR}/assets/js/app.js`, jsContent)

// Gerar páginas
console.log('📄 Gerando páginas...')

// Home
writeFileSync(`${OUTPUT_DIR}/index.html`, HomePage(0))
console.log('   ✓ index.html')

// Páginas institucionais
writeFileSync(`${OUTPUT_DIR}/sobre-nos.html`, SobreNosPage(0))
console.log('   ✓ sobre-nos.html')

writeFileSync(`${OUTPUT_DIR}/guia-tamanhos.html`, GuiaTamanhosPage(0))
console.log('   ✓ guia-tamanhos.html')

writeFileSync(`${OUTPUT_DIR}/politicas.html`, PoliticasPage(0))
console.log('   ✓ politicas.html')

// Páginas de categoria
const categorias = ['vestidos', 'blusas', 'shorts', 'conjuntos', 'macacoes', 'bodys']
for (const cat of categorias) {
  writeFileSync(`${OUTPUT_DIR}/${cat}.html`, CategoryPage(cat, 0))
  console.log(`   ✓ ${cat}.html`)
}

// Páginas de produto
for (const product of products) {
  if (product.ativo) {
    writeFileSync(`${OUTPUT_DIR}/produto-${product.slug}.html`, ProductPage(product.slug, 0))
  }
}
console.log(`   ✓ ${products.length} páginas de produto`)

console.log('\n✅ Páginas estáticas geradas com sucesso!')
console.log(`📁 Output: ${OUTPUT_DIR}/`)
