// ============================================
// DONA DE MIM - Servidor Principal
// E-commerce Plus Size Feminino
// Runtime: Bun + Elysia
// ============================================

import { Database } from 'bun:sqlite'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { existsSync, readFileSync, statSync } from 'fs'
import { products } from './data/products'
import { CartPage, CategoryPage } from './views/category'
// Importar componentes (template strings, não JSX)
import { HomePage } from './views/home'
import { ProductPage } from './views/product'
import { SobreNosPage, GuiaTamanhosPage, PoliticasPage } from './views/static'

// Banco de dados
const db = new Database('./database/produtos.db')
db.run('PRAGMA journal_mode = WAL;')
db.run('PRAGMA synchronous = NORMAL;')

// Criar tabelas se não existirem
db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    tamanho INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    customer_email TEXT,
    total DECIMAL(10,2),
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.run(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    tamanho INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id)
  )
`)

// Funções do carrinho
function getCart(sessionId: string) {
  return db
    .query(`
    SELECT c.*, p.nome, p.preco_venda, p.categoria_id, pi.arquivo as imagem_arquivo
    FROM cart c
    JOIN produtos p ON p.id = c.product_id
    LEFT JOIN produto_imagens pi ON pi.produto_id = p.id AND pi.principal = 1
    WHERE c.session_id = ?
  `)
    .all(sessionId)
}

function addToCart(sessionId: string, productId: number, tamanho: number, quantity: number = 1) {
  const existing = db
    .query(`
    SELECT * FROM cart WHERE session_id = ? AND product_id = ? AND tamanho = ?
  `)
    .get(sessionId, productId, tamanho)

  if (existing) {
    db.run(`UPDATE cart SET quantity = quantity + ? WHERE id = ?`, [quantity, existing.id])
  } else {
    db.run(
      `
      INSERT INTO cart (session_id, product_id, tamanho, quantity)
      VALUES (?, ?, ?, ?)
    `,
      [sessionId, productId, tamanho, quantity],
    )
  }
}

function removeFromCart(sessionId: string, itemId: number) {
  db.run(`DELETE FROM cart WHERE id = ? AND session_id = ?`, [itemId, sessionId])
}

function updateCartQuantity(sessionId: string, itemId: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(sessionId, itemId)
  } else {
    db.run(`UPDATE cart SET quantity = ? WHERE id = ? AND session_id = ?`, [
      quantity,
      itemId,
      sessionId,
    ])
  }
}

function getCartTotal(sessionId: string) {
  const items = db
    .query(`
    SELECT c.quantity, c.product_id
    FROM cart c
    WHERE c.session_id = ?
  `)
    .all(sessionId) as any[]

  let total = 0
  for (const item of items) {
    const product = products.find((p) => p.id === item.product_id)
    if (product) {
      // Usar preço promocional se aplicável
      const price = product.em_promocao && product.preco_promocional 
        ? product.preco_promocional 
        : product.preco_venda
      total += price * item.quantity
    }
  }
  return total
}

function getCartCount(sessionId: string) {
  const result = db
    .query(`SELECT SUM(quantity) as count FROM cart WHERE session_id = ?`)
    .get(sessionId) as any
  return result?.count || 0
}

// Categorias válidas
const VALID_CATEGORIES = ['shorts', 'conjuntos', 'macacoes', 'bodys', 'vestidos', 'blusas']

// Gerar número do pedido
function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `DDM-${timestamp}-${random}`
}

// Servidor
const app = new Elysia()
  .use(cors())

  // Static files from public folder
  .get('/assets/css/:file', ({ params }) => {
    const filePath = `./public/assets/css/${params.file}`
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: { 'Content-Type': 'text/css' },
      })
    }
    return new Response('NOT_FOUND', { status: 404 })
  })
  .get('/assets/js/:file', ({ params }) => {
    const filePath = `./public/assets/js/${params.file}`
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: { 'Content-Type': 'application/javascript' },
      })
    }
    return new Response('NOT_FOUND', { status: 404 })
  })
  .get('/assets/imgs/:category/:file', ({ params }) => {
    const filePath = `./public/imgs/${params.category}/${params.file}`
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: { 'Content-Type': 'image/jpeg' },
      })
    }
    return new Response('NOT_FOUND', { status: 404 })
  })
  .get('/assets/imgs/colecoes/:file', ({ params }) => {
    const filePath = `./assets/imgs/colecoes/${params.file}`
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: { 'Content-Type': 'image/jpeg' },
      })
    }
    return new Response('NOT_FOUND', { status: 404 })
  })
  .get('/imgs/produtos/:category/:file', ({ params }) => {
    const filePath = `./public/imgs/${params.category}/${params.file}`
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: { 'Content-Type': 'image/jpeg' },
      })
    }
    return new Response('NOT_FOUND', { status: 404 })
  })

  // Middleware para session
  .derive(({ request }) => {
    const sessionId =
      request.headers.get('x-session-id') ||
      `session-${Date.now()}-${Math.random().toString(36).substring(7)}`
    return { sessionId }
  })

  // ==========================================
  // ROTAS DE PÁGINAS
  // ==========================================

  // Home
  .get('/', ({ sessionId }) => {
    const cartCount = getCartCount(sessionId)
    const html = HomePage(cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // Produto individual
  .get('/produto/:slug', ({ params, sessionId }) => {
    console.log('Looking for product:', params.slug)
    const product = products.find((p) => p.slug === params.slug)
    console.log('Found product:', product ? product.nome : 'NOT FOUND')
    if (!product) return new Response('Produto não encontrado', { status: 404 })

    const cartCount = getCartCount(sessionId)

    // ProductPage expects slug and cartCount - it finds product internally
    const html = ProductPage(params.slug, cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // ==========================================
  // PÁGINAS INSTITUCIONAIS (ANTES DE /categoria/:categoria)
  // ==========================================

  // Sobre Nós
  .get('/sobre-nos', ({ sessionId }) => {
    const cartCount = getCartCount(sessionId)
    const html = SobreNosPage(cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // Guia de Tamanhos
  .get('/guia-de-tamanhos', ({ sessionId }) => {
    const cartCount = getCartCount(sessionId)
    const html = GuiaTamanhosPage(cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // Políticas
  .get('/politicas', ({ sessionId }) => {
    const cartCount = getCartCount(sessionId)
    const html = PoliticasPage(cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // Categoria (DEPOIS das rotas específicas)
  .get('/categoria/:categoria', ({ params, sessionId }) => {
    // Validar categoria
    if (!VALID_CATEGORIES.includes(params.categoria)) {
      return new Response('<!DOCTYPE html><html lang="pt-BR"><head><title>Categoria não encontrada | Dona De Mim</title></head><body style="font-family: Poppins, sans-serif; text-align: center; padding: 50px;"><h1>Categoria não encontrada</h1><p>A categoria que você procura não existe.</p><a href="/" style="color: #c9a87c; text-decoration: none;">← Voltar à página inicial</a></body></html>', { 
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
    
    const cartCount = getCartCount(sessionId)

    const html = CategoryPage(params.categoria, cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // Carrinho
  .get('/carrinho', ({ sessionId }) => {
    const cartItems = getCart(sessionId)
    const total = getCartTotal(sessionId)
    const cartCount = getCartCount(sessionId)

    // Enriquecer itens do carrinho com dados do produto
    const enrichedItems = (cartItems as any[]).map((item) => {
      const product = products.find((p) => p.id === item.product_id)
      return {
        ...item,
        product,
      }
    })

    const html = CartPage(enrichedItems, total, cartCount)
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  })

  // ==========================================
  // API REST
  // ==========================================

  // Listar produtos
  .get('/api/produtos', () => {
    return { products, total: products.length }
  })

  // Produto por ID
  .get('/api/produtos/:id', ({ params }) => {
    const product = products.find((p) => p.id === parseInt(params.id))
    if (!product) return new Response('Produto não encontrado', { status: 404 })
    return product
  })

  // Produtos por categoria
  .get('/api/categoria/:categoria', ({ params }) => {
    const categoriaProdutos = products.filter((p) => p.categoria === params.categoria && p.ativo)
    return { products: categoriaProdutos, total: categoriaProdutos.length }
  })

  // Produtos em destaque
  .get('/api/destaques', () => {
    const destaques = products.filter((p) => p.destaque && p.ativo)
    return { products: destaques, total: destaques.length }
  })

  // Lançamentos
  .get('/api/lancamentos', () => {
    const lancamentos = products.filter((p) => p.lancamento && p.ativo)
    return { products: lancamentos, total: lancamentos.length }
  })

  // ==========================================
  // API DO CARRINHO
  // ==========================================

  // Obter carrinho
  .get('/api/cart', ({ sessionId }) => {
    const cartItems = getCart(sessionId)
    const total = getCartTotal(sessionId)
    const count = getCartCount(sessionId)

    const enrichedItems = (cartItems as any[]).map((item) => {
      const product = products.find((p) => p.id === item.product_id)
      return { ...item, product }
    })

    return { items: enrichedItems, total, count }
  })

  // Adicionar ao carrinho
  .post('/api/cart/add', async ({ body, sessionId }) => {
    const { productId, tamanho, quantity = 1 } = body as any

    // Validar produto
    const product = products.find((p) => p.id === productId)
    if (!product) {
      return { success: false, error: 'Produto não encontrado' }
    }

    // Validar tamanho
    if (!product.tamanhos_disponiveis.includes(tamanho)) {
      return { success: false, error: 'Tamanho indisponível' }
    }

    addToCart(sessionId, productId, tamanho, quantity)

    const count = getCartCount(sessionId)
    return { success: true, count, message: 'Produto adicionado ao carrinho!' }
  })

  // Remover do carrinho
  .delete('/api/cart/item/:itemId', ({ params, sessionId }) => {
    removeFromCart(sessionId, parseInt(params.itemId))
    const count = getCartCount(sessionId)
    return { success: true, count }
  })

  // Atualizar quantidade
  .patch('/api/cart/item/:itemId', async ({ params, body, sessionId }) => {
    const { quantity } = body as any
    updateCartQuantity(sessionId, parseInt(params.itemId), quantity)
    const count = getCartCount(sessionId)
    return { success: true, count }
  })

  // Limpar carrinho
  .delete('/api/cart/clear', ({ sessionId }) => {
    db.run(`DELETE FROM cart WHERE session_id = ?`, [sessionId])
    return { success: true, count: 0 }
  })

  // ==========================================
  // CHECKOUT
  // ==========================================

  // Finalizar pedido (envia para WhatsApp)
  .post('/api/checkout', async ({ body, sessionId }) => {
    const { customerName, customerPhone, customerEmail } = body as any

    const cartItems = getCart(sessionId)
    if ((cartItems as any[]).length === 0) {
      return { success: false, error: 'Carrinho vazio' }
    }

    const orderNumber = generateOrderNumber()
    const total = getCartTotal(sessionId)

    // Criar pedido
    db.run(
      `
      INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, total)
      VALUES (?, ?, ?, ?, ?)
    `,
      [orderNumber, customerName, customerPhone, customerEmail, total],
    )

    const orderId = db.query(`SELECT last_insert_rowid() as id`).get() as any

    // Adicionar itens do pedido
    for (const item of cartItems as any[]) {
      const product = products.find((p) => p.id === item.product_id)
      if (product) {
        db.run(
          `
          INSERT INTO order_items (order_id, product_id, tamanho, quantity, price)
          VALUES (?, ?, ?, ?, ?)
        `,
          [orderId.id, item.product_id, item.tamanho, item.quantity, 
            product.em_promocao && product.preco_promocional ? product.preco_promocional : product.preco_venda],
        )
      }
    }

    // Gerar mensagem WhatsApp
    let message = `🛍️ *NOVO PEDIDO - DONA DE MIM*\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `📦 *Pedido:* ${orderNumber}\n`
    message += `👤 *Cliente:* ${customerName}\n`
    message += `📱 *Telefone:* ${customerPhone}\n`
    if (customerEmail) message += `📧 *Email:* ${customerEmail}\n`
    message += `\n🛒 *ITENS DO PEDIDO:*\n`

    for (const item of cartItems as any[]) {
      const product = products.find((p) => p.id === item.product_id)
      if (product) {
        const itemPrice = product.em_promocao && product.preco_promocional 
          ? product.preco_promocional 
          : product.preco_venda
        message += `\n• ${product.nome}\n`
        message += `  Tamanho: ${item.tamanho} | Qtd: ${item.quantity}\n`
        message += `  R$ ${(itemPrice * item.quantity).toFixed(2)}\n`
      }
    }

    message += `\n━━━━━━━━━━━━━━━━━━━━\n`
    message += `💰 *TOTAL: R$ ${total.toFixed(2)}*\n`
    message += `\n✨ Obrigada por escolher a Dona de Mim!`

    // Limpar carrinho
    db.run(`DELETE FROM cart WHERE session_id = ?`, [sessionId])

    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/557591561769?text=${encodeURIComponent(message)}`

    return {
      success: true,
      orderNumber,
      total,
      whatsappUrl,
      message: 'Pedido realizado com sucesso!',
    }
  })

  // ==========================================
  // BUSCA
  // ==========================================

  .get('/api/busca', ({ query }) => {
    const q = ((query.q as string) || '').toLowerCase()
    if (!q) return { products: [], total: 0 }

    const resultados = products.filter(
      (p) =>
        p.ativo &&
        (p.nome.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)),
    )

    return { products: resultados, total: resultados.length }
  })

  // ==========================================
  // INICIAR SERVIDOR
  // ==========================================

  .listen(3000)

console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   💜 DONA DE MIM - E-commerce Plus Size                  ║
║   Moda Para Mulheres Reais ❤️                            ║
║                                                          ║
║   🚀 Servidor rodando em: http://localhost:3000          ║
║   📦 Produtos carregados: ${products.length}                             ║
║   🛍️ Tamanhos: 46 ao 54                                 ║
║                                                          ║
║   Instagram: @use_donademiim                             ║
║   WhatsApp: 75 9156-1769                                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`)
