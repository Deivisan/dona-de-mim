import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frete e Entrega | Dona De Mim',
  description: 'Informações sobre frete e entrega da Dona De Mim.',
}

export default function FretePage() {
  return (
    <div className="container" style={{ padding: '80px 40px', minHeight: '60vh' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '30px',
        }}
      >
        Frete e Entrega
      </h1>

      <div style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <div
          style={{
            padding: '20px',
            background: 'var(--secondary)',
            color: '#fff',
            borderRadius: '8px',
            marginBottom: '30px',
          }}
        >
          <h3 style={{ margin: 0 }}>Frete Grátis</h3>
          <p style={{ margin: '10px 0 0 0' }}>Para pedidos acima de R$ 299,00</p>
        </div>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Prazos de Entrega
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyle: 'disc' }}>
          <li>
            <strong>São Paulo Capital:</strong> 2-4 dias úteis
          </li>
          <li>
            <strong>Demais capitais:</strong> 3-5 dias úteis
          </li>
          <li>
            <strong>Interior:</strong> 5-8 dias úteis
          </li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Como Rastrear
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Após a postagem, você receberá o código de rastreio por e-mail. O acompanhamento pode ser
          feito no site dos Correios ou da transportadora.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Envio
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Todos os pedidos são processados em até <strong>3 dias úteis</strong> após a confirmação
          do pagamento. Pedidos realizados aos sábados, domingos ou feriados serão processados no
          próximo dia útil.
        </p>
      </div>
    </div>
  )
}
