// ============================================
// DONA DE MIM - Header Component
// ============================================

import { Html } from '@elysiajs/html'

interface HeaderProps {
  cartCount: number
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header>
      <div class="header-top">Moda Plus Size • Do 46 ao 54 • ❤️ Mulheres Reais</div>
      <div class="header-main">
        <a href="/" class="logo">
          DONA DE <span>MIM</span>
        </a>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/categoria/vestidos">Vestidos</a>
            </li>
            <li>
              <a href="/categoria/blusas">Blusas</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <button aria-label="Buscar" id="searchBtn">
            <i class="fas fa-search"></i>
          </button>
          <a href="/carrinho" class="cart-btn" aria-label="Carrinho">
            <i class="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span class="cart-count">{cartCount}</span>}
          </a>
        </div>
      </div>

      {/* Search Modal */}
      <div class="search-modal" id="searchModal">
        <div class="search-content">
          <form action="/api/busca" method="get">
            <input
              type="search"
              name="q"
              placeholder="Buscar produtos..."
              autocomplete="off"
              id="searchInput"
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <button class="search-close" id="searchClose">
            <i class="fas fa-times"></i>
          </button>
          <div class="search-results" id="searchResults"></div>
        </div>
      </div>
    </header>
  )
}
