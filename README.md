# 🛍️ Dona de Mim - Documentação Técnica v1.0

## 📋 Resumo do Projeto

**E-commerce Plus Size Feminino** - Loja de roupas para mulheres reais, tamanhos 46 ao 54.

| Campo | Valor |
|-------|-------|
| **Nome** | Dona de Mim |
| **Tagline** | Realçando As Curvas De Quem É Dona De Si |
| **Slogan** | Moda Para Mulheres Reais ❤️ |
| **Público-alvo** | Mulheres 25-50 anos |
| **Tamanhos** | 46, 48, 50, 52, 54 |
| **CEO/Fundadora** | A DONA (75 9156-1769) |
| **Instagram** | @use_donademiim |

---

## 📂 Estrutura de Arquivos

```
dona-de-mim/
├── index.html                    # Landing page principal
├── AGENTS.md                     # Contexto para IA
├── README.md                     # Este arquivo
├── database/
│   ├── schema.sql               # Schema SQL completo
│   ├── produtos.db              # Banco SQLite
│   ├── catalogo_imagens.json    # Análise de todas imagens
│   ├── catalogo_produtos.json   # Catálogo completo de produtos
│   └── renomeacoes.json         # Log de renomeações
├── scripts/
│   ├── analyze_images.py        # Analisador de imagens
│   ├── generate_catalog.py      # Gerador de catálogo
│   └── rename_images.py         # Renomeador de imagens
└── assets/
    └── imgs/
        ├── colecoes/            # Imagens originais (WhatsApp)
        ├── produtos/            # Imagens organizadas por categoria
        │   ├── blusas/          # 27 blusas
        │   └── vestidos/        # 16 vestidos
        ├── categorias/          # Imagens de categorias
        └── banners/             # Banners promocionais
```

---

## 🗄️ Banco de Dados

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `produtos` | Catálogo de produtos |
| `categorias` | Categorias de produtos |
| `produto_imagens` | Imagens dos produtos |
| `produto_tamanhos` | Estoque por tamanho |
| `clientes` | Cadastro de clientes |
| `pedidos` | Pedidos realizados |
| `pedido_itens` | Itens de cada pedido |

### Categorias

1. **Vestidos** - 16 produtos
2. **Blusas** - 27 produtos

### Tamanhos Plus Size

| Número | Equivalente |
|--------|-------------|
| 46 | GG |
| 48 | XGG |
| 50 | XXG |
| 52 | XXXG |
| 54 | XXXXG |

---

## 📦 Catálogo de Produtos

### Resumo

- **Total de produtos:** 43
- **Produtos em destaque:** 8
- **Lançamentos:** 4
- **Total de variações (tamanhos):** 215

### Estrutura de Produto

```json
{
  "id": 1,
  "sku": "DDM-0001",
  "nome": "Blusa Plus Size Rosa Delicado",
  "slug": "blusa-plus-size-rosa-delicado-1",
  "descricao": "...",
  "descricao_curta": "...",
  "categoria": "blusas",
  "preco_venda": 150.70,
  "preco_promocional": null,
  "em_promocao": false,
  "destaque": true,
  "lancamento": true,
  "ativo": true,
  "imagem_principal": {
    "arquivo_original": "...",
    "arquivo_novo": "...",
    "dimensoes": {"largura": 587, "altura": 576},
    "cor_dominante": "rosa",
    "paleta": [...]
  },
  "tamanhos_disponiveis": [46, 48, 50, 52, 54],
  "material": "Algodão",
  "cuidados": "..."
}
```

---

## 🎨 Sistema de Cores

### Paleta Analisada

Cada imagem foi analisada para extrair:
- Cor dominante
- Paleta de 4-5 cores
- Brilho médio
- Tom (claro/médio/escuro)

### Cores Identificadas

| Cor | Quantidade |
|-----|------------|
| Cinza | 26 imagens |
| Preto | 8 imagens |
| Marrom | 6 imagens |
| Rosa | 2 imagens |
| Bege | 1 imagem |

---

## 🔧 Stack Tecnológica

### Atual (v1.0 - Draft)
- HTML5 semântico
- CSS3 (variables, grid, flexbox)
- JavaScript vanilla
- SQLite para banco de dados
- Python para scripts de análise

### Planejado (v2.0)
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL ou Supabase
- Stripe/MercadoPago

---

## 📱 Contatos

- **Instagram:** https://www.instagram.com/use_donademiim/
- **WhatsApp:** https://wa.me/557591561769
- **Domínio:** https://dona-de-mim.com.br (a configurar)

---

## 🚀 Próximos Passos

### Curto Prazo
- [ ] Deploy no Vercel/Netlify
- [ ] Configurar domínio
- [ ] Implementar carrinho de compras
- [ ] Sistema de pagamento

### Médio Prazo
- [ ] Migrar para Next.js
- [ ] Sistema de login/cadastro
- [ ] Área do cliente
- [ ] Painel administrativo

### Longo Prazo
- [ ] App mobile
- [ ] Integração com ERP
- [ ] Sistema de afiliados
- [ ] Marketplace

---

**📅 Gerado em:** 19/02/2026
**🦞 Por:** DevSan AGI
**💜 Feito com amor para mulheres reais**
