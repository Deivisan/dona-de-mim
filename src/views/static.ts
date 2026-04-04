// ============================================
// DONA DE MIM - Páginas Institucionais (Static)
// ============================================

import { renderHeader, renderFooter, renderFloatingWhatsApp } from './components'

export function SobreNosPage(cartCount: number = 0): string {
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Nós | Dona De Mim - Moda Plus Size</title>
  <meta name="description" content="Conheça a história da Dona de Mim, marca feita por e para mulheres reais. Moda plus size do 46 ao 54.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}

  <main class="static-page">
    <div class="static-header">
      <h1>Sobre Nós</h1>
      <p>Nossa história, missão e valores</p>
    </div>

    <div class="static-content">
      <section class="about-story">
        <div class="about-image">
          <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" style="width:100%;height:100%;border-radius:12px;box-shadow:var(--shadow-hover);">
            <rect fill="#f5f5f5" width="600" height="400"/>
            <text fill="#c9a87c" font-family="Playfair Display, Georgia, serif" font-size="36" font-weight="bold" x="50%" y="45%" text-anchor="middle" dominant-baseline="middle">Dona de Mim</text>
            <text fill="#8b7355" font-family="Poppins, sans-serif" font-size="20" x="50%" y="55%" text-anchor="middle" dominant-baseline="middle">Moda Plus Size</text>
          </svg>
        </div>
        <div class="about-text">
          <h2>Nossa História</h2>
          <p>A <strong>Dona de Mim</strong> nasceu de um sonho: criar uma marca de moda plus size que realmente entendesse e celebrasse as curvas das mulheres reais. Fundada em 2026, nossa marca é feita <strong>por mulheres e para mulheres</strong> que se recusam a se encaixar em padrões impossíveis.</p>
          <p>Percebemos que o mercado oferecia poucas opções para mulheres que usam do 46 ao 54, e quando existiam, as peças eram sem graça, sem estilo e sem personalidade. Decidimos mudar isso.</p>
          <p>Cada peça da Dona de Mim é cuidadosamente selecionada pensando em conforto, elegância e empoderamento. Acreditamos que a moda deve ser uma extensão da sua personalidade, não uma limitação.</p>
        </div>
      </section>

      <section class="mission-values">
        <h2>Nossa Missão</h2>
        <div class="values-grid">
          <div class="value-card">
            <i class="fas fa-heart"></i>
            <h3>Empoderamento Feminino</h3>
            <p>Queremos que cada mulher se sinta poderosa, bonita e confiante em sua própria pele. Nossa missão é realçar as curvas de quem é dona de si.</p>
          </div>
          <div class="value-card">
            <i class="fas fa-users"></i>
            <h3>Inclusão Real</h3>
            <p>Não acreditamos em "tamanho único". Do 46 ao 54, cada corpo é único e merece peças que o valorizem de forma individual.</p>
          </div>
          <div class="value-card">
            <i class="fas fa-star"></i>
            <h3>Qualidade e Estilo</h3>
            <p>Oferecemos peças com tecido de qualidade, modelagem perfeita e design atual. Porque toda mulher merece se sentir elegante.</p>
          </div>
        </div>
      </section>

      <section class="commitment">
        <h2>Nosso Compromisso</h2>
        <ul class="commitment-list">
          <li><i class="fas fa-check-circle"></i> <span>Peças pensadas para valorizar as curvas plus size</span></li>
          <li><i class="fas fa-check-circle"></i> <span>Tecidos confortáveis e de alta qualidade</span></li>
          <li><i class="fas fa-check-circle"></i> <span>Modelagens que vestem bem do 46 ao 54</span></li>
          <li><i class="fas fa-check-circle"></i> <span>Atendimento humanizado e próximo</span></li>
          <li><i class="fas fa-check-circle"></i> <span>Entrega rápida para todo o Brasil</span></li>
        </ul>
      </section>

      <section class="cta-about">
        <h2>Faça Parte Dessa História</h2>
        <p>Junte-se a milhares de mulheres que já descobriram o poder de ser Dona de Mim.</p>
        <a href="/" class="btn">Explorar Coleção</a>
      </section>
    </div>
  </main>

  ${renderFooter()}

  ${renderFloatingWhatsApp()}

  <script src="/assets/js/app.js"></script>
</body>
</html>`
}

export function GuiaTamanhosPage(cartCount: number = 0): string {
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guia de Tamanhos | Dona De Mim - Moda Plus Size</title>
  <meta name="description" content="Guia completo de tamanhos Dona de Mim. Aprenda a medir-se e escolha o tamanho ideal do 46 ao 54.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}

  <main class="static-page">
    <div class="static-header">
      <h1>Guia de Tamanhos</h1>
      <p>Encontre o tamanho perfeito para você</p>
    </div>

    <div class="static-content">
      <section class="size-intro">
        <h2>Como Medir Corretamente</h2>
        <p>Para garantir que você escolha o tamanho ideal, siga estas dicas simples:</p>
        <div class="measuring-tips">
          <div class="tip-card">
            <i class="fas fa-ruler-horizontal"></i>
            <h4>Use uma fita métrica</h4>
            <p>Utilize uma fita métrica flexível e mantenha-a paralela ao chão, sem apertar demais.</p>
          </div>
          <div class="tip-card">
            <i class="fas fa-user"></i>
            <h4>Peça ajuda</h4>
            <p>Se possível, peça para alguém te ajudar a medir. Isso garante mais precisão.</p>
          </div>
          <div class="tip-card">
            <i class="fas fa-tshirt"></i>
            <h4>Roupas leves</h4>
            <p>Meça-se sobre roupas leves ou diretamente sobre o corpo para maior precisão.</p>
          </div>
        </div>
      </section>

      <section class="size-table-section">
        <h2>Tabela de Medidas</h2>
        <p class="table-description">Todas as medidas estão em centímetros (cm)</p>
        
        <div class="size-table-wrapper">
          <table class="size-table">
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Busto</th>
                <th>Cintura</th>
                <th>Quadril</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="size-label"><strong>46</strong></td>
                <td>106 - 110 cm</td>
                <td>88 - 92 cm</td>
                <td>114 - 118 cm</td>
              </tr>
              <tr>
                <td class="size-label"><strong>48</strong></td>
                <td>112 - 116 cm</td>
                <td>94 - 98 cm</td>
                <td>120 - 124 cm</td>
              </tr>
              <tr>
                <td class="size-label"><strong>50</strong></td>
                <td>118 - 122 cm</td>
                <td>100 - 104 cm</td>
                <td>126 - 130 cm</td>
              </tr>
              <tr>
                <td class="size-label"><strong>52</strong></td>
                <td>124 - 128 cm</td>
                <td>106 - 110 cm</td>
                <td>132 - 136 cm</td>
              </tr>
              <tr>
                <td class="size-label"><strong>54</strong></td>
                <td>130 - 134 cm</td>
                <td>112 - 116 cm</td>
                <td>138 - 142 cm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="how-to-measure">
        <h2>Onde Medir</h2>
        <div class="measure-guide">
          <div class="measure-item">
            <i class="fas fa-circle"></i>
            <div>
              <h4>Busto</h4>
              <p>Passe a fita métrica ao redor da parte mais cheia do busto, mantendo-a paralela ao chão.</p>
            </div>
          </div>
          <div class="measure-item">
            <i class="fas fa-circle"></i>
            <div>
              <h4>Cintura</h4>
              <p>Meça na parte mais fina da cintura, geralmente logo acima do umbigo.</p>
            </div>
          </div>
          <div class="measure-item">
            <i class="fas fa-circle"></i>
            <div>
              <h4>Quadril</h4>
              <p>Passe a fita na parte mais larga do quadril/glúteos, mantendo-a paralela ao chão.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="size-faq">
        <h2>Dúvidas Frequentes</h2>
        <div class="faq-item">
          <h4><i class="fas fa-question-circle"></i> E se minhas medidas estiverem entre dois tamanhos?</h4>
          <p>Recomendamos escolher o tamanho maior para maior conforto, ou considerar o tipo de modelagem que você prefere (mais justa ou mais solta).</p>
        </div>
        <div class="faq-item">
          <h4><i class="fas fa-question-circle"></i> As peças seguem o padrão da tabela?</h4>
          <p>Sim! Todas as nossas peças são desenvolvidas seguindo essa tabela de medidas. No entanto, cada modelo pode ter uma modelagem específica (mais justa ou mais ampla).</p>
        </div>
        <div class="faq-item">
          <h4><i class="fas fa-question-circle"></i> Como saber se o tamanho vai servir?</h4>
          <p>Compare suas medidas com a tabela e escolha o tamanho correspondente. Se tiver dúvidas, nossa equipe no WhatsApp pode te ajudar! (75) 9156-1769</p>
        </div>
      </section>

      <section class="cta-sizes">
        <h2>Ainda com Dúvidas?</h2>
        <p>Nossa equipe está pronta para te ajudar a encontrar o tamanho perfeito!</p>
        <a href="https://wa.me/557591561769" target="_blank" class="btn btn-whatsapp">
          <i class="fab fa-whatsapp"></i> Falar com Consultora
        </a>
      </section>
    </div>
  </main>

  ${renderFooter()}

  ${renderFloatingWhatsApp()}

  <script src="/assets/js/app.js"></script>
</body>
</html>`
}

