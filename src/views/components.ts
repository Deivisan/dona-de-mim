// ============================================
// DONA DE MIM - Componentes Compartilhados
// Header e Footer padronizados para todas as páginas
// ============================================

export function renderHeader(cartCount: number): string {
  return `<header>
    <div class="header-top">Moda Plus Size • Do 46 ao 54 • ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="/" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/categoria/shorts">Shorts</a></li>
          <li><a href="/categoria/conjuntos">Conjuntos</a></li>
          <li><a href="/categoria/macacoes">Macacões</a></li>
          <li><a href="/categoria/bodys">Bodys</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button id="themeSettings" class="settings-btn" aria-label="Configurações de Tema"><i class="fas fa-cog"></i></button>
        <button id="themeToggle" aria-label="Alternar Tema"><i class="fas fa-moon"></i></button>
        <button aria-label="Buscar" id="searchBtn"><i class="fas fa-search"></i></button>
        <a href="/carrinho" class="cart-btn" aria-label="Carrinho">
          <i class="fas fa-shopping-bag"></i>
          ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
        </a>
      </div>
    </div>
    <div class="theme-selector" id="themeSelector">
      <h4>Temas</h4>
      <div class="theme-options">
        <div class="theme-option" data-theme="light">Claro</div>
        <div class="theme-option" data-theme="soft-dark">Soft Dark</div>
        <div class="theme-option" data-theme="dark">Dark</div>
        <div class="theme-option" data-theme="ocean">Ocean</div>
        <div class="theme-option" data-theme="rose">Rose</div>
        <div class="theme-option" data-theme="forest">Forest</div>
        <div class="theme-option" data-theme="sunset">Sunset</div>
      </div>
    </div>
    <div class="search-modal" id="searchModal">
      <div class="search-content">
        <form action="/api/busca" method="get">
          <input type="search" name="q" placeholder="Buscar produtos..." id="searchInput">
          <button type="submit"><i class="fas fa-search"></i></button>
        </form>
        <button class="search-close" id="searchClose"><i class="fas fa-times"></i></button>
        <div class="search-results" id="searchResults"></div>
      </div>
    </div>
  </header>`
}

export function renderFooter(): string {
  return `<footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="/" class="logo">DONA DE <span>MIM</span></a>
        <p>Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.<br><br><strong>A DONA</strong> - 75 9156-1769</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/use_donademiim/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/557591561769" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h5>Institucional</h5>
        <ul>
          <li><a href="/sobre-nos">Sobre Nós</a></li>
          <li><a href="/guia-de-tamanhos">Guia de Tamanhos</a></li>
          <li><a href="/politicas">Políticas</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Ajuda</h5>
        <ul>
          <li><a href="/politicas#frete">Frete e Entrega</a></li>
          <li><a href="/politicas#trocas">Trocas e Devoluções</a></li>
          <li><a href="/guia-de-tamanhos">Como Medir</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Contato</h5>
        <ul>
          <li><a href="https://wa.me/557591561769"><i class="fab fa-whatsapp"></i> 75 9156-1769</a></li>
          <li><a href="https://www.instagram.com/use_donademiim/" target="_blank"><i class="fab fa-instagram"></i> @use_donademiim</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 DONA DE MIM. Todos os direitos reservados. Feito com ❤️ para mulheres reais.</p>
    </div>
  </footer>`
}

export function renderFloatingWhatsApp(): string {
  return `<a href="https://wa.me/557591561769" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>`
}
