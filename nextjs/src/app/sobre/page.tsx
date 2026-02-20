import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nós | Dona De Mim',
  description: 'Conheça a história da Dona De Mim - moda plus size feita para mulheres reais.',
}

export default function SobrePage() {
  return (
    <div className="container" style={{ padding: '80px 40px', minHeight: '60vh' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '30px',
        }}
      >
        Sobre Nós
      </h1>

      <div style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
          <strong>Bem-vinda à Dona De Mim!</strong>
        </p>

        <p style={{ marginBottom: '20px' }}>
          Somos uma marca feita para mulheres reais, que celebra a diversidade e a beleza de cada
          corpo. Nossa missão é realçar suas curvas com peças exclusivas, modernas e cheias de
          estilo.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Fundada por <strong>Uiara Paula</strong>, a Dona De Mim nasceu com o propósito de oferecer
          moda plus size de qualidade, que realmente entende as necessidades de mulheres que usam do
          tamanho 46 ao 54.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Cada peça é desenvolvida com carinho, usando tecidos de qualidade e cortes que valorizam
          as curvas feminineiras. Acreditamos que <strong>a DONA</strong> é quem decide o que usar.
          ❤️
        </p>

        <div
          style={{
            marginTop: '40px',
            padding: '30px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '15px' }}>
            Nossos Valores
          </h3>
          <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
            <li>Qualidade em primeiro lugar</li>
            <li>Moda inclusiva e acessível</li>
            <li>Atendimento humanizado</li>
            <li>Sustentabilidade na produção</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
