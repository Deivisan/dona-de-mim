#!/usr/bin/env bun
// Script para corrigir nomes de arquivos no products.ts baseado nos arquivos REAIS

import { readdirSync } from 'fs'

// Ler arquivos reais de cada categoria
const categorias = ['shorts', 'conjuntos', 'macacoes', 'bodys']
const arquivosReais: Record<string, string[]> = {}

for (const cat of categorias) {
  try {
    arquivosReais[cat] = readdirSync(`./public/imgs/${cat}/`).filter(f => f.endsWith('.jpeg'))
    console.log(`✓ ${cat}: ${arquivosReais[cat].length} arquivos`)
  } catch (e) {
    arquivosReais[cat] = []
    console.log(`✗ ${cat}: erro ao ler`)
  }
}

// Ler products.ts
import { products } from './src/data/products'

console.log('\n🔍 Verificando inconsistências...')

for (const product of products) {
  const arquivoEsperado = product.imagem_principal.arquivo_novo
  const categoria = product.categoria
  
  // Verificar se arquivo existe
  const arquivosDaCategoria = arquivosReais[categoria] || []
  const arquivoExiste = arquivosDaCategoria.some(f => f === arquivoEsperado)
  
  if (!arquivoExiste) {
    // Tentar encontrar arquivo similar
    const arquivoSimilar = arquivosDaCategoria.find(f => f.startsWith(product.sku))
    
    if (arquivoSimilar) {
      console.log(`⚠️  ${product.sku}: "${arquivoEsperado}" → "${arquivoSimilar}"`)
    } else {
      console.log(`❌ ${product.sku}: "${arquivoEsperado}" (NÃO ENCONTRADO em ${categoria})`)
    }
  }
}

console.log('\n✅ Verificação concluída')
