import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trocas e Devoluções | Dona De Mim',
  description: 'Política de trocas e devoluções da Dona De Mim.',
}

export default function TrocasPage() {
  return (
    <div className="container" style={{ padding: '80px 40px', minHeight: '60vh' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '30px',
        }}
      >
        Trocas e Devoluções
      </h1>

      <div style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Política de Trocas
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Aceitamos trocas em até <strong>30 dias</strong> após o recebimento do produto. O produto
          deve estar intacto, com etiquetas e na embalagem original.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Como Solicitar
        </h3>
        <ol style={{ marginLeft: '20px', marginBottom: '20px' }}>
          <li>Entre em contato via WhatsApp</li>
          <li>Informe o número do pedido</li>
          <li>Specify o motivo da troca</li>
          <li>Enviaremos uma etiqueta de postagem</li>
        </ol>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Primeira Troca Grátis
        </h3>
        <p style={{ marginBottom: '20px' }}>
          A primeira troca é gratuita para todo o Brasil. As trocas subsequentes terão custo de
          frete por conta do cliente.
        </p>

        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
          Requisitos
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyle: 'disc' }}>
          <li>Produto sem uso</li>
          <li>Etiquetas originais anexas</li>
          <li>Embalagem original</li>
          <li>Nota fiscal</li>
        </ul>
      </div>
    </div>
  )
}
