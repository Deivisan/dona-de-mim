#!/usr/bin/env python3
"""
Analisador de Imagens - Dona de Mim
Extração avançada de características para catálogo de produtos
"""

import os
import json
import hashlib
from pathlib import Path
from collections import Counter
import struct

try:
    from PIL import Image
    import numpy as np

    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("⚠️ Pillow não instalado. Instalando...")
    os.system("pip install Pillow numpy")
    from PIL import Image
    import numpy as np

# Configurações
IMGS_DIR = Path("/home/deivi/Projetos/dona-de-mim/assets/imgs/colecoes")
OUTPUT_DIR = Path("/home/deivi/Projetos/dona-de-mim/database")
OUTPUT_JSON = OUTPUT_DIR / "catalogo_imagens.json"

# Cores de referência para classificação
COLOR_NAMES = {
    (0, 0, 0): "preto",
    (255, 255, 255): "branco",
    (255, 0, 0): "vermelho",
    (0, 255, 0): "verde",
    (0, 0, 255): "azul",
    (255, 255, 0): "amarelo",
    (255, 0, 255): "magenta",
    (0, 255, 255): "ciano",
    (128, 0, 0): "marrom",
    (128, 128, 128): "cinza",
    (255, 192, 203): "rosa",
    (255, 165, 0): "laranja",
    (128, 0, 128): "roxo",
    (245, 245, 220): "bege",
    (255, 215, 0): "dourado",
}


