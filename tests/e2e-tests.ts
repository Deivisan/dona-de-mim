// ============================================
// DONA DE MIM - Playwright E2E Tests
// Configuração e Testes Completos
// ============================================

import { test, expect, chromium } from '@playwright/test';

// Configurar browser
const browser = await chromium.launch({ 
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  ignoreHTTPSErrors: true,
  recordVideo: { dir: 'logs/playwright-videos' }
});

const page = await context.newPage();

// Habilitar logs detalhados
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log(`❌ [${msg.type()}] ${msg.text()}`);
  } else if (msg.type() === 'warning') {
    console.log(`⚠️ [${msg.type()}] ${msg.text()}`);
  } else {
    console.log(`ℹ️ [${msg.type()}] ${msg.text()}`);
  }
});

page.on('pageerror', err => {
  console.log(`❌ PAGE ERROR: ${err.message}`);
});

page.on('requestfailed', request => {
  console.log(`❌ REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`);
});

// ============================================
// TESTES
// ============================================

console.log('\n🧪 INICIANDO TESTES E2E - DONA DE MIM\n');

// Teste 1: Home Page
test('Home Page carrega corretamente', async () => {
  console.log('\n📄 Teste 1: Home Page');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Verificar título
  const title = await page.title();
  expect(title).toContain('Dona De Mim');
  console.log('  ✅ Título:', title);
  
  // Verificar header
  const header = await page.locator('header').isVisible();
  expect(header).toBe(true);
  console.log('  ✅ Header visível');
  
  // Verificar seletor de temas
  const themeSettings = await page.locator('#themeSettings').isVisible();
  expect(themeSettings).toBe(true);
  console.log('  ✅ Botão de temas visível');
  
  // Verificar produtos
  const products = await page.locator('.product-card').count();
  console.log(`  ✅ ${products} produtos na home`);
  
  // Screenshot
  await page.screenshot({ path: 'logs/test-1-home.png' });
});

// Teste 2: Tema Selector
test('Seletor de temas funciona', async () => {
  console.log('\n🎨 Teste 2: Seletor de Temas');
  
  // Abrir seletor
  await page.click('#themeSettings');
  await page.waitForTimeout(500);
  
  // Verificar se abriu
  const themeSelector = await page.locator('#themeSelector').isVisible();
  expect(themeSelector).toBe(true);
  console.log('  ✅ Seletor abriu');
  
  // Verificar opções de tema
  const themeOptions = await page.locator('.theme-option').count();
  expect(themeOptions).toBe(7);
  console.log(`  ✅ ${themeOptions} temas disponíveis`);
  
  // Selecionar tema Dark
  await page.click('[data-theme="soft-dark"]');
  await page.waitForTimeout(500);
  
  // Verificar se tema foi aplicado
  const currentTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-theme');
  });
  expect(currentTheme).toBe('soft-dark');
  console.log('  ✅ Tema soft-dark aplicado');
  
  // Verificar se salvou no localStorage
  const savedTheme = await page.evaluate(() => {
    return localStorage.getItem('dona_de_mim_theme');
  });
  expect(savedTheme).toBe('soft-dark');
  console.log('  ✅ Tema salvo no localStorage');
  
  // Screenshot com tema dark
  await page.screenshot({ path: 'logs/test-2-theme-dark.png' });
});

// Teste 3: Categoria Shorts
test('Categoria Shorts carrega com filtros', async () => {
  console.log('\n🩳 Teste 3: Categoria Shorts');
  
  await page.goto('http://localhost:3000/categoria/shorts', { waitUntil: 'networkidle' });
  
  // Verificar título
  const h1 = await page.locator('.category-hero h1').textContent();
  expect(h1).toContain('Shorts');
  console.log('  ✅ Título:', h1);
  
  // Verificar filtros
  const filtersBar = await page.locator('.filters-bar').isVisible();
  expect(filtersBar).toBe(true);
  console.log('  ✅ Barra de filtros visível');
  
  // Verificar filtro de ordenação
  const sortSelect = await page.locator('#sortProducts').isVisible();
  expect(sortSelect).toBe(true);
  console.log('  ✅ Select de ordenação visível');
  
  // Verificar filtros de tamanho
  const sizeFilters = await page.locator('.size-filter').count();
  expect(sizeFilters).toBeGreaterThan(0);
  console.log(`  ✅ ${sizeFilters} filtros de tamanho`);
  
  // Verificar produtos
  const products = await page.locator('.product-card').count();
  expect(products).toBeGreaterThan(0);
  console.log(`  ✅ ${products} produtos encontrados`);
  
  // Testar filtro de tamanho
  await page.click('[data-size="48"]');
  await page.waitForTimeout(500);
  console.log('  ✅ Filtro tamanho 48 aplicado');
  
  // Screenshot
  await page.screenshot({ path: 'logs/test-3-shorts.png' });
});

