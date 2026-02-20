import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Políticas | Dona De Mim',
  description: 'Políticas de privacidade da Dona De Mim.',
}

export default function PoliticasPage() {
  return (
    <div className="container" style={{ padding: '80px 40px', minHeight: '60vh' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '30px',
        }}
      >
        Políticas de Privacidade
      </h1>

      <div style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <p style={{ marginBottom: '20px' }}>
          A <strong>Dona De Mim</strong> preza pela privacidade e segurança dos dados de seus
          clientes. Esta política estabelece como coletamos, armazenamos e utilizamos suas
          informações.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Dados Coletados
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyle: 'disc' }}>
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Telefone para contato</li>
          <li>Endereço de entrega</li>
          <li>Dados de pagamento (processados de forma segura)</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Utilização dos Dados
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyle: 'disc' }}>
          <li>Processamento de pedidos</li>
          <li>Comunicação sobre o status do pedido</li>
          <li>Envio de promoções e novidades (com consentimento)</li>
          <li>Melhoria da experiência de compra</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Proteção dos Dados
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Utilizamos protocolos de segurança SSL/TLS para proteger todas as informações
          transmitidas. Os dados de pagamento não são armazenados em nossos servidores.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Contato
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Em caso de dúvidas sobre esta política, entre em contato conosco via WhatsApp ou e-mail.
        </p>

        <p
          style={{
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            fontSize: '0.9rem',
          }}
        >
          <strong>Última atualização:</strong> Fevereiro de 2026
        </p>
      </div>
    </div>
  )
}
