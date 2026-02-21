// Debug script - Testar páginas
import { launch } from 'puppeteer'

const browser = await launch({ headless: true })
const page = await browser.newPage()

// Capturar erros de console
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('❌ CONSOLE ERROR:', msg.text())
  }
})

page.on('pageerror', err => {
  console.log('❌ PAGE ERROR:', err.message)
})

// Testar home
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

// Verificar imagens quebradas
const images = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img'))
  return imgs.map(img => ({
    src: img.src,
    alt: img.alt,
    naturalWidth: img.naturalWidth,
    complete: img.complete
  }))
})

console.log('\n📸 Status das Imagens:')
images.forEach(img => {
  if (img.naturalWidth === 0) {
    console.log(`❌ QUEBRADA: ${img.src}`)
  } else {
    console.log(`✅ OK: ${img.alt}`)
  }
})

// Verificar layout
const layout = await page.evaluate(() => {
  const header = document.querySelector('header')
  const hero = document.querySelector('.hero')
  const grid = document.querySelector('.products-grid')
  
  return {
    headerExists: !!header,
    headerVisible: header ? window.getComputedStyle(header).display !== 'none' : false,
    heroExists: !!hero,
    gridExists: !!grid,
    gridChildren: grid ? grid.children.length : 0
  }
})

console.log('\n🏗️ Layout:', layout)

// Screenshot
await page.screenshot({ path: '/tmp/debug-home.png', fullPage: true })
console.log('\n📸 Screenshot: /tmp/debug-home.png')

await browser.close()