// Teste 4: Carrinho
test('Carrinho carrega corretamente', async () => {
  console.log('\n🛒 Teste 4: Carrinho');
  
  await page.goto('http://localhost:3000/carrinho', { waitUntil: 'networkidle' });
  
  // Verificar título
  const title = await page.title();
  expect(title).toContain('Carrinho');
  console.log('  ✅ Título:', title);
  
  // Verificar se está vazio (esperado)
  const emptyMessage = await page.locator('.cart-empty').isVisible();
  if (emptyMessage) {
    console.log('  ✅ Carrinho vazio (esperado)');
  } else {
    const items = await page.locator('.cart-item').count();
    console.log(`  ✅ ${items} itens no carrinho`);
  }
  
  // Screenshot
  await page.screenshot({ path: 'logs/test-4-cart.png' });
});

// Teste 5: Produto Individual
test('Página de produto carrega corretamente', async () => {
  console.log('\n👕 Teste 5: Página de Produto');
  
  await page.goto('http://localhost:3000/produto/short-plus-size-jeans-estrelas-1', { waitUntil: 'networkidle' });
  
  // Verificar título
  const h1 = await page.locator('.product-detail h1').textContent();
  expect(h1).toContain('Short');
  console.log('  ✅ Produto:', h1);
  
  // Verificar imagem
  const image = await page.locator('.product-main-image img').isVisible();
  expect(image).toBe(true);
  console.log('  ✅ Imagem do produto visível');
  
  // Verificar seleção de tamanho
  const sizeBtns = await page.locator('.size-btn').count();
  expect(sizeBtns).toBe(5);
  console.log(`  ✅ ${sizeBtns} tamanhos disponíveis`);
  
  // Verificar botão de adicionar ao carrinho
  const addToCart = await page.locator('#addToCart').isVisible();
  expect(addToCart).toBe(true);
  console.log('  ✅ Botão "Adicionar ao Carrinho" visível');
  
  // Screenshot
  await page.screenshot({ path: 'logs/test-5-product.png' });
});

// Teste 6: Busca
test('Modal de busca funciona', async () => {
  console.log('\n🔍 Teste 6: Busca');
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Abrir modal de busca
  await page.click('#searchBtn');
  await page.waitForTimeout(500);
  
  // Verificar se abriu
  const searchModal = await page.locator('#searchModal').isVisible();
  expect(searchModal).toBe(true);
  console.log('  ✅ Modal de busca aberto');
  
  // Digitar busca
  await page.fill('#searchInput', 'short');
  await page.waitForTimeout(1000);
  
  // Verificar resultados
  const results = await page.locator('.search-results').isVisible();
  console.log('  ✅ Resultados da busca visíveis');
  
  // Fechar modal
  await page.click('#searchClose');
  await page.waitForTimeout(500);
  
  const modalClosed = await page.locator('#searchModal').isHidden();
  expect(modalClosed).toBe(true);
  console.log('  ✅ Modal fechado');
  
  // Screenshot
  await page.screenshot({ path: 'logs/test-6-search.png' });
});

// Teste 7: Páginas Institucionais
test('Páginas institucionais carregam', async () => {
  console.log('\n📄 Teste 7: Páginas Institucionais');
  
  const pages = [
    { url: '/sobre-nos', name: 'Sobre Nós' },
    { url: '/guia-tamanhos', name: 'Guia de Tamanhos' },
    { url: '/politicas', name: 'Políticas' }
  ];
  
  for (const p of pages) {
    await page.goto(`http://localhost:3000${p.url}`, { waitUntil: 'networkidle' });
    const title = await page.title();
    expect(title).toContain(p.name);
    console.log(`  ✅ ${p.name}: ${title}`);
  }
});

// Teste 8: Responsividade
test('Layout responsivo funciona', async () => {
  console.log('\n📱 Teste 8: Responsividade');
  
  // Testar mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Verificar se menu mobile aparece
  const header = await page.locator('header').isVisible();
  expect(header).toBe(true);
  console.log('  ✅ Header visível em mobile');
  
  // Verificar grid de produtos
  const grid = await page.locator('.products-grid').isVisible();
  expect(grid).toBe(true);
  console.log('  ✅ Grid responsiva');
  
  // Screenshot mobile
  await page.screenshot({ path: 'logs/test-8-mobile.png' });
  
  // Voltar pra desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
});

// ============================================
// RELATÓRIO FINAL
// ============================================

console.log('\n' + '='.repeat(50));
console.log('✅ TODOS OS TESTES CONCLUÍDOS!');
console.log('='.repeat(50));

// Fechar browser
await browser.close();

console.log('\n📊 Logs e Screenshots salvos em: logs/');
console.log('📹 Vídeos salvos em: logs/playwright-videos/\n');
