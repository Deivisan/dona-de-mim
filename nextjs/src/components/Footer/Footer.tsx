import Link from 'next/link'
import { siteConfig } from '@/data/products'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            DONA DE <span>MIM</span>
          </Link>
          <p>
            Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.
            <br />
            <br />
            <strong>{siteConfig.founder}</strong> - Fundadora
            <br />📱 {siteConfig.phone.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3')}
          </p>
          <div className={styles.footerSocial}>
            <a
              href={`https://www.instagram.com/${siteConfig.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href={`https://wa.me/55${siteConfig.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={styles.whatsappLink}
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h5>Institucional</h5>
          <ul>
            <li>
              <Link href="/sobre">Sobre Nós</Link>
            </li>
            <li>
              <Link href="/contato">Fale Conosco</Link>
            </li>
            <li>
              <Link href="/politicas">Políticas</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h5>Ajuda</h5>
          <ul>
            <li>
              <Link href="/trocas">Trocas e Devoluções</Link>
            </li>
            <li>
              <Link href="/frete">Frete e Entrega</Link>
            </li>
            <li>
              <Link href="/guia-tamanhos">Guia de Tamanhos</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h5>Contato</h5>
          <ul>
            <li>
              <a href={`https://wa.me/55${siteConfig.phone}`} className={styles.whatsappLink}>
                <i className="fab fa-whatsapp"></i>{' '}
                {siteConfig.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/${siteConfig.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i> @{siteConfig.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} DONA DE MIM. Todos os direitos reservados. Feito com ❤️
          para mulheres reais.
        </p>
      </div>
    </footer>
  )
}
