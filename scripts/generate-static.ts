// ============================================
// DONA DE MIM - Gerador de Páginas Estáticas
// Gera HTML estático para GitHub Pages
// ============================================

import { products } from '../src/data/products.ts'
import { readdirSync } from 'fs'

const BASE_URL = 'https://deivisan.github.io/dona-de-mim/'
const WHATSAPP_NUMBER = '557591561769'
const FUNDADORA = 'Uiara Paula'

// Mapear SKU -> nome do arquivo real
function getImageMap() {
  const map: Record<string, string> = {}
  
  try {
    const blusas = readdirSync('./assets/imgs/produtos/blusas/')
    blusas.forEach(f => {
      const match = f.match(/^(DDM-\d+)-.*\.jpeg$/)
      if (match) map[match[1]] = `blusas/${f}`
    })
  } catch (e) {}
  
  try {
    const vestidos = readdirSync('./assets/imgs/produtos/vestidos/')
    vestidos.forEach(f => {
      const match = f.match(/^(DDM-\d+)-.*\.jpeg$/)
      if (match) map[match[1]] = `vestidos/${f}`
    })
  } catch (e) {}
  
  try {
    const conjuntos = readdirSync('./assets/imgs/produtos/conjuntos/')
    conjuntos.forEach(f => {
      const match = f.match(/^(DDM-\d+)-.*\.jpeg$/)
      if (match) map[match[1]] = `conjuntos/${f}`
    })
  } catch (e) {}
  
  return map
}

const imageMap = getImageMap()

// Função para obter caminho da imagem
function getImagePath(product: typeof products[0]): string {
  const sku = product.sku
  if (imageMap[sku]) {
    return `${BASE_URL}assets/imgs/produtos/${imageMap[sku]}`
  }
  return `${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.45.jpeg`
}

// Função para gerar mensagens WhatsApp padronizadas
function whatsappMessage(type: 'product' | 'general', data?: any): string {
  if (type === 'product' && data) {
    const { nome, sku, preco } = data
    return encodeURIComponent(
      `Olá! 😊\n\n` +
      `Vi o produto *${nome}* (${sku}) no site e amei! ❤️\n\n` +
      `💰 Valor: R$ ${preco.toFixed(2).replace('.', ',')}\n` +
      `📏 Gostaria de saber a disponibilidade dos tamanhos.\n\n` +
      `Aguardo! ✨`
    )
  }
  return encodeURIComponent(
    `Olá! 😊\n\n` +
    `Estou navegando no site da Dona de Mim e gostaria de saber mais sobre os produtos!\n\n` +
    `Pode me ajudar? ❤️\n\n` +
    `Obrigada! ✨`
  )
}

