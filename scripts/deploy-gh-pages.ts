#!/usr/bin/env bun
// Deploy direto para gh-pages com HTML completo

import { mkdirSync, writeFileSync, rmSync, readdirSync, cpSync, readFileSync } from 'fs'
import { products } from '../src/data/products'
import { HomePage } from '../src/views/home'
import { ProductPage } from '../src/views/product'
import { CategoryPage } from '../src/views/category'
import { SobreNosPage, GuiaTamanhosPage, PoliticasPage } from '../src/views/static'

const OUTPUT_DIR = '/tmp/gh-deploy'

console.log('🚀 Gerando páginas completas para gh-pages...')

// Copiar CSS e JS completos
console.log('📋 Copiar CSS e JS...')
const cssContent = readFileSync('./public/assets/css/styles.css', 'utf-8')
const jsContent = readFileSync('./public/assets/js/app.js', 'utf-8')
writeFileSync(`${OUTPUT_DIR}/assets/css/styles.css`, cssContent)
writeFileSync(`${OUTPUT_DIR}/assets/js/app.js`, jsContent)
console.log('   ✓ CSS e JS copiados')

// Copiar imagens
const copiarImagens = (categoria: string) => {
  try {
    const files = readdirSync(`./public/imgs/${categoria}`)
    for (const file of files) {
      if (file.endsWith('.jpeg')) {
        cpSync(`./public/imgs/${categoria}/${file}`, `${OUTPUT_DIR}/imgs/produtos/${categoria}/${file}`)
      }
    }
  } catch (e) {}
}
copiarImagens('shorts')
copiarImagens('conjuntos')
copiarImagens('macacoes')
copiarImagens('bodys')
console.log('   ✓ Imagens copiadas')

// Gerar páginas
console.log('📄 Gerando páginas HTML...')

// Home
writeFileSync(`${OUTPUT_DIR}/index.html`, HomePage(0))
console.log('   ✓ index.html')

// Institucionais
writeFileSync(`${OUTPUT_DIR}/sobre-nos.html`, SobreNosPage(0))
writeFileSync(`${OUTPUT_DIR}/guia-tamanhos.html`, GuiaTamanhosPage(0))
writeFileSync(`${OUTPUT_DIR}/politicas.html`, PoliticasPage(0))
console.log('   ✓ Páginas institucionais')

// Categorias
const categorias = ['vestidos', 'blusas', 'shorts', 'conjuntos', 'macacoes', 'bodys']
for (const cat of categorias) {
  writeFileSync(`${OUTPUT_DIR}/${cat}.html`, CategoryPage(cat, 0))
}
console.log('   ✓ Categorias')

// Produtos
for (const product of products) {
  if (product.ativo) {
    writeFileSync(`${OUTPUT_DIR}/produto-${product.slug}.html`, ProductPage(product.slug, 0))
  }
}
console.log(`   ✓ ${products.filter((p: any) => p.ativo).length} produtos`)

console.log('\n✅ Páginas geradas com sucesso!')

// Corrigir caminhos para relativos
console.log('🔧 Corrigindo caminhos para relativos...')
const htmlFiles = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.html'))
for (const file of htmlFiles) {
  let content = readFileSync(`${OUTPUT_DIR}/${file}`, 'utf-8')
  content = content.replace(/href="\/assets\//g, 'href="./assets/')
  content = content.replace(/src="\/assets\//g, 'src="./assets/')
  content = content.replace(/src="\/imgs\//g, 'src="./imgs/')
  content = content.replace(/href="\/categoria\/shorts"/g, 'href="./shorts.html"')
  content = content.replace(/href="\/categoria\/conjuntos"/g, 'href="./conjuntos.html"')
  content = content.replace(/href="\/categoria\/macacoes"/g, 'href="./macacoes.html"')
  content = content.replace(/href="\/categoria\/bodys"/g, 'href="./bodys.html"')
  content = content.replace(/href="\/categoria\/blusas"/g, 'href="./blusas.html"')
  content = content.replace(/href="\/categoria\/vestidos"/g, 'href="./vestidos.html"')
  content = content.replace(/href="\/produto\/([^"]+)"/g, 'href="./produto-$1.html"')
  content = content.replace(/href="\/carrinho"/g, 'href="./carrinho.html"')
  content = content.replace(/href="\/"/g, 'href="./index.html"')
  writeFileSync(`${OUTPUT_DIR}/${file}`, content)
}
console.log('   ✓ Caminhos corrigidos')
