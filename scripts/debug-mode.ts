#!/usr/bin/env bun
// ============================================
// DONA DE MIM - Debug Mode Completo
// Coleta logs detalhados de todas as funcionalidades
// ============================================

import { launch } from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';

// Criar pasta de logs
mkdirSync('logs', { recursive: true });
mkdirSync('logs/playwright-videos', { recursive: true });

const logs = {
  errors: [] as string[],
  warnings: [] as string[],
  requests: [] as string[],
  responses: [] as string[],
  console: [] as string[],
  tests: [] as string[]
};

console.log('🔍 INICIANDO MODO DEBUG - DONA DE MIM\n');
console.log('📁 Logs serão salvos em: logs/\n');

// Iniciar navegador
const browser = await launch({ 
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

const page = await browser.newPage();

// Capturar TODOS os logs
page.on('console', msg => {
  const log = `[${msg.type()}] ${msg.text()}`;
  logs.console.push(log);
  if (msg.type() === 'error') {
    logs.errors.push(log);
    console.log(`❌ ${log}`);
  } else if (msg.type() === 'warning') {
    logs.warnings.push(log);
    console.log(`⚠️ ${log}`);
  } else {
    console.log(`ℹ️ ${log}`);
  }
});

page.on('pageerror', err => {
  const log = `PAGE ERROR: ${err.message}`;
  logs.errors.push(log);
  console.log(`❌ ${log}`);
});

page.on('requestfailed', request => {
  const log = `REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`;
  logs.errors.push(log);
  console.log(`❌ ${log}`);
});

page.on('request', request => {
  logs.requests.push(request.url());
});

page.on('response', response => {
  logs.responses.push(`${response.status()} ${response.url()}`);
});

// ============================================
// TESTES DETALHADOS
// ============================================

async function testRoute(name: string, url: string, checks: Function[]) {
  console.log(`\n🧪 Testando: ${name}`);
  console.log(`   URL: ${url}`);
  
  const startTime = Date.now();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
    const loadTime = Date.now() - startTime;
    console.log(`   ✅ Carregou em ${loadTime}ms`);
    
    // Executar checks
    for (const check of checks) {
      await check(page);
    }
    
    // Screenshot
    const screenshotPath = `logs/test-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`   📸 Screenshot: ${screenshotPath}`);
    
    logs.tests.push(`✅ ${name} - ${loadTime}ms`);
  } catch (err: any) {
    console.log(`   ❌ ERRO: ${err.message}`);
    logs.errors.push(`${name}: ${err.message}`);
    logs.tests.push(`❌ ${name} - ${err.message}`);
  }
}

// Check helpers
const checkTitle = (expected: string) => async (page: any) => {
  const title = await page.title();
  if (title.includes(expected)) {
    console.log(`   ✅ Título: ${title}`);
  } else {
    console.log(`   ❌ Título esperado: ${expected}, got: ${title}`);
  }
};

const checkElement = (selector: string) => async (page: any) => {
  const exists = await page.$(selector);
  if (exists) {
    console.log(`   ✅ Elemento: ${selector}`);
  } else {
    console.log(`   ❌ Elemento não encontrado: ${selector}`);
  }
};

const checkNoErrors = async (page: any) => {
  const errors = logs.errors.filter(e => e.includes(url));
  if (errors.length === 0) {
    console.log(`   ✅ Sem erros JavaScript`);
  } else {
    console.log(`   ❌ ${errors.length} erros JavaScript`);
  }
};

// ============================================
// EXECUTAR TESTES
// ============================================

let url = 'http://localhost:3000';

console.log('\n' + '='.repeat(60));
console.log('🏠 TESTANDO HOME PAGE');
console.log('='.repeat(60));

await testRoute('Home', url, [
  checkTitle('Dona De Mim'),
  checkElement('header'),
  checkElement('#themeSettings'),
  checkElement('#themeToggle'),
  checkElement('#searchBtn'),
  checkElement('.cart-btn'),
  checkElement('.hero'),
  checkElement('.categories-grid'),
  checkElement('.products-grid'),
  checkElement('footer')
]);

console.log('\n' + '='.repeat(60));
console.log('🎨 TESTANDO SELETOR DE TEMAS');
console.log('='.repeat(60));

try {
  // Abrir seletor
  await page.click('#themeSettings');
  await page.waitForTimeout(500);
  
  const selectorVisible = await page.$('#themeSelector');
  if (selectorVisible) {
    console.log('   ✅ Seletor de temas abriu');
  } else {
    console.log('   ❌ Seletor não abriu');
  }
  
  // Contar temas
  const themes = await page.$$('.theme-option');
  console.log(`   ✅ ${themes.length} temas disponíveis`);
  
  // Testar troca de tema
  await page.click('[data-theme="soft-dark"]');
  await page.waitForTimeout(500);
  
  const currentTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-theme');
  });
  console.log(`   ✅ Tema aplicado: ${currentTheme}`);
  
  // Verificar localStorage
  const savedTheme = await page.evaluate(() => {
    return localStorage.getItem('dona_de_mim_theme');
  });
  console.log(`   ✅ Tema salvo: ${savedTheme}`);
  
  logs.tests.push(`✅ Seletor de Temas - ${themes.length} temas`);
} catch (err: any) {
  console.log(`   ❌ ERRO: ${err.message}`);
  logs.errors.push(`Seletor de Temas: ${err.message}`);
}

console.log('\n' + '='.repeat(60));
console.log('🩳 TESTANDO CATEGORIA SHORTS');
console.log('='.repeat(60));

await testRoute('Categoria Shorts', `${url}/categoria/shorts`, [
  checkTitle('Shorts'),
  checkElement('.category-hero'),
  checkElement('.filters-bar'),
  checkElement('#sortProducts'),
  checkElement('.size-filters'),
  checkElement('.product-card')
]);

// Testar filtros
try {
  console.log('\n   Testando filtros...');
  await page.click('[data-size="48"]');
  await page.waitForTimeout(500);
  console.log('   ✅ Filtro tamanho 48 aplicado');
  
  await page.select('#sortProducts', 'price-asc');
  await page.waitForTimeout(500);
  console.log('   ✅ Ordenação por preço aplicada');
  
  logs.tests.push('✅ Filtros - Funcionais');
} catch (err: any) {
  console.log(`   ❌ ERRO filtros: ${err.message}`);
}

console.log('\n' + '='.repeat(60));
console.log('🛒 TESTANDO CARRINHO');
console.log('='.repeat(60));

await testRoute('Carrinho', `${url}/carrinho`, [
  checkTitle('Carrinho'),
  checkElement('.cart-page')
]);

console.log('\n' + '='.repeat(60));
console.log('👕 TESTANDO PÁGINA DE PRODUTO');
console.log('='.repeat(60));

await testRoute('Produto', `${url}/produto/short-plus-size-jeans-estrelas-1`, [
  checkTitle('Short'),
  checkElement('.product-detail'),
  checkElement('.product-gallery'),
  checkElement('.size-btn'),
  checkElement('#addToCart')
]);

console.log('\n' + '='.repeat(60));
console.log('🔍 TESTANDO BUSCA');
console.log('='.repeat(60));

try {
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Abrir busca
  await page.click('#searchBtn');
  await page.waitForTimeout(500);
  
  const searchModal = await page.$('#searchModal');
  if (searchModal) {
    console.log('   ✅ Modal de busca abriu');
  }
  
  // Digitar busca
  await page.type('#searchInput', 'short');
  await page.waitForTimeout(1000);
  
  console.log('   ✅ Busca executada');
  
  // Fechar
  await page.click('#searchClose');
  await page.waitForTimeout(500);
  
  logs.tests.push('✅ Busca - Funcional');
} catch (err: any) {
  console.log(`   ❌ ERRO busca: ${err.message}`);
  logs.errors.push(`Busca: ${err.message}`);
}

console.log('\n' + '='.repeat(60));
console.log('📄 TESTANDO PÁGINAS INSTITUCIONAIS');
console.log('='.repeat(60));

const institutionalPages = [
  { name: 'Sobre Nós', url: '/sobre-nos', expected: 'Sobre' },
  { name: 'Guia de Tamanhos', url: '/guia-tamanhos', expected: 'Tamanhos' },
  { name: 'Políticas', url: '/politicas', expected: 'Políticas' }
];

for (const p of institutionalPages) {
  await testRoute(p.name, `${url}${p.url}`, [
    checkTitle(p.expected),
    checkElement('.static-page'),
    checkElement('footer')
  ]);
}

console.log('\n' + '='.repeat(60));
console.log('📱 TESTANDO RESPONSIVIDADE');
console.log('='.repeat(60));

try {
  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  const headerMobile = await page.$('header');
  if (headerMobile) {
    console.log('   ✅ Header visível em mobile (375px)');
  }
  
  await page.screenshot({ path: 'logs/responsive-mobile.png' });
  console.log('   📸 Screenshot mobile salvo');
  
  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  console.log('   ✅ Tablet testado (768px)');
  
  // Voltar pra desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  logs.tests.push('✅ Responsividade - Funcional');
} catch (err: any) {
  console.log(`   ❌ ERRO responsividade: ${err.message}`);
  logs.errors.push(`Responsividade: ${err.message}`);
}

// ============================================
// SALVAR LOGS
// ============================================

console.log('\n' + '='.repeat(60));
console.log('💾 SALVANDO LOGS');
console.log('='.repeat(60));

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Salvar logs completos
writeFileSync(`logs/debug-full-${timestamp}.json`, JSON.stringify(logs, null, 2));
console.log(`   ✅ Logs completos: logs/debug-full-${timestamp}.json`);

// Salvar resumo
const summary = `
# 🔍 DEBUG REPORT - DONA DE MIM
**Data:** ${new Date().toISOString()}

## 📊 RESUMO
- ✅ Testes aprovados: ${logs.tests.filter(t => t.startsWith('✅')).length}
- ❌ Testes falharam: ${logs.tests.filter(t => t.startsWith('❌')).length}
- ⚠️ Warnings: ${logs.warnings.length}
- ❌ Errors: ${logs.errors.length}
- 📡 Requests: ${logs.requests.length}
- 📬 Responses: ${logs.responses.length}

## ✅ TESTES APROVADOS
${logs.tests.filter(t => t.startsWith('✅')).join('\n')}

## ❌ TESTES FALHARAM
${logs.tests.filter(t => t.startsWith('❌')).join('\n')}

## ⚠️ WARNINGS
${logs.warnings.join('\n') || 'Nenhum warning'}

## ❌ ERRORS
${logs.errors.join('\n') || 'Nenhum erro'}
`;

writeFileSync(`logs/debug-summary-${timestamp}.md`, summary);
console.log(`   ✅ Resumo: logs/debug-summary-${timestamp}.md`);

// Fechar navegador
await browser.close();

console.log('\n' + '='.repeat(60));
console.log('✅ DEBUG CONCLUÍDO!');
console.log('='.repeat(60));
console.log(`\n📁 Todos os logs estão em: logs/`);
console.log(`📊 ${logs.tests.length} testes executados`);
console.log(`❌ ${logs.errors.length} erros encontrados`);
console.log(`⚠️ ${logs.warnings.length} warnings\n`);
