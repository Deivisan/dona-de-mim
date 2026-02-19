# 🎯 Task: Correção de Categorias (CONCLUÍDA)

**Status:** ✅ Finalizada em 19/02/2026

## ✅ Ações Executadas
1.  **Dados:** Atualizados SKUs 0028, 0013, 0043 e 0004 no `products.ts`.
2.  **Imagens:** Movidas para `public/imgs/conjuntos` e `public/imgs/shorts`.
3.  **Código:** Refatorada a função `getImagePath` para ser dinâmica e centralizada em `helpers.ts`.
4.  **Tipagem:** Removidos `any` das views para evitar erros de runtime.
5.  **UI:** Grid da Home atualizado com a categoria "Conjuntos".

**Nota para o próximo agente:** Esta task foi expandida para incluir o SKU DDM-0004 que estava como vestido mas é um short jeans. O sistema de caminhos de imagem agora é robusto e aceita novas categorias via mapeamento no `helpers.ts`.