// Função para gerar o CSS base
const generateCSS = () => `
:root {
  --primary: #1a1a1a;
  --secondary: #c9a87c;
  --accent: #8b7355;
  --light: #fafafa;
  --gray: #6b6b6b;
  --border: #e5e5e5;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Poppins', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-body); color: var(--primary); background: var(--light); line-height: 1.6; }

/* Floating WhatsApp */
.floating-whatsapp { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 1000; transition: all 0.3s; text-decoration: none; }
.floating-whatsapp:hover { transform: scale(1.1); box-shadow: 0 6px 25px rgba(37,211,102,0.5); }
.floating-whatsapp i { color: white; font-size: 28px; }

/* Header */
header { background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.header-top { background: var(--primary); color: #fff; text-align: center; padding: 8px; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; }
.header-main { max-width: 1400px; margin: 0 auto; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
.logo { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; letter-spacing: 3px; text-decoration: none; color: var(--primary); }
.logo span { color: var(--secondary); }
nav ul { display: flex; list-style: none; gap: 40px; }
nav a { text-decoration: none; color: var(--primary); font-size: 0.85rem; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; transition: color 0.3s; }
nav a:hover { color: var(--secondary); }
.header-actions { display: flex; gap: 20px; }
.header-actions a { background: none; border: none; cursor: pointer; font-size: 1.2rem; color: var(--primary); text-decoration: none; transition: color 0.3s; }
.header-actions a:hover { color: var(--secondary; }

/* Page Header */
.page-header { background: linear-gradient(135deg, #f5f5f5 0%, #e8e4df 100%); padding: 60px 40px; text-align: center; }
.page-header h1 { font-family: var(--font-display); font-size: 3rem; font-weight: 400; margin-bottom: 10px; }
.page-header h1 span { color: var(--secondary); }
.page-header p { color: var(--gray); font-size: 1.1rem; }
.page-header .breadcrumb { margin-top: 20px; font-size: 0.85rem; }
.page-header .breadcrumb a { color: var(--gray); text-decoration: none; }
.page-header .breadcrumb a:hover { color: var(--secondary); }
.page-header .breadcrumb span { margin: 0 10px; color: var(--gray); }

/* Content Pages */
.page-content { max-width: 900px; margin: 60px auto; padding: 0 40px; }
.page-content h2 { font-family: var(--font-display); font-size: 2rem; margin: 40px 0 20px; color: var(--primary); }
.page-content h3 { font-family: var(--font-display); font-size: 1.5rem; margin: 30px 0 15px; color: var(--primary); }
.page-content p { color: var(--gray); line-height: 1.8; margin-bottom: 20px; }
.page-content ul { margin: 20px 0; padding-left: 20px; }
.page-content li { color: var(--gray); margin-bottom: 10px; }
.page-content .highlight { background: #f9f9f9; padding: 30px; border-radius: 8px; margin: 30px 0; border-left: 4px solid var(--secondary); }
.page-content .highlight h3 { margin-top: 0; }

/* Contact Cards */
.contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin: 40px 0; }
.contact-card { background: #fff; padding: 30px; border-radius: 8px; text-align: center; border: 1px solid var(--border); }
.contact-card i { font-size: 2rem; color: var(--secondary); margin-bottom: 15px; }
.contact-card h4 { font-family: var(--font-display); margin-bottom: 10px; }
.contact-card a { color: var(--gray); text-decoration: none; }
.contact-card a:hover { color: var(--secondary); }

/* Buttons */
.btn { display: inline-block; padding: 16px 48px; background: var(--primary); color: #fff; text-decoration: none; font-size: 0.85rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; border: none; cursor: pointer; }
.btn:hover { background: var(--secondary); transform: translateY(-2px); }
.btn-whatsapp { background: #25D366; color: #fff; padding: 16px 32px; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
.btn-whatsapp:hover { background: #20BD5A; transform: translateY(-2px); }

/* Features */
.features { max-width: 1400px; margin: 60px auto; padding: 60px 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; }
.feature-item i { font-size: 2rem; color: var(--secondary); margin-bottom: 20px; }
.feature-item h4 { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 10px; font-weight: 500; }
.feature-item p { color: var(--gray); font-size: 0.85rem; }

/* Footer */
footer { background: var(--primary); color: #fff; padding: 60px 40px 30px; }
.footer-content { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 40px; }
.footer-brand .logo { color: #fff; margin-bottom: 20px; display: inline-block; }
.footer-brand p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.8; }
.footer-social { display: flex; gap: 15px; margin-top: 20px; }
.footer-social a { width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; transition: background 0.3s; }
.footer-social a:hover { background: var(--secondary); }
.footer-column h5 { font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 25px; font-weight: 500; }
.footer-column ul { list-style: none; }
.footer-column li { margin-bottom: 12px; }
.footer-column a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.3s; }
.footer-column a:hover { color: var(--secondary); }
.whatsapp-link { color: #25D366; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; text-align: center; color: rgba(255,255,255,0.4); font-size: 0.8rem; }

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; }
  .features { grid-template-columns: repeat(2, 1fr); }
  .footer-content { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .header-main { padding: 15px 20px; }
  nav { display: none; }
  .page-header h1 { font-size: 2rem; }
  .features, .footer-content { grid-template-columns: 1fr; }
}
`

// Função para gerar o header
const generateHeader = (currentPage = '') => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona De Mim | Plus Size - Moda Para Mulheres Reais</title>
  <meta name="description" content="Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>${generateCSS()}</style>
</head>
<body>
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage('general')}" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <header>
    <div class="header-top">Moda Plus Size &bull; Do 46 ao 54 &bull; ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="${BASE_URL}#novidades">Novidades</a></li>
          <li><a href="${BASE_URL}blusas.html">Blusas</a></li>
          <li><a href="${BASE_URL}vestidos.html">Vestidos</a></li>
          <li><a href="${BASE_URL}conjuntos.html">Conjuntos</a></li>
          <li><a href="${BASE_URL}sobre-nos.html">Sobre</a></li>
          <li><a href="${BASE_URL}contato.html">Contato</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="${BASE_URL}contato.html" aria-label="Buscar"><i class="fas fa-search"></i></a>
        <a href="${BASE_URL}contato.html" aria-label="Favoritos"><i class="far fa-heart"></i></a>
      </div>
    </div>
  </header>
`

// Função para gerar o footer
const generateFooter = () => `
  <section class="features">
    <div class="feature-item"><i class="fas fa-shipping-fast"></i><h4>Frete Grátis</h4><p>Frete grátis para pedidos acima de R$ 299</p></div>
    <div class="feature-item"><i class="fas fa-undo"></i><h4>Troca Fácil</h4><p>Troca em até 30 dias</p></div>
    <div class="feature-item"><i class="fas fa-lock"></i><h4>Compra Segura</h4><p>Seus dados protegidos</p></div>
    <div class="feature-item"><i class="fab fa-whatsapp"></i><h4>Atendimento</h4><p>Seg. a sáb., 9h às 19h</p></div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
        <p>Moda plus size feita para mulheres reais. Realçando as curvas de quem é Dona de si.<br><br><strong>Uiara Paula</strong> - Fundadora<br>📱 75 9156-1769</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/use_donademiim/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" aria-label="WhatsApp" class="whatsapp-link"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h5>Institucional</h5>
        <ul>
          <li><a href="${BASE_URL}sobre-nos.html">Sobre Nós</a></li>
          <li><a href="${BASE_URL}contato.html">Fale Conosco</a></li>
          <li><a href="${BASE_URL}politicas.html">Políticas</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Ajuda</h5>
        <ul>
          <li><a href="${BASE_URL}trocas.html">Trocas e Devoluções</a></li>
          <li><a href="${BASE_URL}frete.html">Frete e Entrega</a></li>
          <li><a href="${BASE_URL}guia-tamanhos.html">Guia de Tamanhos</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h5>Contato</h5>
        <ul>
          <li><a href="https://wa.me/${WHATSAPP_NUMBER}" class="whatsapp-link"><i class="fab fa-whatsapp"></i> 75 9156-1769</a></li>
          <li><a href="https://www.instagram.com/use_donademiim/" target="_blank"><i class="fab fa-instagram"></i> @use_donademiim</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 DONA DE MIM. Todos os direitos reservados. Feito com ❤️ para mulheres reais.</p>
    </div>
  </footer>
