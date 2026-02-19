-- =====================================================
-- DONA DE MIM - E-commerce Plus Size
-- Schema do Banco de Dados v1.0
-- Arquitetado por DevSan AGI
-- =====================================================

-- CATEGORIAS
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem_destaque VARCHAR(255),
    ativo BOOLEAN DEFAULT 1,
    ordem INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SUBCATEGORIAS
CREATE TABLE IF NOT EXISTS subcategorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria_id INTEGER NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT 1,
    ordem INTEGER DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- CORES
CREATE TABLE IF NOT EXISTS cores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL,
    hex VARCHAR(7),
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- TAMANHOS
CREATE TABLE IF NOT EXISTS tamanhos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero INTEGER NOT NULL UNIQUE,
    descricao VARCHAR(50),
    ativo BOOLEAN DEFAULT 1
);

-- PRODUTOS
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    descricao TEXT,
    descricao_curta VARCHAR(300),
    categoria_id INTEGER NOT NULL,
    subcategoria_id INTEGER,
    preco_custo DECIMAL(10,2),
    preco_venda DECIMAL(10,2) NOT NULL,
    preco_promocional DECIMAL(10,2),
    peso_kg DECIMAL(5,3),
    altura_cm INTEGER,
    largura_cm INTEGER,
    comprimento_cm INTEGER,
    material VARCHAR(100),
    composicao VARCHAR(200),
    cuidados TEXT,
    destaque BOOLEAN DEFAULT 0,
    lancamento BOOLEAN DEFAULT 0,
    promocao BOOLEAN DEFAULT 0,
    ativo BOOLEAN DEFAULT 1,
    estoque_total INTEGER DEFAULT 0,
    vendas_total INTEGER DEFAULT 0,
    visualizacoes INTEGER DEFAULT 0,
    avaliacao_media DECIMAL(2,1) DEFAULT 0,
    total_avaliacoes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id)
);

-- PRODUTO IMAGENS
CREATE TABLE IF NOT EXISTS produto_imagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    arquivo VARCHAR(255) NOT NULL,
    arquivo_original VARCHAR(255),
    ordem INTEGER DEFAULT 0,
    principal BOOLEAN DEFAULT 0,
    alt_text VARCHAR(200),
    largura INTEGER,
    altura INTEGER,
    tamanho_bytes INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- PRODUTO CORES
CREATE TABLE IF NOT EXISTS produto_cores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    cor_id INTEGER NOT NULL,
    nome_comercial VARCHAR(100),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (cor_id) REFERENCES cores(id)
);

-- PRODUTO TAMANHOS (ESTOQUE)
CREATE TABLE IF NOT EXISTS produto_tamanhos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    tamanho_id INTEGER NOT NULL,
    estoque INTEGER DEFAULT 0,
    reservado INTEGER DEFAULT 0,
    disponivel INTEGER GENERATED ALWAYS AS (estoque - reservado) STORED,
    sku_variacao VARCHAR(100),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (tamanho_id) REFERENCES tamanhos(id),
    UNIQUE(produto_id, tamanho_id)
);

-- TAGS
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- PRODUTO TAGS
CREATE TABLE IF NOT EXISTS produto_tags (
    produto_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (produto_id, tag_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- COLECOES
CREATE TABLE IF NOT EXISTS colecoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descricao TEXT,
    imagem_destaque VARCHAR(255),
    data_lancamento DATE,
    ativa BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- PRODUTO COLECOES
CREATE TABLE IF NOT EXISTS produto_colecoes (
    produto_id INTEGER NOT NULL,
    colecao_id INTEGER NOT NULL,
    PRIMARY KEY (produto_id, colecao_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (colecao_id) REFERENCES colecoes(id)
);

-- CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14),
    data_nascimento DATE,
    genero VARCHAR(20),
    senha_hash VARCHAR(255),
    ativo BOOLEAN DEFAULT 1,
    newsletter BOOLEAN DEFAULT 0,
    whatsapp_optin BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ENDERECOS
CREATE TABLE IF NOT EXISTS enderecos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    apelido VARCHAR(50),
    destinatario VARCHAR(100) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    referencia TEXT,
    principal BOOLEAN DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_pedido VARCHAR(20) UNIQUE NOT NULL,
    cliente_id INTEGER,
    endereco_entrega_id INTEGER,
    subtotal DECIMAL(10,2) NOT NULL,
    frete DECIMAL(10,2) DEFAULT 0,
    desconto DECIMAL(10,2) DEFAULT 0,
    cupom_id INTEGER,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pendente',
    status_pagamento VARCHAR(30) DEFAULT 'pendente',
    forma_pagamento VARCHAR(50),
    parcelas INTEGER DEFAULT 1,
    observacoes TEXT,
    rastreamento VARCHAR(100),
    data_pagamento DATETIME,
    data_envio DATETIME,
    data_entrega DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (endereco_entrega_id) REFERENCES enderecos(id)
);

-- PEDIDO ITENS
CREATE TABLE IF NOT EXISTS pedido_itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    tamanho_id INTEGER NOT NULL,
    cor_id INTEGER,
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (tamanho_id) REFERENCES tamanhos(id),
    FOREIGN KEY (cor_id) REFERENCES cores(id)
);

