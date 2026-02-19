#!/usr/bin/env python3
"""
Renomeador de Imagens - Dona de Mim
Renomeia imagens baseado no catálogo de produtos
"""

import json
import shutil
from pathlib import Path

# Carregar catálogo
with open("/home/deivi/Projetos/dona-de-mim/database/catalogo_produtos.json", "r") as f:
    catalogo = json.load(f)

# Diretórios
SRC_DIR = Path("/home/deivi/Projetos/dona-de-mim/assets/imgs/colecoes")
DST_DIR = Path("/home/deivi/Projetos/dona-de-mim/assets/imgs/produtos")

# Criar estrutura de pastas por categoria
for categoria in catalogo["categorias"]:
    cat_dir = DST_DIR / categoria["slug"]
    cat_dir.mkdir(parents=True, exist_ok=True)

# Renomear e mover imagens
renomeacoes = []
erros = []

for produto in catalogo["produtos"]:
    src_file = SRC_DIR / produto["imagem_principal"]["arquivo_original"]

    if not src_file.exists():
        erros.append(
            {
                "produto_id": produto["id"],
                "sku": produto["sku"],
                "arquivo_original": str(src_file),
                "erro": "Arquivo não encontrado",
            }
        )
        continue

    # Novo nome
    novo_nome = f"{produto['sku']}-{produto['slug']}.jpeg"

    # Destino por categoria
    dst_dir = DST_DIR / produto["categoria"]
    dst_file = dst_dir / novo_nome

    # Copiar arquivo (manter original)
    shutil.copy2(src_file, dst_file)

    renomeacoes.append(
        {
            "produto_id": produto["id"],
            "sku": produto["sku"],
            "arquivo_original": produto["imagem_principal"]["arquivo_original"],
            "arquivo_novo": novo_nome,
            "caminho_completo": str(dst_file),
            "categoria": produto["categoria"],
        }
    )

# Salvar log de renomeações
log_path = Path("/home/deivi/Projetos/dona-de-mim/database/renomeacoes.json")
with open(log_path, "w", encoding="utf-8") as f:
    json.dump(
        {
            "total_renomeados": len(renomeacoes),
            "erros": erros,
            "renomeacoes": renomeacoes,
        },
        f,
        ensure_ascii=False,
        indent=2,
    )

print(f"✅ {len(renomeacoes)} imagens renomeadas e organizadas")
print(f"📁 Estrutura criada em: {DST_DIR}")
if erros:
    print(f"⚠️ {len(erros)} erros encontrados")
print(f"📄 Log salvo em: {log_path}")
