#!/usr/bin/env bun
// ============================================
// DONA DE MIM - Popular Banco de Dados
// Script para inserir produtos corrigidos no SQLite
// ============================================

import { Database } from 'bun:sqlite'
import { products } from '../src/data/products'

const db = new Database('./database/produtos.db')

// Habilitar chaves estrangeiras
db.run('PRAGMA foreign_keys = ON;')

// Limpar dados existentes
console.log('🗑️  Limpando dados existentes...')
db.run('DELETE FROM produto_tamanhos')
db.run('DELETE FROM produto_imagens')
db.run('DELETE FROM produtos')

// Inserir produtos
console.log('📦 Inserindo produtos corrigidos...')

const insertProduto = db.prepare(`
  INSERT INTO produtos (
    sku, nome, slug, descricao, descricao_curta,
    categoria_id, preco_venda, preco_promocional,
    material, cuidados,
    destaque, lancamento, promocao, ativo,
    created_at, updated_at
  ) VALUES (
    ?, ?, ?, ?, ?,
    ?, ?, ?,
    ?, ?,
    ?, ?, ?, ?,
    ?, ?
  )
`)

const insertImagem = db.prepare(`
  INSERT INTO produto_imagens (
    produto_id, arquivo, arquivo_original,
    ordem, principal, alt_text,
    largura, altura, tamanho_bytes,
    created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertTamanhos = db.prepare(`
  INSERT OR IGNORE INTO produto_tamanhos (produto_id, tamanho_id, estoque)
  VALUES (?, ?, 10)
`)

const now = new Date().toISOString()

for (const product of products) {
  console.log(`   → ${product.sku}: ${product.nome}`)
  
  // Inserir produto
  const result = insertProduto.run(
    product.sku,
    product.nome,
    product.slug,
    product.descricao,
    product.descricao_curta,
    product.categoria_id,
    product.preco_venda,
    product.preco_promocional,
    product.material,
    product.cuidados,
    product.destaque ? 1 : 0,
    product.lancamento ? 1 : 0,
    product.em_promocao ? 1 : 0,
    product.ativo ? 1 : 0,
    now,
    now
  )
  
  const produtoId = result.lastInsertRowid as number
  
  // Inserir imagem principal
  insertImagem.run(
    produtoId,
    `imgs/produtos/${product.categoria}/${product.imagem_principal.arquivo_novo}`,
    product.imagem_principal.arquivo_original,
    0,  // ordem
    1,  // principal
    product.nome,
    product.imagem_principal.dimensoes.largura,
    product.imagem_principal.dimensoes.altura,
    product.imagem_principal.tamanho_bytes,
    now
  )
  
  // Inserir tamanhos (46, 48, 50, 52, 54)
  for (const tamanho of product.tamanhos_disponiveis) {
    const tamanhoResult = db.query('SELECT id FROM tamanhos WHERE numero = ?').get(tamanho) as { id: number } | undefined
    if (tamanhoResult) {
      insertTamanhos.run(produtoId, tamanhoResult.id)
    }
  }
}

console.log(`\n✅ ${products.length} produtos inseridos com sucesso!`)

// Verificar totais por categoria
const totals = db.query(`
  SELECT c.nome, COUNT(p.id) as total
  FROM produtos p
  JOIN categorias c ON p.categoria_id = c.id
  GROUP BY p.categoria_id
  ORDER BY c.ordem
`).all() as Array<{ nome: string; total: number }>

console.log('\n📊 Resumo por categoria:')
for (const t of totals) {
  console.log(`   ${t.nome}: ${t.total} produtos`)
}

db.close()