</body>
</html>
`

// ============================================
// PÁGINAS INSTITUCIONAIS
// ============================================

// Página Sobre Nós
const sobreNosContent = `
${generateHeader()}

<div class="page-header">
  <h1>Sobre Nós</h1>
  <p>Conheça a história da Dona de Mim</p>
</div>

<div class="page-content">
  <h2>Bem-vinda à <span style="color: var(--secondary);">Dona de Mim</span></h2>
  <p>Somos muito mais do que uma loja de roupas. Somos um movimento de amor-próprio e celebração da diversidade feminina. A Dona de Mim nasceu com uma missão clara: <strong>vestir mulheres reais, com corpos reais, que merecem se sentir lindas todos os dias.</strong></p>
  
  <div class="highlight">
    <h3>💜 Nossa Filosofia</h3>
    <p>Acreditamos que <strong>a DONA é quem decide o que usar</strong>. Não seguimos trends que não nos servem. Criamos moda que celebra cada curva, cada silhueta, cada mulher única que confia em nós para expressar sua beleza.</p>
  </div>

  <h2>Nossa História</h2>
  <p>Fundada com o propósito de democratizar a moda plus size no Brasil, a Dona de Mim nasceu da frustração de não encontrar roupas que nos representassem. Roupas que fossem modernas, stylish, e principalmente, que nos fizessem sentir bem com nós mesmas.</p>
  
  <p>Hoje, oferecemos peças exclusivas do <strong>46 ao 54</strong>, com modelagens pensadas especialmente para corpos curvilíneos. Cada peça é escolhida ou desenhada para valorizar o que você tem de mais bonito: <strong>Você mesma.</strong></p>

  <h2>O Que Oferecemos</h2>
  <ul>
    <li>👗 <strong>Vestidos</strong> - Para cada ocasião, do casual ao sofisticado</li>
    <li>👚 <strong>Blusas</strong> - Modelagens que valorizam o busto e braços</li>
    <li>👖 <strong>Conjuntos</strong> - Praticidade com estilo</li>
    <li>🩳 <strong>Shorts</strong> - Conforto para o dia a dia</li>
  </ul>

  <h2>Nos Chame no WhatsApp</h2>
  <p>Tire suas dúvidas, peça sugestões de looks, ou simplemente bata um papo sobre moda. Nossa equipe está pronta para atender você!</p>
  <br>
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage('general')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Falar no WhatsApp
  </a>
</div>

${generateFooter()}
`

// Página Contato
const contatoContent = `
${generateHeader()}

<div class="page-header">
  <h1>Fale Conosco</h1>
  <p>Estamos prontas para atender você</p>
</div>

<div class="page-content">
  <h2>Como podemos ajudar?</h2>
  <p>Você pode entrar em contato conosco através do WhatsApp ou Instagram. Respondemos rapidinho!</p>

  <div class="contact-grid">
    <div class="contact-card">
      <i class="fab fa-whatsapp"></i>
      <h4>WhatsApp</h4>
      <a href="https://wa.me/${WHATSAPP_NUMBER}">75 9156-1769</a>
      <p style="font-size: 0.85rem; margin-top: 10px;">Seg. a sáb. 9h às 19h</p>
    </div>
    <div class="contact-card">
      <i class="fab fa-instagram"></i>
      <h4>Instagram</h4>
      <a href="https://www.instagram.com/use_donademiim/">@use_donademiim</a>
      <p style="font-size: 0.85rem; margin-top: 10px;">DM aberto 24h</p>
    </div>
    <div class="contact-card">
      <i class="fas fa-heart"></i>
      <h4>Amor</h4>
      <p>Para você! ❤️</p>
      <p style="font-size: 0.85rem; margin-top: 10px;">Sempre presente</p>
    </div>
  </div>

  <div class="highlight">
    <h3>💬 Prefere escrever?</h3>
    <p>Manda uma mensagem no WhatsApp com sua dúvida. Pode ser sobre:</p>
    <ul>
      <li>Tamanhos e medidas</li>
      <li>Cores disponíveis</li>
      <li>Informações sobre peças</li>
      <li>Trocas e devoluções</li>
      <li>Ou simplesmente para bater um papo! 😊</li>
    </ul>
  </div>

  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage('general')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Enviar Mensagem
  </a>
