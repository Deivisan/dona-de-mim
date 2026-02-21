#!/usr/bin/env python3
"""
Gerador de Catálogo de Produtos - Dona de Mim
Transforma análise de imagens em catálogo completo de produtos
"""

import json
import re
import hashlib
from pathlib import Path
from datetime import datetime

# Carregar análise de imagens
with open("/home/deivi/Projetos/dona-de-mim/database/catalogo_imagens.json", "r") as f:
    analise = json.load(f)

# Mapeamento de cores para nomes comerciais
CORES_COMERCIAIS = {
    "preto": "Preto Clássico",
    "branco": "Branco Puro",
    "vermelho": "Vermelho Vibrante",
    "rosa": "Rosa Delicado",
    "pink": "Pink Moderno",
    "azul": "Azul Celeste",
    "azul-marinho": "Azul Marinho",
    "jeans": "Azul Jeans",
    "verde": "Verde Natureza",
    "amarelo": "Amarelo Sol",
    "laranja": "Laranja Tropical",
    "roxo": "Roxo Elegante",
    "lilas": "Lilás Suave",
    "marrom": "Marrom Chocolate",
    "bege": "Bege Natural",
    "nude": "Nude Sofisticado",
    "cinza": "Cinza Chique",
    "dourado": "Dourado Luxo",
}

# Mapeamento de categorias para descrições
DESCRICOES_CATEGORIAS = {
    "vestidos": {
        "titulo": "Vestido Plus Size",
        "descricao_base": "Vestido elegante plus size, perfeito para ocasiões especiais ou uso diário. Tecido de alta qualidade com caimento impecável. Tamanhos do 46 ao 54.",
        "cuidados": "Lavar à mão ou máquina em ciclo delicado. Não usar alvejante. Secar à sombra. Passar em temperatura baixa.",
        "materiais": ["Viscose", "Poliéster", "Algodão", "Crepe", "Malha"],
    },
    "blusas": {
        "titulo": "Blusa Plus Size",
        "descricao_base": "Blusa moderna e confortável plus size. Design exclusivo que valoriza as curvas. Tecido macio e respirável. Tamanhos do 46 ao 54.",
        "cuidados": "Lavar à mão com sabão neutro. Não torcer. Secar à sombra. Passar pelo avesso.",
        "materiais": ["Algodão", "Viscose", "Poliéster", "Seda", "Linho"],
    },
    "shorts": {
        "titulo": "Short Plus Size",
        "descricao_base": "Short jeans plus size com elastano para máximo conforto. Caimento perfeito que valoriza as curvas. Tamanhos do 46 ao 54.",
        "cuidados": "Lavar à máquina com cores similares. Não usar alvejante. Secar à sombra.",
        "materiais": ["Jeans com Elastano", "Sarja", "Cetim"],
    },
    "calcas": {
        "titulo": "Calça Plus Size",
        "descricao_base": "Calça elegante plus size, perfeita para o trabalho ou eventos. Caimento impecável e conforto garantido. Tamanhos do 46 ao 54.",
        "cuidados": "Lavar à máquina em ciclo delicado. Passar em temperatura média.",
        "materiais": ["Sarja", "Crepe", "Algodão"],
    },
    "conjuntos": {
        "titulo": "Conjunto Plus Size",
        "descricao_base": "Conjunto coordenado plus size, pronto para usar. Combinação perfeita de peças que valorizam seu estilo. Tamanhos do 46 ao 54.",
        "cuidados": "Seguir instruções de cada peça separadamente.",
        "materiais": ["Mix de tecidos", "Viscose", "Algodão"],
    },
    "macacoes": {
        "titulo": "Macacão Plus Size",
        "descricao_base": "Macacão moderno plus size, peça única que compõe o look completo. Conforto e estilo em uma só peça. Tamanhos do 46 ao 54.",
        "cuidados": "Lavar à mão ou ciclo delicado. Secar à sombra.",
        "materiais": ["Viscose", "Crepe", "Algodão"],
    },
}

# Gerar catálogo completo
catalogo = {
    "meta": {
        "nome_loja": "Dona de Mim",
        "slogan": "Moda Para Mulheres Reais ❤️",
        "tagline": "Realçando As Curvas De Quem É Dona De Si",
        "tamanhos_disponiveis": [46, 48, 50, 52, 54],
        "data_geracao": datetime.now().isoformat(),
        "versao": "1.0",
        "total_produtos": len(analise["imagens"]),
    },
    "categorias": [],
    "produtos": [],
    "estoque": [],
}

# Agrupar por categoria
categorias_count = {}
for img in analise["imagens"]:
    cat = img.get("possivel_categoria", {}).get("primaria", "outros")
    categorias_count[cat] = categorias_count.get(cat, 0) + 1

