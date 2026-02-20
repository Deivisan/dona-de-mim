import type { Metadata } from 'next'
import { siteConfig } from '@/data/products'

export const metadata: Metadata = {
  title: 'Fale Conosco | Dona De Mim',
  description: 'Entre em contato com a Dona De Mim. Estamos disponíveis para atender você.',
}

export default function ContatoPage() {
  const whatsappLink = `https://wa.me/55${siteConfig.phone}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos!`

  return (
    <div className="container" style={{ padding: '80px 40px', minHeight: '60vh' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        Fale Conosco
      </h1>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          fontSize: '1.1rem',
        }}
      >
        Estamos disponíveis para atender você. Escolha o canal de preferência!
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '40px',
            background: '#25D366',
            color: '#fff',
            borderRadius: '8px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <i className="fab fa-whatsapp" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '10px' }}>WhatsApp</h3>
          <p>Clique para chamar</p>
          <p style={{ marginTop: '10px', fontWeight: '500' }}>
            {siteConfig.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
          </p>
        </a>

        {/* Instagram */}
        <a
          href={`https://instagram.com/${siteConfig.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '40px',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderRadius: '8px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'transform 0.3s ease',
          }}
        >
          <i
            className="fab fa-instagram"
            style={{ fontSize: '3rem', marginBottom: '15px', color: '#E1306C' }}
          ></i>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '10px' }}>Instagram</h3>
          <p>Siga我们的 publicações</p>
          <p style={{ marginTop: '10px', fontWeight: '500' }}>@{siteConfig.instagram}</p>
        </a>

        {/* Horário */}
        <div
          style={{
            padding: '40px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <i
            className="far fa-clock"
            style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--secondary)' }}
          ></i>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
            Horário de Atendimento
          </h3>
          <p>Segunda a Sábado</p>
          <p style={{ marginTop: '10px', fontWeight: '500' }}>9h às 19h</p>
        </div>
      </div>
    </div>
  )
}