</div>

${generateFooter()}
`

// Página Trocas
const trocasContent = `
${generateHeader()}

<div class="page-header">
  <h1>Trocas e Devoluções</h1>
  <p>Sua satisfação é nossa prioridade</p>
</div>

<div class="page-content">
  <h2>Política de Trocas</h2>
  <p>Queremos que você ame sua compra. Se por algum motivo precisar trocar ou devolver,sem problemas! Estamos aqui para facilitar.</p>

  <div class="highlight">
    <h3>⏰ Prazo</h3>
    <p>Você tem <strong>até 30 dias</strong> após o recebimento para solicitar troca ou devolução.</p>
  </div>

  <h3>Como Solicitar</h3>
  <ol style="margin: 20px 0; padding-left: 20px;">
    <li style="margin-bottom: 15px;">Entre em contato pelo WhatsApp informando o número do pedido e o motivo da troca/devolução</li>
    <li style="margin-bottom: 15px;">Nossa equipe vai orientá sobre os próximos passos</li>
    <li style="margin-bottom: 15px;">O produto deve estar nas mesmas condições que recebeu: sem uso, com etiquetas e embalagem original</li>
    <li style="margin-bottom: 15px;">O frete de retorno é por conta do cliente, mas we offer cupom de desconto para próxima compra!</li>
  </ol>

  <h3>O Que NÃO Pode Ser Trocado</h3>
  <ul>
    <li>Produtos usados ou com marcas de uso</li>
    <li>Produtos sem etiqueta</li>
    <li>Cosméticos e peças de íntimas (por higiene)</li>
  </ul>

  <h3>Reembolso</h3>
  <p>Após recebermos o produto e confirmarmos o estado, o reembolso é feito em até <strong>5 dias úteis</strong>. O valor retorna pelo mesmo método de pagamento.</p>

  <div class="highlight">
    <h3>💜 Dica</h3>
    <p>Antes de comprar, nos chame no WhatsApp! Tiramos todas as dúvidas sobre tamanhos, cores e caimento. Assim você recebe sua peça perfeita de primeira! ❤️</p>
  </div>

  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de informações sobre trocas e devoluções.')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Falar sobre Trocas
  </a>
</div>

${generateFooter()}
`

// Página Frete
const freteContent = `
${generateHeader()}

<div class="page-header">
  <h1>Frete e Entrega</h1>
  <p>Informações sobre entrega</p>
</div>

<div class="page-content">
  <h2>Condições de Frete</h2>
  
  <div class="highlight">
    <h3>🚚 Frete Grátis</h3>
    <p>Oferecemos <strong>frete grátis</strong> para todo o Brasil em pedidos acima de <strong>R$ 299,00</strong>!</p>
  </div>

  <h3>Prazos de Entrega</h3>
  <ul>
    <li><strong>Região Sul, Sudeste:</strong> 3 a 7 dias úteis</li>
    <li><strong>Região Nordeste, Centro-Oeste:</strong> 5 a 10 dias úteis</li>
    <li><strong>Região Norte:</strong> 7 a 15 dias úteis</li>
  </ul>

  <h3>Como Rastrear</h3>
  <p>Assim que seu pedido for despachado, você receberá o código de rastreamento pelo WhatsApp. É só acessar o site dos Correios ou app de rastreamento para acompanhar!</p>

  <h3>Importante</h3>
  <ul>
    <li>Verifique o endereço de entrega antes de finalizar o pedido</li>
    <li>É necessário ter alguém para receber a encomenda</li>
    <li>Em caso de endereço incorreto, entre em contato imediatamente</li>
  </ul>

  <div class="highlight">
    <h3>💜 Dúvidas?</h3>
    <p>Nos chame no WhatsApp! We're sempre prontos para ajudar. 😊</p>
  </div>

  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre frete e entrega.')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Falar no WhatsApp
  </a>
</div>

${generateFooter()}
`

// Página Guia de Tamanhos
const guiaTamanhosContent = `
${generateHeader()}

<div class="page-header">
  <h1>Guia de Tamanhos</h1>
  <p>Encontre seu tamanho perfeito</p>
</div>