# Criar categorias
for slug, count in sorted(categorias_count.items()):
    if slug in DESCRICOES_CATEGORIAS:
        categorias_desc = DESCRICOES_CATEGORIAS[slug]
        catalogo["categorias"].append(
            {
                "id": len(catalogo["categorias"]) + 1,
                "slug": slug,
                "nome": slug.title(),
                "descricao": categorias_desc["descricao_base"],
                "total_produtos": count,
                "ativa": True,
                "ordem": len(catalogo["categorias"]) + 1,
            }
        )

# Gerar produtos
produto_id = 1
for img in analise["imagens"]:
    categoria = img.get("possivel_categoria", {}).get("primaria", "outros")
    cor = img.get("cor_dominante", "indefinido")
    paleta = img.get("paleta", [])

    # Nome comercial da cor
    cor_comercial = CORES_COMERCIAIS.get(cor, cor.title())

    # Descrição da categoria
    cat_info = DESCRICOES_CATEGORIAS.get(categoria, DESCRICOES_CATEGORIAS["blusas"])

    # Gerar nome do produto
    titulo_base = cat_info["titulo"]
    nome = f"{titulo_base} {cor_comercial}"

    # Gerar slug
    slug = re.sub(r"[^a-z0-9]+", "-", nome.lower()).strip("-")

    # Descrição completa
    descricao = f"{cat_info['descricao_base']}\n\n"
    descricao += f"**Cor:** {cor_comercial}\n"
    if paleta:
        cores_paleta = [p["nome"] for p in paleta[:3] if p["nome"] != cor]
        if cores_paleta:
            descricao += f"**Tons complementares:** {', '.join(set(cores_paleta))}\n"
    descricao += f"\n**Cuidados:** {cat_info['cuidados']}"

    # Preços simulados baseados em categoria
    precos_base = {
        "vestidos": {"min": 189.90, "max": 389.90},
        "blusas": {"min": 89.90, "max": 189.90},
        "shorts": {"min": 99.90, "max": 179.90},
        "calcas": {"min": 149.90, "max": 269.90},
        "conjuntos": {"min": 199.90, "max": 399.90},
        "macacoes": {"min": 179.90, "max": 329.90},
    }

    import random

    preco_range = precos_base.get(categoria, {"min": 99.90, "max": 199.90})
    preco_venda = round(random.uniform(preco_range["min"], preco_range["max"]), 2)

    # SKU
    sku = f"DDM-{produto_id:04d}"

    # Produto
    produto = {
        "id": produto_id,
        "sku": sku,
        "nome": nome,
        "slug": f"{slug}-{produto_id}",
        "descricao": descricao,
        "descricao_curta": f"{titulo_base} em {cor_comercial}. Tamanhos 46 ao 54.",
        "categoria": categoria,
        "categoria_id": next(
            (c["id"] for c in catalogo["categorias"] if c["slug"] == categoria), 1
        ),
        "preco_venda": preco_venda,
        "preco_promocional": round(preco_venda * 0.85, 2)
        if random.random() > 0.7
        else None,
        "em_promocao": random.random() > 0.7,
        "destaque": produto_id <= 8,  # Primeiros 8 como destaque
        "lancamento": produto_id <= 4,  # Primeiros 4 como lançamento
        "ativo": True,
        "imagem_principal": {
            "arquivo_original": img["arquivo"],
            "arquivo_novo": f"{slug}.jpeg",
            "dimensoes": img["dimensoes"],
            "tamanho_bytes": img["tamanho_bytes"],
            "hash_md5": img["hash_md5"],
            "cor_dominante": cor,
            "cor_hex": img.get("cor_hex", "#000000"),
            "paleta": paleta[:4] if paleta else [],
        },
        "tamanhos_disponiveis": [46, 48, 50, 52, 54],
        "material": random.choice(cat_info["materiais"]),
        "cuidados": cat_info["cuidados"],
        "created_at": datetime.now().isoformat(),
    }

    catalogo["produtos"].append(produto)

    # Gerar estoque para cada tamanho
    for tamanho in [46, 48, 50, 52, 54]:
        estoque_qtd = random.randint(0, 15)
        catalogo["estoque"].append(
            {
                "produto_id": produto_id,
                "sku_variacao": f"{sku}-{tamanho}",
                "tamanho": tamanho,
                "estoque": estoque_qtd,
                "reservado": random.randint(0, min(2, estoque_qtd)),
                "disponivel": estoque_qtd,
            }
        )

    produto_id += 1

# Salvar catálogo
output_path = Path("/home/deivi/Projetos/dona-de-mim/database/catalogo_produtos.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(catalogo, f, ensure_ascii=False, indent=2)

print(f"✅ Catálogo gerado com {len(catalogo['produtos'])} produtos")
print(f"📊 Categorias: {len(catalogo['categorias'])}")
print(f"📦 Estoque total: {len(catalogo['estoque'])} variações")
print(f"📄 Salvo em: {output_path}")
