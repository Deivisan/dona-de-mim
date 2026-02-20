import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guia de Tamanhos | Dona De Mim',
  description: 'Tabela de medidas para ajudá-la a escolher o tamanho ideal.',
}

export default function GuiaTamanhosPage() {
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
        Guia de Tamanhos
      </h1>

      <p
        style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          fontSize: '1.1rem',
        }}
      >
        Tire suas medidas e compare com a tabela abaixo para encontrar o tamanho ideal!
      </p>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ background: 'var(--primary)', color: '#fff' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Tamanho</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Busto (cm)</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Cintura (cm)</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Quadril (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>
                <strong>46</strong>
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>100-104</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>80-84</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>106-110</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>
                <strong>48</strong>
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>104-108</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>84-88</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>110-114</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>
                <strong>50</strong>
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>108-112</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>88-92</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>114-118</td>
            </tr>
            <tr>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>
                <strong>52</strong>
              </td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>112-116</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>92-96</td>
              <td style={{ padding: '15px', borderBottom: '1px solid var(--border)' }}>118-122</td>
            </tr>
            <tr>
              <td style={{ padding: '15px' }}>
                <strong>54</strong>
              </td>
              <td style={{ padding: '15px' }}>116-120</td>
              <td style={{ padding: '15px' }}>96-100</td>
              <td style={{ padding: '15px' }}>122-126</td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '15px' }}>Como Medir</h3>
          <ul
            style={{
              marginLeft: '20px',
              lineHeight: '2',
              color: 'var(--text-secondary)',
              listStyle: 'disc',
            }}
          >
            <li>
              <strong>Busto:</strong> Medir ao redor do busto, passando pela parte mais saliente
            </li>
            <li>
              <strong>Cintura:</strong> Medir a parte mais estreita do tronco
            </li>
            <li>
              <strong>Quadril:</strong> Medir a parte mais saliente dos glúteos
            </li>
          </ul>
        </div>

        <p
          style={{
            marginTop: '30px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}
        >
          Em caso de dúvida entre dois tamanhos, sugerimos escolher o maior.
        </p>
      </div>
    </div>
  )
}