<div class="page-content">
  <h2>Tabela de Medidas</h2>
  <p>Nossas peças são desenvolvidas especialmente para o corpo plus size brasileiro. Veja abaixo:</p>

  <div class="highlight">
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: var(--secondary); color: white;">
          <th style="padding: 12px; text-align: left;">Numeração</th>
          <th style="padding: 12px; text-align: left;">Busto (cm)</th>
          <th style="padding: 12px; text-align: left;">Cintura (cm)</th>
          <th style="padding: 12px; text-align: left;">Quadril (cm)</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px;"><strong>46</strong></td>
          <td>100-104</td>
          <td>80-84</td>
          <td>106-110</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px;"><strong>48</strong></td>
          <td>104-108</td>
          <td>84-88</td>
          <td>110-114</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px;"><strong>50</strong></td>
          <td>108-112</td>
          <td>88-92</td>
          <td>114-118</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px;"><strong>52</strong></td>
          <td>112-116</td>
          <td>92-96</td>
          <td>118-122</td>
        </tr>
        <tr>
          <td style="padding: 12px;"><strong>54</strong></td>
          <td>116-120</td>
          <td>96-100</td>
          <td>122-126</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Como Medir</h3>
  <ul>
    <li><strong>Busto:</strong> Meça a parte mais larga do tórax</li>
    <li><strong>Cintura:</strong> Meça a parte mais fina da cintura</li>
    <li><strong>Quadril:</strong> Meça a parte mais larga do quadril</li>
  </ul>

  <div class="highlight">
    <h3>💜 Não Tem Certeza?</h3>
    <p>Nos chame no WhatsApp! Temos prazer em ajudar você a encontrar o tamanho perfeito!</p>
  </div>

  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Estou com dúvidas sobre tamanhos. Pode me ajudar?')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Tirar Dúvidas sobre Tamanhos
  </a>
</div>

${generateFooter()}
`

// Página Políticas
const politicasContent = `
${generateHeader()}

<div class="page-header">
  <h1>Políticas da Loja</h1>
  <p>Conheça nossas políticas</p>
</div>

<div class="page-content">
  <h2>Política de Privacidade</h2>
  <p>Seus dados são importantes para nós. Todas as informações fornecidas (nome, telefone, endereço, e-mail) são utilizadas exclusivamente para:</p>
  <ul>
    <li>Processamento de pedidos</li>
    <li>Comunicação sobre o pedido</li>
    <li>Informações sobre novidades e promoções (apenas se você permitir)</li>
  </ul>
  <p>Nós <strong>nunca</strong> compartilhamos seus dados com terceiros.</p>

  <h2>Termos de Uso</h2>
  <p>Ao navegar em nosso site e realizar compras, você concorda com nossos termos:</p>
  <ul>
    <li>Todos os preços podem ser alterados sem aviso prévio</li>
    <li>As fotos são ilustrativas - as cores podem variar dependendo do monitor</li>
    <li>Em caso de indisponibilidade de estoque, entraremos em contato</li>
  </ul>

  <h2>Disposições Gerais</h2>
  <p>Esta política é regida pelas leis brasileiras. Para dúvidas, favor entrar em contato.</p>

  <div class="highlight">
    <h3>💜 Estamos Aqui</h3>
    <p>Qualquer dúvida sobre nossas políticas, chame no WhatsApp. Nossa equipe está pronta para ajudar! 😊</p>
  </div>

  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre as políticas da loja.')}" class="btn-whatsapp" target="_blank">
    <i class="fab fa-whatsapp"></i> Falar no WhatsApp
  </a>
</div>

