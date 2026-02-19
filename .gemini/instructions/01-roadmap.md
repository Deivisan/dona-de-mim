# 🗺️ Roadmap de Produção - Dona de Mim

## Fase 1: Escultura de Dados (Próximo Passo Crítico)
- **Revisão Manual:** O arquivo `src/data/products.ts` foi gerado automaticamente. É necessário revisar cada SKU e confirmar se a categoria está correta (ex: DDM-0028 é Blusa ou Short?).
- **Enriquecimento:** Adicionar descrições reais que falem diretamente com a consumidora plus size (foco em tecido, elasticidade e caimento).

## Fase 2: Expansão de Views
- **Páginas Institucionais:** Criar as rotas e views para:
  - `/sobre-nos`: História da marca.
  - `/guia-de-tamanhos`: Tabela de medidas real para evitar trocas.
  - `/politicas`: Frete, Troca e Privacidade.

## Fase 3: Refinamento de Checkout
- **Resumo no WhatsApp:** Melhorar o template da mensagem enviada para incluir links das imagens e um layout mais limpo.
- **Cálculo de Frete:** Implementar um simulador baseado em faixas de CEP (mesmo que estático inicialmente).

## Fase 4: SEO & Performance
- **Meta Tags Dinâmicas:** Garantir que cada produto tenha seu próprio OpenGraph para compartilhamento em redes sociais.
- **Otimização de Imagens:** Usar formatos como WebP para carregamento instantâneo.
