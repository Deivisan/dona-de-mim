'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './Header.module.css'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/blusas/', label: 'Blusas' },
  { href: '/vestidos/', label: 'Vestidos' },
  { href: '/conjuntos/', label: 'Conjuntos' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contato/', label: 'Contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        Modo Plus Size &bull; Do 46 ao 54 &bull; ❤️ Mulheres Reais
      </div>
      <div className={styles.headerMain}>
        <Link href="/" className={styles.logo}>
          DONA DE <span>MIM</span>
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <ThemeToggle />
          <Link href="/contato/" aria-label="Buscar">
            <i className="fas fa-search"></i>
          </Link>
          <Link href="/contato/" aria-label="Favoritos">
            <i className="far fa-heart"></i>
          </Link>
          <Link href="/#carrinho" aria-label="Carrinho">
            <i className="fas fa-shopping-bag"></i>
          </Link>
        </div>
      </div>

      <a
        href="https://wa.me/557591561769?text=Olá!%20%F0%9F%98%8A%0A%0AEstou%20navegando%20no%20site%20da%20Dona%20de%20Mim%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos!%0A%0APode%20me%20ajudar?%20%E2%9D%A4%EF%B8%8F%0A%0AObrigada!%20%E2%9C%A8"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsapp}
        aria-label="Fale conosco no WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </header>
  )
}
