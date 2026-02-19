# 🤖 AGENTS.md - Dona de Mim

## 💎 Metodologia: Esculpindo a Interface
Neste projeto, não apenas "codamos", nós **esculpimos**. Cada interação, cada transição e cada dado deve ser refinado para refletir a qualidade da marca Dona de Mim.

### 🎯 Objetivos Atuais
1.  **Precisão de Dados:** Garantir que "Blusas", "Shorts", "Vestidos" e "Conjuntos" estejam corretamente categorizados.
2.  **Fidelidade Visual:** Interface moderna, com suporte a **Modo Escuro (Dark Mode)**.
3.  **Navegação Funcional:** Todo link ou menu deve levar a uma interface real ou um redirecionador inteligente.
4.  **UX Humanizada:** Copywriting focado em mulheres reais, valorizando curvas e autoestima.

---

## 🏗️ Estado da Produção (Stage: Hardened & Ready)
- [x] **Runtime:** Bun configurado com suporte a Hot Reload.
- [x] **Linting:** Biome instalado e configurado (Rust-based speed).
- [x] **Database:** SQLite em modo **WAL (Write-Ahead Logging)** para máxima performance.
- [x] **Imagens:** Mapeadas e auditadas via `scripts/audit_data_integrity.py`.
- [x] **UI:** Dark Mode funcional via `data-theme` e CSS Variables.
- [ ] **[PENDENTE]** Revisão semântica manual das categorias (Shorts/Conjuntos).
- [ ] **[PENDENTE]** Criação das páginas institucionais.

---

## 🛠️ Instruções para o Próximo Agente (ou Usuário)
- **Tooling:** Use `bunx biome check --write` para manter o código limpo.
- **SQLite:** O banco está em `database/produtos.db`. Use o modo WAL para evitar locks.
- **Integridade:** Sempre que alterar a estrutura de imagens, rode o auditor em `scripts/`.

---

## 📅 Roadmap de Curto Prazo
1.  **Sessão Atual:** Refino de lógica de categorias e enriquecimento de descrições.
2.  **V1.2:** Implementação do Guia de Tamanhos e Checkout VIP via WhatsApp.
