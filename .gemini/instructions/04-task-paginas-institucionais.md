# 🎯 Task: Expansão de Views Institucionais

**Prioridade:** Média
**Contexto:** O e-commerce precisa de páginas informativas para passar credibilidade e reduzir dúvidas no WhatsApp.

## 📋 Páginas a Criar

1.  **Sobre Nós (`/sobre-nos`):**
    *   História da marca "Dona de Mim".
    *   Missão: Empoderamento feminino plus size (46 ao 54).
2.  **Guia de Tamanhos (`/guia-de-tamanhos`):**
    *   Tabela de medidas (Busto, Cintura, Quadril) para a grade 46-54.
    *   Dicas de como se medir em casa.
3.  **Políticas (`/politicas`):**
    *   Frete (Grátis acima de R$ 299).
    *   Trocas (Primeira grátis em até 30 dias).

## 🛠️ Procedimentos Técnicos

1.  **Elysia Router (`src/server.ts`):** Criar as novas rotas `.get()`.
2.  **Views (`src/views/`):** Criar arquivos como `static.ts` ou individuais para as novas páginas.
3.  **Footer/Header:** Atualizar os links que atualmente apontam para `#`.

## ⚠️ Atenção
Manter o padrão de **Template Strings** e reutilizar os componentes `renderHeader()` e `renderFooter()` para consistência visual.