-- CUPONS
CREATE TABLE IF NOT EXISTS cupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(30) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'percentual' ou 'fixo'
    valor DECIMAL(10,2) NOT NULL,
    valor_minimo DECIMAL(10,2),
    limite_uso INTEGER,
    usos_atual INTEGER DEFAULT 0,
    data_inicio DATE,
    data_fim DATE,
    ativo BOOLEAN DEFAULT 1,
    primeiro_pedido BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AVALIACOES
CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    cliente_id INTEGER,
    nota INTEGER NOT NULL CHECK(nota >= 1 AND nota <= 5),
    titulo VARCHAR(100),
    comentario TEXT,
    aprovado BOOLEAN DEFAULT 0,
    data_compra DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- WISHLIST
CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cliente_id, produto_id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- BANNERS
CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(100),
    link VARCHAR(255),
    imagem_desktop VARCHAR(255),
    imagem_mobile VARCHAR(255),
    posicao VARCHAR(50) DEFAULT 'home-topo',
    ordem INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT 1,
    data_inicio DATE,
    data_fim DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- NEWSLETTER
CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(150) UNIQUE NOT NULL,
    nome VARCHAR(100),
    ativo BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- LOGS DE ESTOQUE
CREATE TABLE IF NOT EXISTS estoque_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    tamanho_id INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'entrada', 'saida', 'reserva', 'cancelamento'
    quantidade INTEGER NOT NULL,
    estoque_anterior INTEGER,
    estoque_atual INTEGER,
    pedido_id INTEGER,
    observacao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (tamanho_id) REFERENCES tamanhos(id)
);

-- =====================================================
-- ÍNDICES
-- =====================================================
CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_slug ON produtos(slug);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_produtos_destaque ON produtos(destaque);
CREATE INDEX idx_produtos_preco ON produtos(preco_venda);
CREATE INDEX idx_pedido_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedido_status ON pedidos(status);
CREATE INDEX idx_pedido_data ON pedidos(created_at);

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Tamanhos Plus Size (46-54)
INSERT INTO tamanhos (numero, descricao) VALUES
(46, 'Tamanho 46 - Equivalente GG'),
(48, 'Tamanho 48 - Equivalente XGG'),
(50, 'Tamanho 50 - Equivalente XXG'),
(52, 'Tamanho 52 - Equivalente XXXG'),
(54, 'Tamanho 54 - Equivalente XXXXG');

-- Categorias Principais
INSERT INTO categorias (slug, nome, descricao, ordem) VALUES
('vestidos', 'Vestidos', 'Vestidos elegantes e sofisticados para todas as ocasiões', 1),
('blusas', 'Blusas', 'Blusas modernas e confortáveis para o dia a dia', 2),
('shorts', 'Shorts', 'Shorts jeans e tecido com caimento perfeito', 3),
('calcas', 'Calças', 'Calças elegantes e confortáveis', 4),
('saias', 'Saias', 'Saias de diversos modelos e comprimentos', 5),
('conjuntos', 'Conjuntos', 'Conjuntos coordenados prontos para usar', 6),
('macacoes', 'Macacões', 'Macacões estilosos e modernos', 7),
('fitness', 'Fitness', 'Roupas fitness para mulheres ativas', 8),
('praia', 'Moda Praia', 'Biquínis e maiôs plus size', 9),
('acessorios', 'Acessórios', 'Acessórios para complementar seu look', 10);

-- Cores Base
INSERT INTO cores (nome, hex, slug) VALUES
('Preto', '#1a1a1a', 'preto'),
('Branco', '#ffffff', 'branco'),
('Vermelho', '#c41e3a', 'vermelho'),
('Rosa', '#ff69b4', 'rosa'),
('Rosa Choque', '#ff1493', 'rosa-choque'),
('Pink', '#ff69b4', 'pink'),
('Azul', '#4169e1', 'azul'),
('Azul Marinho', '#000080', 'azul-marinho'),
('Azul Royal', '#4169e1', 'azul-royal'),
('Jeans', '#6b8e9f', 'jeans'),
('Verde', '#228b22', 'verde'),
('Verde Militar', '#4d5d53', 'verde-militar'),
('Verde Limão', '#32cd32', 'verde-limao'),
('Amarelo', '#ffd700', 'amarelo'),
('Laranja', '#ff8c00', 'laranja'),
('Roxo', '#800080', 'roxo'),
('Lilás', '#d8bfd8', 'lilas'),
('Marrom', '#8b4513', 'marrom'),
('Bege', '#f5f5dc', 'bege'),
('Nude', '#e3bc9a', 'nude'),
('Caramelo', '#ffcc66', 'caramelo'),
('Dourado', '#ffd700', 'dourado'),
('Prata', '#c0c0c0', 'prata'),
('Estampado', NULL, 'estampado'),
('Floral', NULL, 'floral'),
('Listrado', NULL, 'listrado'),
('Xadrez', NULL, 'xadrez');

-- Tags Populares
INSERT INTO tags (nome, slug) VALUES
('Novidade', 'novidade'),
('Destaque', 'destaque'),
('Promoção', 'promocao'),
('Lançamento', 'lancamento'),
('Best Seller', 'best-seller'),
('Elegante', 'elegante'),
('Casual', 'casual'),
('Festa', 'festa'),
('Trabalho', 'trabalho'),
('Verão', 'verao'),
('Inverno', 'inverno'),
('Plus Size', 'plus-size'),
('Exclusivo', 'exclusivo'),
('Edição Limitada', 'edicao-limitada');
