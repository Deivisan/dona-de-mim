#!/usr/bin/env bun
// Test script - Verificar imagens e layout

import { $ } from 'bun'

// Iniciar servidor em background
console.log('🚀 Iniciando servidor...')
const server = Bun.spawn(['bun', 'run', '--hot', 'src/server.ts'], {
  cwd: process.cwd(),
  stdout: 'pipe',
  stderr: 'pipe',
})

// Esperar servidor iniciar
await new Promise(resolve => setTimeout(resolve, 3000))

// Testar endpoints
console.log('\n🧪 Testando endpoints...')

try {
  // Testar home
  const homeRes = await fetch('http://localhost:3000')
  const homeHtml = await homeRes.text()
  
  console.log('\n📄 Home:')
  console.log(`  Status: ${homeRes.status}`)
  console.log(`  Tamanho: ${homeHtml.length} bytes`)
  
  // Extrair imagens
  const imgMatches = homeHtml.match(/<img src="[^"]*"/g) || []
  console.log(`  Imagens encontradas: ${imgMatches.length}`)
  
  if (imgMatches.length > 0) {
    console.log('\n  Primeiras imagens:')
    imgMatches.slice(0, 5).forEach(img => {
      const src = img.match(/src="([^"]*)"/)?.[1]
      console.log(`    - ${src}`)
    })
  }
  
  // Testar API
  const apiRes = await fetch('http://localhost:3000/api/produtos')
  const apiData = await apiRes.json()
  
  console.log('\n📦 API Produtos:')
  console.log(`  Total: ${apiData.total}`)
  console.log(`  Primeiros produtos:`)
  apiData.products.slice(0, 3).forEach((p: any) => {
    console.log(`    ${p.sku}: ${p.categoria}/${p.imagem_principal.arquivo_novo}`)
  })
  
  // Testar imagem direta
  const imgRes = await fetch('http://localhost:3000/imgs/produtos/shorts/DDM-0001-short-plus-size-estrelas.jpeg')
  console.log('\n🖼️  Imagem direta:')
  console.log(`  Status: ${imgRes.status}`)
  console.log(`  Content-Type: ${imgRes.headers.get('content-type')}`)
  console.log(`  Tamanho: ${imgRes.headers.get('content-length')} bytes`)
  
  // Testar CSS
  const cssRes = await fetch('http://localhost:3000/assets/css/styles.css')
  console.log('\n🎨 CSS:')
  console.log(`  Status: ${cssRes.status}`)
  console.log(`  Tamanho: ${cssRes.headers.get('content-length')} bytes`)
  
} catch (err) {
  console.error('❌ Erro:', err)
}

// Matar servidor
server.kill()
console.log('\n✅ Teste concluído')
