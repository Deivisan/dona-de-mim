# 🛍️ Dona de Mim - E-commerce Plus Size

<p align="center">
  <img src="https://deivisan.github.io/dona-de-mim/public/imgs/conjuntos/DDM-0044-conjunto-plus-size-novo.jpeg" alt="Dona de Mim - Moda Plus Size" width="300">
</p>

<p align="center">
  <strong>Moda Para Mulheres Reais ❤️</strong><br>
  <em>Realçando as curvas de quem é dona de si</em>
</p>

<p align="center">
  <a href="https://deivisan.github.io/dona-de-mim/"><img src="https://img.shields.io/badge/🔗 Live Demo-GitHub Pages-blue" alt="Live Demo"></a>
  <a href="https://www.instagram.com/use_donademiim/"><img src="https://img.shields.io/badge/📸 Instagram-E1305C" alt="Instagram"></a>
  <a href="https://wa.me/557591561769"><img src="https://img.shields.io/badge/💬 WhatsApp-25D366" alt="WhatsApp"></a>
</p>

---

## 📋 Resumo do Projeto

**E-commerce Plus Size Feminino** - Loja de roupas para mulheres reais, tamanhos 46 ao 54.

| Campo | Valor |
|-------|-------|
| **Nome** | Dona de Mim |
| **Tagline** | Realçando As Curvas De Quem É Dona De Si |
| **Slogan** | Moda Para Mulheres Reais ❤️ |
| **Público-alvo** | Mulheres 25-50 anos |
| **Tamanhos** | 46, 48, 50, 52, 54 |
| **WhatsApp** | 75 9156-1769 |
| **Instagram** | @use_donademiim |
| **Deploy** | GitHub Pages |
| **Tecnologia** | Bun + Elysia + SQLite |

---

## 🔗 URLs do Site

| Página | URL |
|--------|-----|
| **Home** | https://deivisan.github.io/dona-de-mim/ |
| **Blusas** | https://deivisan.github.io/dona-de-mim/categoria/blusas |
| **Vestidos** | https://deivisan.github.io/dona-de-mim/categoria/vestidos |
| **Conjuntos** | https://deivisan.github.io/dona-de-mim/categoria/conjuntos |
| **Shorts** | https://deivisan.github.io/dona-de-mim/categoria/shorts |
| **Macacões** | https://deivisan.github.io/dona-de-mim/categoria/macacoes |
| **Bodys** | https://deivisan.github.io/dona-de-mim/categoria/bodys |

---

## ⚠️ Status: MVP Funcional ✅

> **Versão Atual:** v1.0 - Sistema operacional com dados reais processados manualmente.

### ✅ O que está funcionando:

- ✅ Landing page responsiva com design moderno
- ✅ Navegação entre categorias (blusas, vestidos, conjuntos, shorts, macacões, bodys)
- ✅ Páginas dinâmicas de produtos com detalhes
- ✅ Sistema de imagens múltiplas por produto (galeria)
- ✅ Botão WhatsApp para compras diretas
- ✅ Sistema de seleção de tamanhos

### O que precisa ser implementado:

- **Painel Administrativo** - CRUD de produtos
- **OCR de Imagens** - Extrair características automaticamente
- **Carrinho Persistente** - Salvar no localStorage/backend
- **Checkout** - Fluxo de finalização de compra
- **Domínio Próprio** - Configurar DNS
- Deploy Atual - https://deivisan.github.io/dona-de-mim/

---

## Estrutura do Projeto

```
dona-de-mim/
├── public/                      # Arquivos estáticos servidos
│   ├── assets/
│   │   ├── css/                # Estilos
│   │   └── js/                 # Scripts frontend
│   ├── imgs/                   # Imagens organizadas
│   │   ├── conjuntos/          # 80+ imagens de conjuntos
│   │   ├── shorts/             # 11 imagens de shorts
│   │   ├── macacoes/           # 6 imagens de macacoes
│   │   ├── bodys/              # 1 imagem de body
│   │   └── novos/              # Pasta temporária novos produtos
│   └── videos/                 # Vídeos organizados
│       ├── produtos/           # 6 vídeos de produtos
│       └── loja/               # 1 vídeo da loja
│
├── scripts/                     # Scripts de automação
│   ├── renomear_novos.sh       # Renomeia imagens novas
│   └── organizar_videos.sh     # Organiza vídeos
│
├── src/                         # Código fonte
│   ├── data/
│   │   └── products.ts         # Dados dos produtos (50+)
│   ├── views/
│   │   ├── home.ts             # Template home
│   │   ├── category.ts         # Template categoria
│   │   ├── product.ts          # Template produto
│   │   └── components.ts       # Componentes compartilhados
│   └── server.ts               # Servidor Bun + Elysia
│
├── database/
│   ├── produtos.db             # Banco SQLite
│   └── schema.sql              # Schema SQL
│
├── .github/workflows/
│   └── static.yml              # Deploy automático GitHub Pages
│
└── README.md                    # Este arquivo
```

---

## 🏗️ Stack Tecnológica

### Atual (v1.0 - MVP)
- **Runtime:** Bun 1.2+ (JavaScript/TypeScript)
- **Backend:** Elysia (framework web)
- **Frontend:** HTML5, CSS3 (variables), JavaScript vanilla
- **Database:** SQLite (WAL mode)
- **Deploy:** GitHub Pages (via workflow)
- **Linting:** Biome (Rust-based)
- **Scripts:** Bash + Bun

### Futuro (v2.0)
- **Frontend:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes ou tRPC
- **Database:** PostgreSQL (Supabase)
- **Payments:** MercadoPago
- **Images:** Cloudinary
- **Auth:** NextAuth.js

