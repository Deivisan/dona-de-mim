# 🛍️ Dona de Mim - E-commerce Plus Size

<p align="center">
  <img src="https://deivisan.github.io/dona-de-mim/assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.47 (1).jpeg" alt="Dona de Mim - Moda Plus Size" width="300">
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

---

## 🔗 URLs do Site

| Página | URL |
|--------|-----|
| **Home** | https://deivisan.github.io/dona-de-mim/ |
| **Blusas** | https://deivisan.github.io/dona-de-mim/blusas.html |
| **Vestidos** | https://deivisan.github.io/dona-de-mim/vestidos.html |
| **Conjuntos** | https://deivisan.github.io/dona-de-mim/conjuntos.html |
| **Shorts** | https://deivisan.github.io/dona-de-mim/shorts.html |

---

## ⚠️ Status: Protótipo - Dados Emulados

> **Nota Importante:** Este projeto está em **fase de protótipo**. Os dados dos produtos (nomes, descrições, preços) são **emulados/mocados** baseados em análise de imagens. As imagens reais precisam de OCR e processamento para associação correta.

### O que está funcionando:

- ✅ Landing page responsiva com design moderno
- ✅ Navegação entre categorias (blusas, vestidos, conjuntos, shorts)
- ✅ Páginas individuais de produtos com detalhes
- ✅ Botão WhatsApp para compras diretas
- ✅ Sistema de seleção de tamanhos
- ✅ Imagens mapeadas por SKU (funcionando)
- ✅ Deploy automático via GitHub Actions

### O que precisa ser implementado:

- 🔄 **OCR de Imagens** - Extrair nome, cor, estilo automaticamente das fotos originais
- 🔄 **Descrição IA** - Gerar descrições únicas baseadas na análise visual
- 🔄 **Banco de Dados Real** - Integrar com banco de dados SQLite ou PostgreSQL
- 🔄 **Carrinho de Compras** - Stateful cart (atualmente apenas redireciona para WhatsApp)
- 🔄 **Domínio Próprio** - Configurar (futuro)
- 🌐 **Deploy Atual** - https://deivisan.github.io/dona-de-mim/

---

## 🗂️ Estrutura do Projeto

```
dona-de-mim/
├── index.html                    # Landing page (home)
├── blusas.html                  # Página de blusas
├── vestidos.html                # Página de vestidos
├── conjuntos.html               # Página de conjuntos
├── shorts.html                  # Página de shorts
├── produto-*.html               # Páginas individuais de produtos
│
├── scripts/
│   ├── generate-static.ts       # Gerador de páginas estáticas
│   ├── analyze_images.py       # Analisador de imagens
│   ├── generate_catalog.py     # Gerador de catálogo
│   └── rename_images.py        # Renomeador de imagens
│
├── src/
│   ├── data/
│   │   └── products.ts         # Dados dos produtos (emulados)
│   ├── views/
│   │   ├── home.ts             # Template home
│   │   ├── category.ts         # Template categoria
│   │   ├── product.ts         # Template produto
│   │   └── static.ts           # Páginas institucionais
│   ├── components/             # Componentes
│   └── server.ts               # Servidor Bun (para desenvolvimento)
│
├── assets/
│   └── imgs/
│       ├── colecoes/           # Imagens originais do WhatsApp
│       └── produtos/           # Imagens organizadas por categoria
│           ├── blusas/         # 27 imagens de blusas
│           ├── vestidos/        # 16 imagens de vestidos
│           └── conjuntos/      # Imagens de conjuntos
│
├── database/
│   ├── schema.sql             # Schema SQL
│   ├── produtos.db             # Banco SQLite
│   └── catalogo_imagens.json  # Análise de imagens
│
├── .github/
│   └── workflows/
│       └── static.yml          # Deploy automático GitHub Pages
│
└── README.md                   # Este arquivo
```

---

## 🏗️ Stack Tecnológica

### Atual (v1.0 - Protótipo)
- **Frontend:** HTML5, CSS3 (variables, grid, flexbox), JavaScript vanilla
- **Backend (dev):** Bun + Elysia (servidor local)
- **Database:** SQLite (embutido)
- **Deploy:** GitHub Pages (estático)
- **Scripts:** Python + Bun

### Futuro (v2.0 - Produção)
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Backend API:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Payments:** MercadoPago ou Stripe
- **Images:** Cloudinary ou similar (OCR + resize)

---

## 📊 Catálogo de Produtos (Emulado)

### Resumo Atual

| Categoria | Qtd | Status Imagens |
|-----------|-----|----------------|
| Blusas | 27 | ✅ Mapeadas |
| Vestidos | 16 | ✅ Mapeadas |
| Conjuntos | 3 | ✅ Mapeadas |
| Shorts | 1 | ✅ Mapeadas |
| **Total** | **47** | **100%** |

### Estrutura de Dados (Emulada)

```typescript
interface Product {
  id: number
  sku: string                    // Ex: "DDM-0001"
  nome: string                   // Emulado - precisa OCR
  slug: string                   // URL amigável
  descricao: string              // Emulada - precisa IA
  categoria: 'blusas' | 'vestidos' | 'conjuntos' | 'shorts'
  preco_venda: number
  preco_promocional: number | null
  em_promocao: boolean
  destaque: boolean
  lancamento: boolean
  ativo: boolean
  imagem_principal: {
    arquivo_original: string     // Nome original do WhatsApp
    arquivo_novo: string         // Nome renomeado
    cor_dominante: string        // Extraído da imagem
    paleta: Color[]             // Cores detectadas
  }
  tamanhos_disponiveis: number[] // [46, 48, 50, 52, 54]
  material: string               // Emulado
  cuidados: string              // Emulado
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

### Fase 1: Protótipo Funcional (Concluído ✅)
- [x] Landing page responsiva
- [x] Navegação entre categorias
- [x] Páginas de produtos
- [x] Deploy GitHub Pages
- [x] Design dark/light mode

### Fase 2: Melhoria de Dados (Pendente 🔄)
- [ ] **OCR de Imagens** - Implementar reconhecimento de roupas nas fotos
  - Detectar tipo (blusa, vestido, short)
  - Identificar cores e padrões
  - Extrair características visuais
- [ ] **Geração de Descrições** - IA para criar descrições únicas
  - Baseado na análise visual
  - SEO otimizado
  - Descrições personalizadas por produto
- [ ] **Nomes Únicos** - Substituir nomes emulados por nomes reais

### Fase 3: Funcionalidades E-commerce (Pendente)
- [ ] Carrinho de compras com estado
- [ ] Finalização de pedido (checkout)
- [ ] Integração WhatsApp Business API
- [ ] Cadastro de clientes
- [ ] Histórico de pedidos

### Fase 4: Produção (Futuro)
- [ ] Migrar para Next.js
- [ ] Configurar domínio próprio
- [ ] Sistema de pagamento
- [ ] Área administrativa
- [ ] Panel de gestão de produtos
- [ ] App mobile (PWA ou nativo)

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

**📅 Última Atualização:** 20/02/2026  
**🦞 Desenvolvido por:** DevSan AGI  
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
