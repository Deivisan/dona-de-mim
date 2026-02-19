// ============================================
// DONA DE MIM - Footer Component
// ============================================

import { Html } from '@elysiajs/html'

export function Footer() {
  return (
    <footer>
      <div class="footer-content">
        <div class="footer-brand">
          <a href="/" class="logo">
            DONA DE <span>MIM</span>
          </a>
          <p>
            Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.
            <br />
            <br />
            <strong>A DONA</strong> - 75 9156-1769
          </p>
          <div class="footer-social">
            <a
              href="https://www.instagram.com/use_donademiim/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/557591561769"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
            >
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h5>Institucional</h5>
          <ul>
            <li>
              <a href="#">Sobre Nós</a>
            </li>
            <li>
              <a href="#">Nossas Lojas</a>
            </li>
            <li>
              <a href="#">Trabalhe Conosco</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h5>Ajuda</h5>
          <ul>
            <li>
              <a href="#">Central de Ajuda</a>
            </li>
            <li>
              <a href="#">Frete e Entrega</a>
            </li>
            <li>
              <a href="#">Trocas e Devoluções</a>
            </li>
            <li>
              <a href="#">Perguntas Frequentes</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h5>Contato</h5>
          <ul>
            <li>
              <a href="https://wa.me/557591561769">
                <i class="fab fa-whatsapp"></i> 75 9156-1769
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/use_donademiim/" target="_blank" rel="noopener">
                <i class="fab fa-instagram"></i> @use_donademiim
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; 2026 DONA DE MIM. Todos os direitos reservados. Feito com ❤️ para mulheres reais.
        </p>
      </div>
    </footer>
  )
}