---

## 📊 Catálogo de Produtos (Atualizado Abril 2026)

### Resumo Atual

| Categoria | Qtd Produtos | Qtd Imagens | Status |
|-----------|-------------|-------------|--------|
| Blusas | 0 | 0 | 🔄 Pendente |
| Vestidos | 0 | 0 | 🔄 Pendente |
| **Conjuntos** | **33** | **80+** | ✅ Ativo |
| Shorts | 10 | 11 | ✅ Ativo |
| Macacões | 1 | 6 | ✅ Ativo |
| Bodys | 1 | 1 | ✅ Ativo |
| **Total** | **45+** | **90+** | **📈 Crescendo** |

### 📸 Novos Produtos (Abril 2026)

Lote de 51 imagens processadas e organizadas:

- **DDM-0044:** 1 imagem (produto único)
- **DDM-0045:** 13 imagens com galeria completa
- **DDM-0046 a DDM-0050:** 8 imagens cada com galeria

### 🎥 Vídeos

- **6 vídeos** de produtos (modelos, detalhes)
- **1 vídeo** da loja (tour virtual)

### Estrutura de Dados

```typescript
interface Product {
  id: number
  sku: string                    // Ex: "DDM-0001"
  nome: string                   // Nome do produto
  slug: string                   // URL amigável
  descricao: string              // Descrição completa
  descricao_curta: string        // Resumo para cards
  categoria: string              // 'conjuntos', 'shorts', etc.
  categoria_id: number
  preco_venda: number
  preco_promocional: number | null
  em_promocao: boolean
  destaque: boolean
  lancamento: boolean
  ativo: boolean
  imagem_principal: {
    arquivo_original: string     // Nome original WhatsApp
    arquivo_novo: string         // Nome renomeado DDM-XXXX
    dimensoes: { largura: number, altura: number }
    tamanho_bytes: number
    hash_md5: string
    cor_dominante: string
    cor_hex: string
    paleta: Array<{ rgb: number[], hex: string, nome: string, percentual: number }>
  }
  imagens_adicionais?: {          // NOVO: Galeria de imagens
    arquivo_novo: string
    descricao?: string
  }[]
  tamanhos_disponiveis: number[] // [46, 48, 50, 52, 54]
  material: string
  cuidados: string
  created_at: string
}
```

---

## 🔧 Configuração e Desenvolvimento

### Pré-requisitos
- Bun 1.3+ (runtime JavaScript)
- Python 3.10+ (para scripts)
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Deivisan/dona-de-mim.git
cd dona-de-mim

# Instale dependências
bun install

# Gere as páginas estáticas
bun run scripts/generate-static.ts

# Ou rode o servidor local
bun run dev
```

### Gereção de Páginas Estáticas

```bash
# Regenerar todas as páginas com os dados atuais
bun run scripts/generate-static.ts

# O script:
# 1. Lê os produtos em src/data/products.ts
# 2. Mapeia as imagens reais em assets/imgs/produtos/
# 3. Gera páginas HTML estáticas
# 4. Cria páginas de categorias e produtos individuais
```

---

## 🛤️ Roadmap

### Fase 1: MVP (Concluído ✅)
- [x] Landing page responsiva
- [x] Navegação entre 6 categorias
- [x] 50+ produtos catalogados
- [x] Galeria de imagens múltiplas
- [x] Sistema de filtros e busca
- [x] Integração WhatsApp
- [x] Deploy GitHub Pages
- [x] Modo escuro/claro

### Fase 2: Consolidação (Em Andamento 🔄)
- [x] Consolidação de produtos duplicados
- [x] Processamento de novas imagens (51 fotos)
- [x] Organização de vídeos
- [ ] Painel administrativo básico
- [ ] Upload de imagens
- [ ] Carrinho persistente

### Fase 3: E-commerce Completo (Planejado)
- [ ] Sistema de checkout
- [ ] Integração pagamento
- [ ] Cadastro de clientes
- [ ] Histórico de pedidos
- [ ] Área do cliente

### Fase 4: Escala (Futuro)
- [ ] Migração Next.js
- [ ] Domínio próprio
- [ ] SEO avançado
- [ ] PWA

---

## 📱 Contatos

| Canal | Link |
|-------|------|
| **Site** | https://deivisan.github.io/dona-de-mim/ |
| **Instagram** | https://www.instagram.com/use_donademiim/ |
| **WhatsApp** | https://wa.me/557591561769 |
| **GitHub** | https://github.com/Deivisan/dona-de-mim |

---

## 📝 Licença

MIT License - feel free to use and modify.

---

**📅 Última Atualização:** 04/04/2026  
**👗 Produtos Ativos:** 45+  
**📸 Total de Imagens:** 90+  
**🎥 Vídeos:** 7  
**💜 Feito com amor para mulheres reais**

---

## 🤖 Para Desenvolvedores

### Variáveis de Ambiente (Futuro)

```env
# Banco de dados
DATABASE_URL=postgresql://...

# Pagamentos
MERCADOPAGO_ACCESS_TOKEN=...
STRIPE_SECRET_KEY=...

# Imagens
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# WhatsApp
WHATSAPP_TOKEN=...
WHATSAPP_PHONE_ID=...
```

### Comandos Úteis

```bash
# Atualizar site (deploy manual)
git add . && git commit -m "update: descricao" && git push

# Regenerar páginas estáticas
bun run scripts/generate-static.ts

# Verificar status do deploy
gh run list --repo Deivisan/dona-de-mim
```
