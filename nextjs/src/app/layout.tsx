import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export const metadata: Metadata = {
  title: 'Dona De Mim | Plus Size - Moda Para Mulheres Reais',
  description:
    'Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.',
  keywords: [
    'moda plus size',
    'roupas plus size',
    'blusas plus size',
    'vestidos plus size',
    'conjuntos plus size',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