export function PoliticasPage(cartCount: number = 0): string {
  return `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Políticas | Dona De Mim - Frete, Trocas e Devoluções</title>
  <meta name="description" content="Políticas de frete, trocas e devoluções da Dona de Mim. Frete grátis acima de R$ 299 e primeira troca grátis em até 30 dias.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  ${renderHeader(cartCount)}

  <main class="static-page">
    <div class="static-header">
      <h1>Políticas</h1>
      <p>Frete, trocas e devoluções</p>
    </div>

    <div class="static-content">
      <section class="policy-section">
        <h2><i class="fas fa-truck"></i> Política de Frete</h2>
        <div class="policy-content">
          <p>Trabalhamos com as principais transportadoras do Brasil para garantir que seu pedido chegue rápido e seguro até você.</p>
          
          <div class="shipping-info">
            <div class="shipping-card highlight">
              <i class="fas fa-gift"></i>
              <h3>Frete Grátis</h3>
              <p><strong>Compras acima de R$ 299</strong> têm frete grátis para todo o Brasil. Aproveite para garantir várias peças e economizar!</p>
            </div>
            
            <div class="shipping-card">
              <i class="fas fa-shipping-fast"></i>
              <h3>Prazos de Entrega</h3>
              <ul>
                <li><strong>Nordeste:</strong> 3 a 7 dias úteis</li>
                <li><strong>Sudeste:</strong> 5 a 10 dias úteis</li>
                <li><strong>Sul:</strong> 7 a 12 dias úteis</li>
                <li><strong>Norte/Centro-Oeste:</strong> 7 a 15 dias úteis</li>
              </ul>
            </div>
            
            <div class="shipping-card">
              <i class="fas fa-box"></i>
              <h3>Processamento</h3>
              <p>Seu pedido é preparado e despachado em até <strong>2 dias úteis</strong> após a confirmação do pagamento.</p>
            </div>
          </div>
          
          <p class="policy-note"><i class="fas fa-info-circle"></i> O prazo de entrega começa a contar a partir da data de postagem do pedido.</p>
        </div>
      </section>

      <section class="policy-section">
        <h2><i class="fas fa-sync-alt"></i> Política de Trocas</h2>
        <div class="policy-content">
          <p class="intro">Sua satisfação é nossa prioridade! Se a peça não serviu ou não ficou como esperava, fazemos a troca sem custo adicional.</p>
          
          <div class="exchange-rules">
            <h3>Primeira Troca Grátis</h3>
            <ul class="rules-list">
              <li><i class="fas fa-check"></i> <strong>Prazo:</strong> Até 30 dias corridos após o recebimento do produto</li>
              <li><i class="fas fa-check"></i> <strong>Condição:</strong> Peça sem uso, sem marcas de uso e com todas as etiquetas</li>
              <li><i class="fas fa-check"></i> <strong>Embalagem:</strong> Na embalagem original, se possível</li>
              <li><i class="fas fa-check"></i> <strong>Primeira troca:</strong> Totalmente por nossa conta</li>
              <li><i class="fas fa-check"></i> <strong>Trocas adicionais:</strong> Cliente paga o frete de envio</li>
            </ul>
          </div>
          
          <div class="how-to-exchange">
            <h3>Como Solicitar a Troca</h3>
            <ol>
              <li>Entre em contato pelo WhatsApp <strong>(75) 9156-1769</strong> ou e-mail</li>
              <li>Informe o número do pedido e o motivo da troca</li>
              <li>Receba as instruções de envio e o código de postagem</li>
              <li>Envie a peça de volta em até 7 dias úteis</li>
              <li>Após recebermos, enviamos a nova peça ou fazemos o reembolso</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="policy-section">
        <h2><i class="fas fa-undo"></i> Política de Devoluções</h2>
        <div class="policy-content">
          <p>Você tem o direito de se arrepender da compra em até <strong>7 dias corridos</strong> após o recebimento do produto, conforme o Código de Defesa do Consumidor (Art. 49).</p>
          
          <div class="refund-info">
            <div class="refund-item">
              <h4>Como Devolver</h4>
              <p>Entre em contato conosco pelo WhatsApp ou e-mail informando sua intenção de devolução. Enviaremos todas as instruções.</p>
            </div>
            <div class="refund-item">
              <h4>Reembolso</h4>
              <p>O valor será devolvido integralmente, incluindo o frete, em até 10 dias úteis após recebermos o produto.</p>
            </div>
            <div class="refund-item">
              <h4>Condições</h4>
              <p>O produto deve estar sem uso, em sua embalagem original e com todas as etiquetas.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="policy-section">
        <h2><i class="fas fa-shield-alt"></i> Garantia de Qualidade</h2>
        <div class="policy-content">
          <p>Todos os nossos produtos têm garantia de qualidade. Se você receber uma peça com defeito de fabricação, entre em contato imediatamente que resolveremos o problema.</p>
          
          <div class="quality-promise">
            <div class="promise-item">
              <i class="fas fa-medal"></i>
              <div>
                <h4>Defeito de Fabricação</h4>
                <p>Cobrimos qualquer defeito de fabricação em até 90 dias. Troca imediata sem custo.</p>
              </div>
            </div>
            <div class="promise-item">
              <i class="fas fa-hand-holding-heart"></i>
              <div>
                <h4>Satisfação Garantida</h4>
                <p>Se não estiver satisfeita, devolvemos seu dinheiro. Sua felicidade é nossa prioridade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-policies">
        <h2>Precisa de Ajuda?</h2>
        <p>Nossa equipe está pronta para esclarecer qualquer dúvida sobre nossas políticas.</p>
        <div class="cta-buttons">
          <a href="https://wa.me/557591561769" target="_blank" class="btn btn-whatsapp">
            <i class="fab fa-whatsapp"></i> Falar no WhatsApp
          </a>
          <a href="/" class="btn btn-outline">
            <i class="fas fa-store"></i> Voltar às Compras
          </a>
        </div>
      </section>
    </div>
  </main>

  ${renderFooter()}

  ${renderFloatingWhatsApp()}

  <script src="/assets/js/app.js"></script>
</body>
</html>`
}

