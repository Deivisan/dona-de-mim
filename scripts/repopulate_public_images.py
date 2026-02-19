import json
import shutil
import os
from pathlib import Path

# Configurações
BASE_DIR = Path("/home/deivi/Projetos/dona-de-mim")
RENOMEACOES_PATH = BASE_DIR / "database/renomeacoes.json"
PUBLIC_IMGS_DIR = BASE_DIR / "public/imgs"

# Carregar mapeamento
with open(RENOMEACOES_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

renomeacoes = data['renomeacoes']

# Limpar diretórios públicos para evitar confusão
if PUBLIC_IMGS_DIR.exists():
    shutil.rmtree(PUBLIC_IMGS_DIR)

# Criar estrutura de pastas
(PUBLIC_IMGS_DIR / "blusas").mkdir(parents=True, exist_ok=True)
(PUBLIC_IMGS_DIR / "vestidos").mkdir(parents=True, exist_ok=True)

print(f"🚀 Iniciando repopulação de {PUBLIC_IMGS_DIR}...")

total = 0
for r in renomeacoes:
    sku = r['sku']
    categoria = r['categoria']
    type_suffix = "blusa" if categoria == "blusas" else "vestido"
    
    # Nome esperado pelo frontend
    nome_esperado = f"{sku}-{type_suffix}.jpeg"
    
    # Caminho de origem (caminho_completo do renomeacoes.json)
    src_path = Path(r['caminho_completo'])
    
    # Caminho de destino
    dst_path = PUBLIC_IMGS_DIR / categoria / nome_esperado
    
    if src_path.exists():
        shutil.copy2(src_path, dst_path)
        print(f"✅ Copiado: {nome_esperado} em {categoria}/")
        total += 1
    else:
        print(f"❌ Erro: Origem não encontrada {src_path}")

print(f"✨ Concluído! {total} imagens repopuladas em public/imgs/")
