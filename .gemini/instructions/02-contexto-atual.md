# 📍 Contexto Atual e Decisões Técnicas

## Stack Tecnológica
- **Runtime:** Bun
- **Servidor:** Elysia
- **Views:** Template Strings em TS
- **Estilo:** CSS Vanilla
- **Tipagem:** Interface `Product` rigorosa em `src/data/products.ts`.

## O que já foi feito (Atualizado em 19/02/2026)
1.  **Auditoria de Categorias:** SKUs DDM-0028, 0013, 0043 corrigidos para "Conjuntos" e DDM-0004 para "Shorts".
2.  **Centralização de Assets:** Lógica de caminhos de imagem centralizada em `src/utils/helpers.ts` via `getProductImagePath`.
3.  **Refatoração de Views:** `home.ts`, `product.ts` e `category.ts` agora usam o helper central e possuem tipagem forte (removidos `any`).
4.  **Novas Categorias no Menu:** "Conjuntos" e "Shorts" agora estão funcionais no Header e no grid da Home.

## Próximos Passos Prioritários
- **Páginas Institucionais:** Criar as views para Sobre Nós, Guia de Tamanhos e Políticas (Ver Fase 2 do Roadmap).
- **Refinamento de UX:** Melhorar o template da mensagem de WhatsApp e implementar meta tags dinâmicas.