def closest_color(rgb):
    """Encontra o nome da cor mais próxima"""
    r, g, b = rgb
    min_dist = float("inf")
    closest = "indefinido"

    for color_rgb, name in COLOR_NAMES.items():
        cr, cg, cb = color_rgb
        dist = ((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2) ** 0.5
        if dist < min_dist:
            min_dist = dist
            closest = name

    return closest


def extract_palette(img, n_colors=5):
    """Extrai paleta de cores dominantes"""
    # Redimensionar para acelerar
    small = img.resize((150, 150))
    pixels = np.array(small).reshape(-1, 3)

    # K-means simplificado
    from collections import Counter

    # Quantizar cores
    quantized = (pixels // 32) * 32

    # Contar frequência
    color_counts = Counter(map(tuple, quantized))
    top_colors = color_counts.most_common(n_colors)

    palette = []
    for color, count in top_colors:
        if sum(color) > 15:  # Ignorar preto quase puro
            # Converter numpy uint8 para int nativo Python
            color_tuple = tuple(int(c) for c in color)
            palette.append(
                {
                    "rgb": color_tuple,
                    "hex": "#{:02x}{:02x}{:02x}".format(*color_tuple),
                    "nome": closest_color(color_tuple),
                    "percentual": round(int(count) / len(pixels) * 100, 1),
                }
            )

    return palette


def analyze_image(img_path):
    """Analisa uma imagem e retorna metadados completos"""
    try:
        img = Image.open(img_path)
        width, height = img.size
        aspect = width / height

        # Determinar orientação
        if aspect > 1.2:
            orientacao = "paisagem"
            tipo_foto = "catalogo" if aspect > 1.5 else "produto_horizontal"
        elif aspect < 0.8:
            orientacao = "retrato"
            tipo_foto = "produto_vertical" if aspect < 0.7 else "produto"
        else:
            orientacao = "quadrada"
            tipo_foto = "produto"

        # Extrair paleta
        palette = extract_palette(img.convert("RGB"))

        # Calcular brilho médio
        gray = img.convert("L")
        pixels = list(gray.getdata())
        brightness = sum(pixels) / len(pixels) if pixels else 0

        # Classificar brilho
        if brightness < 85:
            tom = "escuro"
        elif brightness < 170:
            tom = "medio"
        else:
            tom = "claro"

        # Cor dominante
        if palette:
            cor_dominante = palette[0]["nome"]
            cor_hex = palette[0]["hex"]
        else:
            cor_dominante = "indefinido"
            cor_hex = "#000000"

        # Inferir categoria baseado em dimensões e características
        # Imagens muito verticais (aspect < 0.5) geralmente são corpo inteiro
        # Imagens quadradas podem ser catálogo ou detalhes

        inferencias = []
        if width == height or abs(width - height) < 100:
            inferencias.append("possivel_catalogo")
        if aspect < 0.5:
            inferencias.append("corpo_inteiro")
        if aspect > 0.6 and aspect < 0.8:
            inferencias.append("meio_corpo")
        if width > height:
            inferencias.append("multiplas_pecas")

        # Hash do arquivo
        with open(img_path, "rb") as f:
            file_hash = hashlib.md5(f.read()).hexdigest()

        return {
            "arquivo": img_path.name,
            "caminho": str(img_path),
            "dimensoes": {"largura": width, "altura": height},
            "aspect_ratio": round(aspect, 3),
            "orientacao": orientacao,
            "tipo_foto": tipo_foto,
            "tamanho_bytes": img_path.stat().st_size,
            "hash_md5": file_hash,
            "brilho_medio": round(brightness, 1),
            "tom": tom,
            "cor_dominante": cor_dominante,
            "cor_hex": cor_hex,
            "paleta": palette,
            "inferencias": inferencias,
            "possivel_categoria": inferir_categoria(
                cor_dominante, palette, aspect, tipo_foto
            ),
        }
    except Exception as e:
        return {"arquivo": img_path.name, "erro": str(e)}


def inferir_categoria(cor_dominante, palette, aspect, tipo_foto):
    """Infere categoria do produto baseado em características visuais"""

    categorias_possiveis = []

    # Baseado em proporção
    if tipo_foto == "catalogo":
        categorias_possiveis.append(("conjuntos", 0.7))
        categorias_possiveis.append(("vestidos", 0.5))
    elif tipo_foto == "produto_vertical":
        categorias_possiveis.append(("vestidos", 0.8))
        categorias_possiveis.append(("macacoes", 0.6))
        categorias_possiveis.append(("conjuntos", 0.5))
    elif tipo_foto == "produto":
        categorias_possiveis.append(("blusas", 0.7))
        categorias_possiveis.append(("shorts", 0.5))
        categorias_possiveis.append(("saias", 0.5))

    # Baseado em cor
    if cor_dominante in ["jeans", "azul"]:
        categorias_possiveis.append(("shorts", 0.9))
        categorias_possiveis.append(("calcas", 0.8))

    if cor_dominante in ["rosa", "pink", "lilas"]:
        categorias_possiveis.append(("blusas", 0.6))

    # Ordenar por probabilidade
    categorias_possiveis.sort(key=lambda x: x[1], reverse=True)

    if categorias_possiveis:
        return {
            "primaria": categorias_possiveis[0][0],
            "confianca": categorias_possiveis[0][1],
            "alternativas": [
                {"categoria": c, "probabilidade": p}
                for c, p in categorias_possiveis[1:4]
            ],
        }
    return {"primaria": "outros", "confianca": 0.3, "alternativas": []}


def generate_product_name(analysis, index):
    """Gera nome descritivo para o produto"""
    cor = analysis.get("cor_dominante", "produto")
    categoria = analysis.get("possivel_categoria", {}).get("primaria", "peca")

    # Limpar nomes
    cor = cor.replace("-", " ").title()
    categoria_map = {
        "vestidos": "Vestido",
        "blusas": "Blusa",
        "shorts": "Short",
        "calcas": "Calça",
        "saias": "Saia",
        "conjuntos": "Conjunto",
        "macacoes": "Macacão",
        "fitness": "Fitness",
        "praia": "Moda Praia",
        "outros": "Peça",
    }

    tipo = categoria_map.get(categoria, "Peça")

    # Adicionar estilo baseado em cor
    estilos = {
        "preto": "Elegante",
        "branco": "Sofisticado",
        "vermelho": "Chamativo",
        "rosa": "Romântico",
        "azul": "Casual",
        "jeans": "Jeans",
        "verde": "Natural",
        "amarelo": "Vibrante",
        "roxo": "Moderninho",
    }

    estilo = estilos.get(analysis.get("cor_dominante", ""), "")

    if estilo:
        return f"{tipo} {cor} {estilo}"
    return f"{tipo} {cor}"


def generate_slug(name):
    """Gera slug URL-friendly"""
    import re

    slug = name.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def main():
    print("🦞 Analisador de Imagens - Dona de Mim")
    print("=" * 50)

    # Listar imagens
    imagens = sorted(IMGS_DIR.glob("*.jpeg")) + sorted(IMGS_DIR.glob("*.jpg"))
    print(f"📁 Encontradas {len(imagens)} imagens")

    catalogo = {
        "meta": {
            "total_imagens": len(imagens),
            "data_analise": "2026-02-19T16:15:00",
            "versao": "1.0",
        },
        "imagens": [],
        "produtos": [],
        "categorias_detectadas": Counter(),
        "cores_detectadas": Counter(),
    }

    for i, img_path in enumerate(imagens, 1):
        print(f"[{i}/{len(imagens)}] Analisando {img_path.name}...")

        analysis = analyze_image(img_path)
        catalogo["imagens"].append(analysis)

        # Incrementar contadores
        if "cor_dominante" in analysis:
            catalogo["cores_detectadas"][analysis["cor_dominante"]] += 1

        if (
            "possivel_categoria" in analysis
            and "primaria" in analysis["possivel_categoria"]
        ):
            catalogo["categorias_detectadas"][
                analysis["possivel_categoria"]["primaria"]
            ] += 1

        # Gerar produto se não for catálogo
        if (
            analysis.get("tipo_foto") != "catalogo"
            or analysis.get("inferencias", []) == []
        ):
            produto = {
                "id": i,
                "sku": f"DDM-{i:04d}",
                "nome": generate_product_name(analysis, i),
                "slug": generate_slug(generate_product_name(analysis, i)),
                "imagem_principal": analysis["arquivo"],
                "categoria_sugerida": analysis.get("possivel_categoria", {}).get(
                    "primaria", "outros"
                ),
                "cor_principal": analysis.get("cor_dominante", "indefinido"),
                "paleta_cores": [c["nome"] for c in analysis.get("paleta", [])],
                "dimensoes_imagem": analysis.get("dimensoes", {}),
                "confianca_categoria": analysis.get("possivel_categoria", {}).get(
                    "confianca", 0
                ),
                "metadados": {
                    "brilho": analysis.get("tom", "medio"),
                    "orientacao": analysis.get("orientacao", "retrato"),
                    "tipo_foto": analysis.get("tipo_foto", "produto"),
                },
            }
            catalogo["produtos"].append(produto)

    # Salvar JSON
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Análise concluída!")
    print(f"📄 JSON salvo em: {OUTPUT_JSON}")
    print(f"\n📊 Resumo:")
    print(f"  Categorias: {dict(catalogo['categorias_detectadas'])}")
    print(f"  Cores: {dict(catalogo['cores_detectadas'])}")


if __name__ == "__main__":
    main()
