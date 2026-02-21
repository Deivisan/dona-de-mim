const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando navegador...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Capturar erros
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ CONSOLE:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('❌ PAGE ERROR:', err.message);
  });
  
  console.log('📄 Carregando http://localhost:3000...');
  await page.goto('http://localhost:3000', { 
    waitUntil: 'networkidle2',
    timeout: 10000
  });
  
  // Verificar layout
  const layout = await page.evaluate(() => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const categories = document.querySelector('.categories-grid');
    const highlights = document.querySelector('#highlights .products-grid');
    
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      loaded: img.complete && img.naturalWidth > 0,
      width: img.naturalWidth,
      height: img.naturalHeight
    }));
    
    return {
      header: !!header,
      hero: !!hero,
      categories: !!categories,
      highlights: !!highlights,
      totalImages: images.length,
      loadedImages: images.filter(i => i.loaded).length,
      brokenImages: images.filter(i => !i.loaded).map(i => i.src)
    };
  });
  
  console.log('\n🏗️ Layout:');
  console.log('  Header:', layout.header ? '✅' : '❌');
  console.log('  Hero:', layout.hero ? '✅' : '❌');
  console.log('  Categories Grid:', layout.categories ? '✅' : '❌');
  console.log('  Highlights:', layout.highlights ? '✅' : '❌');
  console.log(`\n📸 Imagens: ${layout.loadedImages}/${layout.totalImages} carregadas`);
  
  if (layout.brokenImages.length > 0) {
    console.log('\n❌ Imagens quebradas:');
    layout.brokenImages.forEach(src => console.log(`  - ${src}`));
  } else {
    console.log('\n✅ Todas as imagens carregaram!');
  }
  
  // Screenshot
  await page.screenshot({ path: '/tmp/home-screenshot.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/home-screenshot.png');
  
  await browser.close();
  console.log('\n✅ Teste concluído!');
})();