${generateFooter()}
`

// Escrever páginas institucionais
await Bun.write('./sobre-nos.html', sobreNosContent)
await Bun.write('./contato.html', contatoContent)
await Bun.write('./trocas.html', trocasContent)
await Bun.write('./frete.html', freteContent)
await Bun.write('./guia-tamanhos.html', guiaTamanhosContent)
await Bun.write('./politicas.html', politicasContent)

console.log('✅ Páginas institucionais geradas')

// ============================================
// PÁGINA HOME (INDEX) - CSS + GERAÇÃO
// ============================================

// CSS para Home
const heroCSS = `
/* Hero */
.hero { height: 60vh; background: linear-gradient(135deg, #f5f5f5 0%, #e8e4df 100%); display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; top: -50%; right: -20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,124,0.15) 0%, transparent 70%); border-radius: 50%; }
.hero-content { position: relative; z-index: 1; max-width: 800px; padding: 0 20px; }
.hero-subtitle { font-size: 0.9rem; letter-spacing: 4px; text-transform: uppercase; color: var(--gray); margin-bottom: 20px; }
.hero h1 { font-family: var(--font-display); font-size: 3rem; font-weight: 400; margin-bottom: 20px; line-height: 1.1; }
.hero h1 span { color: var(--secondary); font-style: italic; }
.hero-tagline { font-size: 1.3rem; color: var(--primary); font-weight: 500; margin-bottom: 15px; }
.hero p { font-size: 1.1rem; color: var(--gray); max-width: 500px; margin: 0 auto 40px; }
.hero-sizes { display: inline-block; background: var(--secondary); color: #fff; padding: 8px 24px; border-radius: 30px; font-size: 0.9rem; font-weight: 500; letter-spacing: 1px; margin-bottom: 30px; }

/* About */
.about { background: #fff; padding: 80px 40px; text-align: center; }
.about-content { max-width: 800px; margin: 0 auto; }
.about h2 { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 20px; font-weight: 400; }
.about h2 span { color: var(--secondary); }
.about p { font-size: 1.1rem; color: var(--gray); line-height: 1.8; }

/* Categories */
.categories { max-width: 1400px; margin: 60px auto; padding: 0 40px; }
.section-title { font-family: var(--font-display); font-size: 2.5rem; text-align: center; margin-bottom: 40px; font-weight: 400; }
.categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.category-card { position: relative; aspect-ratio: 3/4; overflow: hidden; cursor: pointer; }
.category-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.category-card:hover img { transform: scale(1.05); }
.category-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%); display: flex; align-items: flex-end; padding: 30px; }
.category-info h3 { font-family: var(--font-display); font-size: 1.5rem; color: #fff; font-weight: 400; margin-bottom: 8px; }
.category-info span { color: rgba(255,255,255,0.8); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }
.category-link { text-decoration: none; display: block; }

/* Instagram */
.instagram-section { background: #fff; padding: 80px 40px; text-align: center; }
.instagram-link { display: inline-flex; align-items: center; gap: 10px; color: var(--primary); text-decoration: none; font-size: 1.1rem; font-weight: 500; margin-bottom: 40px; transition: color 0.3s; }
.instagram-link:hover { color: var(--secondary); }
.instagram-link i { font-size: 1.5rem; }
.insta-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; max-width: 1000px; margin: 0 auto; }
.insta-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; transition: opacity 0.3s; }
.insta-grid img:hover { opacity: 0.8; }

@media (max-width: 1024px) {
  .categories-grid, .products-grid { grid-template-columns: repeat(2, 1fr); }
  .insta-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .hero h1 { font-size: 2rem; }
  .categories-grid, .products-grid { grid-template-columns: 1fr; }
  .insta-grid { grid-template-columns: repeat(2, 1fr); }
}
`

// Home CSS = base + hero
const homeCSS = generateCSS() + productCSS + heroCSS

const generateHomeHeader = () => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona De Mim | Plus Size - Moda Para Mulheres Reais</title>
  <meta name="description" content="Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>${homeCSS}</style>
</head>
<body>
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage('general')}" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <header>
    <div class="header-top">Moda Plus Size &bull; Do 46 ao 54 &bull; ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="${BASE_URL}#novidades">Novidades</a></li>
          <li><a href="${BASE_URL}blusas.html">Blusas</a></li>
          <li><a href="${BASE_URL}vestidos.html">Vestidos</a></li>
          <li><a href="${BASE_URL}conjuntos.html">Conjuntos</a></li>
          <li><a href="${BASE_URL}sobre-nos.html">Sobre</a></li>
          <li><a href="${BASE_URL}contato.html">Contato</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="${BASE_URL}contato.html" aria-label="Buscar"><i class="fas fa-search"></i></a>
        <a href="${BASE_URL}contato.html" aria-label="Favoritos"><i class="far fa-heart"></i></a>
      </div>
    </div>
  </header>
`

const indexContent = `
${generateHomeHeader()}

<section class="hero">
  <div class="hero-content">
    <p class="hero-subtitle">Moda Plus Size</p>
    <h1>Realçando As Curvas <span>De Quem É</span> Dona De Si</h1>
    <p class="hero-tagline">Moda Para Mulheres Reais ❤️</p>
    <span class="hero-sizes">Do 46 ao 54</span>
    <br><br>
    <a href="${BASE_URL}blusas.html" class="btn">Ver Coleção</a>
  </div>
</section>

<section class="about" id="sobre">
  <div class="about-content">
    <h2>Bem-vinda à <span>Dona De Mim</span></h2>
    <p>Somos uma marca feita para mulheres reais, que celebra a diversidade e a beleza de cada corpo. Nossa missão é realçar suas curvas com peças exclusivas, modernas e cheias de estilo. Do 46 ao 54, aqui você encontra moda que te representa. <strong>A DONA</strong> é quem decide o que usar. ❤️</p>
  </div>
</section>

<section class="categories" id="colecoes">
  <h2 class="section-title">Nossas Coleções</h2>
  <div class="categories-grid">
    ${generateCategoryCard('vestidos', 'Vestidos')}
    ${generateCategoryCard('blusas', 'Blusas')}
    ${generateCategoryCard('conjuntos', 'Conjuntos')}
  </div>
</section>

<section class="products" id="novidades">
  <h2 class="section-title">Novidades</h2>
  <div class="products-grid">
    ${products.filter(p => p.ativo).slice(0, 8).map(p => generateProductCard(p)).join('')}
  </div>
</section>

<section class="instagram-section" id="contato">
  <a href="https://www.instagram.com/use_donademiim/" target="_blank" class="instagram-link">
    <i class="fab fa-instagram"></i>@use_donademiim
  </a>
  <div class="insta-grid">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.58.jpeg" alt="@use_donademiim">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.59.jpeg" alt="@use_donademiim">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.40.jpeg" alt="@use_donademiim">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.39.jpeg" alt="@use_donademiim">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.47.jpeg" alt="@use_donademiim">
    <img src="${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.46 (1).jpeg" alt="@use_donademiim">
  </div>
</section>

${generateFooter()}
`

await Bun.write('./index.html', indexContent)
console.log('✅ Gerado: index.html')

// ============================================
// PÁGINAS DE PRODUTOS (com mensagens padronizadas)
// ============================================

// Função para gerar card de produto
const generateProductCard = (product: typeof products[0]) => {
  const price = product.preco_promocional || product.preco_venda
  const originalPrice = product.preco_promocional ? product.preco_venda : null
  const tag = product.lancamento ? 'Novo' : (product.destaque ? 'Destaque' : (product.em_promocao ? 'Promoção' : null))
  
  const uniqueName = `${product.nome} (${product.sku})`
  const imgPath = getImagePath(product)
  const fallbackPath = `${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.45.jpeg`
  
  return `
    <a href="${BASE_URL}produto-${product.slug}.html" class="product-card">
      <div class="product-image">
        ${tag ? `<span class="product-tag">${tag}</span>` : ''}
        <img src="${imgPath}" alt="${uniqueName}" onerror="this.src='${fallbackPath}'">
      </div>
      <div class="product-info">
        <h4>${uniqueName}</h4>
        <p class="product-price">R$ ${price.toFixed(2).replace('.', ',')}${originalPrice ? `<span class="product-original">R$ ${originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}</p>
      </div>
    </a>
  `
}

// Função para gerar card de categoria
const generateCategoryCard = (categoria: string, titulo: string) => {
  const categoryImages: Record<string, string> = {
    'vestidos': 'WhatsApp Image 2026-02-19 at 13.18.47 (1).jpeg',
    'blusas': 'WhatsApp Image 2026-02-19 at 13.18.48.jpeg',
    'conjuntos': 'WhatsApp Image 2026-02-19 at 13.18.46.jpeg',
    'shorts': 'WhatsApp Image 2026-02-19 at 13.18.52.jpeg'
  }
  
  return `
    <a href="${BASE_URL}${categoria}.html" class="category-link">
      <div class="category-card">
        <img src="${BASE_URL}assets/imgs/colecoes/${categoryImages[categoria] || 'WhatsApp Image 2026-02-19 at 13.18.45.jpeg'}" alt="${titulo}">
        <div class="category-overlay">
          <div class="category-info">
            <h3>${titulo}</h3>
            <span>Ver coleção</span>
          </div>
        </div>
      </div>
    </a>
  `
}

// CSS adicional para produtos
const productCSS = `
.products { background: #fff; padding: 80px 0; }
.products-grid { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.product-card { cursor: pointer; text-decoration: none; display: block; }
.product-image { aspect-ratio: 3/4; background: #f5f5f5; margin-bottom: 16px; position: relative; overflow: hidden; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.product-card:hover .product-image img { transform: scale(1.05); }
.product-tag { position: absolute; top: 15px; left: 15px; background: var(--secondary); color: #fff; padding: 4px 12px; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; }
.product-info h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 400; margin-bottom: 8px; color: var(--primary); }
.product-price { color: var(--secondary); font-weight: 500; }
.product-original { color: var(--gray); text-decoration: line-through; font-size: 0.85rem; margin-left: 10px; }

/* Product Detail */
.product-detail { max-width: 1200px; margin: 60px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.product-gallery { aspect-ratio: 3/4; background: #f5f5f5; overflow: hidden; }
.product-gallery img { width: 100%; height: 100%; object-fit: cover; }
.product-info-detail h1 { font-family: var(--font-display); font-size: 2rem; font-weight: 400; margin-bottom: 10px; }
.product-sku { color: var(--gray); font-size: 0.85rem; margin-bottom: 20px; }
.product-price-detail { font-size: 2rem; color: var(--secondary); font-weight: 500; margin-bottom: 20px; }
.product-price-detail .original { text-decoration: line-through; color: var(--gray); font-size: 1.2rem; margin-left: 15px; }
.product-description { color: var(--gray); line-height: 1.8; margin-bottom: 30px; }
.product-sizes { margin-bottom: 30px; }
.product-sizes h4 { font-family: var(--font-display); font-size: 1rem; margin-bottom: 15px; }
.size-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
.size-btn { padding: 12px 20px; border: 1px solid var(--border); background: #fff; cursor: pointer; font-size: 0.9rem; transition: all 0.3s; }
.size-btn:hover { border-color: var(--secondary); }
.size-btn.selected { background: var(--secondary); color: #fff; border-color: var(--secondary); }

@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .product-detail { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: 1fr; }
}
`

// Modificar generateCSS para incluir productCSS
const fullCSS = generateCSS() + productCSS

// Modificar generateHeader para usar fullCSS
const generateHeaderWithCSS = (currentPage = '') => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona De Mim | Plus Size - Moda Para Mulheres Reais</title>
  <meta name="description" content="Dona De Mim - Moda plus size Do 46 ao 54. Realçando as curvas de quem é dona de si.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>${fullCSS}</style>
</head>
<body>
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage('general')}" target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <header>
    <div class="header-top">Moda Plus Size &bull; Do 46 ao 54 &bull; ❤️ Mulheres Reais</div>
    <div class="header-main">
      <a href="${BASE_URL}" class="logo">DONA DE <span>MIM</span></a>
      <nav>
        <ul>
          <li><a href="${BASE_URL}#novidades">Novidades</a></li>
          <li><a href="${BASE_URL}blusas.html">Blusas</a></li>
          <li><a href="${BASE_URL}vestidos.html">Vestidos</a></li>
          <li><a href="${BASE_URL}conjuntos.html">Conjuntos</a></li>
          <li><a href="${BASE_URL}sobre-nos.html">Sobre</a></li>
          <li><a href="${BASE_URL}contato.html">Contato</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="${BASE_URL}contato.html" aria-label="Buscar"><i class="fas fa-search"></i></a>
        <a href="${BASE_URL}contato.html" aria-label="Favoritos"><i class="far fa-heart"></i></a>
      </div>
    </div>
  </header>
`

// Gerar páginas de categorias
const categorias = [
  { slug: 'blusas', titulo: 'Blusas Plus Size', products: products.filter(p => p.categoria === 'blusas' && p.ativo) },
  { slug: 'vestidos', titulo: 'Vestidos Plus Size', products: products.filter(p => p.categoria === 'vestidos' && p.ativo) },
  { slug: 'conjuntos', titulo: 'Conjuntos Plus Size', products: products.filter(p => p.categoria === 'conjuntos' && p.ativo) },
  { slug: 'shorts', titulo: 'Shorts Plus Size', products: products.filter(p => p.categoria === 'shorts' && p.ativo) },
]

for (const cat of categorias) {
  const pageContent = `
${generateHeaderWithCSS()}

<div class="page-header">
  <h1>${cat.titulo}</h1>
  <p>${cat.products.length} peças exclusivas esperando por você</p>
  <div class="breadcrumb">
    <a href="${BASE_URL}">Início</a><span>›</span>${cat.titulo}
  </div>
</div>

<section class="products">
  <div class="products-grid">
    ${cat.products.map(p => generateProductCard(p)).join('')}
  </div>
</section>

${generateFooter()}
`
  await Bun.write(`./${cat.slug}.html`, pageContent)
  console.log(`✅ Gerado: ${cat.slug}.html (${cat.products.length} produtos)`)
}

// Gerar páginas de produtos individuais
for (const product of products.filter(p => p.ativo)) {
  const imgPath = getImagePath(product)
  const fallbackPath = `${BASE_URL}assets/imgs/colecoes/WhatsApp Image 2026-02-19 at 13.18.45.jpeg`
  
  const uniqueName = `${product.nome} (${product.sku})`
  
  const sizes = product.tamanhos_disponiveis.map(s => 
    `<button class="size-btn" onclick="selectSize(${s})">${s}</button>`
  ).join('')
  
  const price = product.preco_promocional || product.preco_venda
  const originalPrice = product.preco_promocional ? product.preco_venda : null
  
  // Mensagem WhatsApp padronizada
  const wppMsg = whatsappMessage('product', { nome: uniqueName, sku: product.sku, preco: price })
  
  const productContent = `
${generateHeaderWithCSS()}

<div class="page-header">
  <h1>${uniqueName}</h1>
  <p class="breadcrumb">
    <a href="${BASE_URL}">Início</a><span>›</span>
    <a href="${BASE_URL}${product.categoria}.html">${product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}</a><span>›</span>
    ${uniqueName}
  </p>
</div>

<section class="product-detail">
  <div class="product-gallery">
    <img src="${imgPath}" alt="${uniqueName}" onerror="this.src='${fallbackPath}'">
  </div>
  <div class="product-info-detail">
    <h1>${uniqueName}</h1>
    <p class="product-sku">SKU: ${product.sku}</p>
    <p class="product-price-detail">
      R$ ${price.toFixed(2).replace('.', ',')}
      ${originalPrice ? `<span class="original">R$ ${originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
    </p>
    <p class="product-description">${product.descricao_curta || product.descricao.split('\\n')[0]}</p>
    
    <div class="product-sizes">
      <h4>Selecione o tamanho:</h4>
      <div class="size-buttons">
        ${sizes}
      </div>
    </div>
    
    <div class="product-actions">
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${wppMsg}" class="btn-whatsapp" target="_blank">
        <i class="fab fa-whatsapp"></i> Comprar via WhatsApp
      </a>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 10px;"><strong>Material:</strong> ${product.material}</p>
      <p style="font-size: 0.9rem; color: var(--gray);"><strong>Cuidados:</strong> ${product.cuidados}</p>
    </div>
  </div>
</section>

<section class="products" style="padding-top: 40px;">
  <h2 class="section-title" style="font-family: var(--font-display); font-size: 2rem; text-align: center; margin-bottom: 30px;">Outros produtos que você pode gostar</h2>
  <div class="products-grid">
    ${products.filter(p => p.categoria === product.categoria && p.id !== product.id && p.ativo).slice(0, 4).map(p => generateProductCard(p)).join('')}
  </div>
</section>

${generateFooter()}

<script>
function selectSize(size) {
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
}
</script>
`
  
  await Bun.write(`./produto-${product.slug}.html`, productContent)
}

console.log('\\n🎉 Todas as páginas geradas com sucesso!')
