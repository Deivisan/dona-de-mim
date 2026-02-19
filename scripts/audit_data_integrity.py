import json
import os
from pathlib import Path

# Configuração
BASE_DIR = Path("/home/deivi/Projetos/dona-de-mim")
CATALOGO_PATH = BASE_DIR / "database/catalogo_produtos.json"
PUBLIC_IMGS = BASE_DIR / "public/imgs"
RELATORIO_PATH = BASE_DIR / "AUDITORIA.md"

def auditar():
    print("🕵️ Iniciando Auditoria Agêntica...")
    
    with open(CATALOGO_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    produtos = data['produtos']
    issues = []
    stats = {
        "total": len(produtos),
        "erros_categoria": 0,
        "erros_imagem": 0,
        "alertas_descricao": 0
    }

    # Palavras-chave para detecção de categoria
    keywords = {
        "shorts": ["short", "bermuda"],
        "conjuntos": ["conjunto", "kit"],
        "calcas": ["calça", "jeans", "pantalo"],
        "vestidos": ["vestido", "longo", "curto"],
        "blusas": ["blusa", "camisa", "t-shirt", "cropped", "regata"]
    }

    for p in produtos:
        issue = {
            "id": p['id'],
            "sku": p['sku'],
            "nome": p['nome'],
            "erros": []
        }

        # 1. Validação de Imagem
        tipo_arquivo = "blusa" if p['categoria'] == "blusas" else "vestido" 
        
        caminho_imagem = PUBLIC_IMGS / p['categoria'] / f"{p['sku']}-{tipo_arquivo}.jpeg"
        
        if not caminho_imagem.exists():
            found = False
            if (PUBLIC_IMGS / p['categoria']).exists():
                for f in (PUBLIC_IMGS / p['categoria']).glob(f"{p['sku']}*"):
                    found = True
                    break
            
            if not found:
                issue['erros'].append(f"❌ Imagem não encontrada: {caminho_imagem}")
                stats['erros_imagem'] += 1

        # 2. Validação Cruzada de Categoria
        arquivo_original = p['imagem_principal']['arquivo_original'].lower()
        categoria_atual = p['categoria'].lower()
        
        categoria_sugerida = None
        
        for cat, keys in keywords.items():
            for key in keys:
                if key in arquivo_original and cat != categoria_atual:
                    if categoria_atual == 'vestidos' and cat == 'blusas': continue
                    categoria_sugerida = cat
                    break
        
        if categoria_sugerida:
             issue['erros'].append(f"⚠️ Possível erro de categoria. Atual: '{categoria_atual}'. Sugerida: '{categoria_sugerida}'")
             stats['erros_categoria'] += 1

        # 3. Validação de Descrição
        if len(p['descricao']) < 20:
            issue['erros'].append("⚠️ Descrição muito curta.")
            stats['alertas_descricao'] += 1

        if issue['erros']:
            issues.append(issue)

    # Gerar Relatório
    with open(RELATORIO_PATH, 'w', encoding='utf-8') as f:
        f.write("# 🕵️ Relatório de Auditoria Agêntica\n\n")
        f.write(f"**Total de Produtos:** {stats['total']}\n")
        f.write(f"**Erros de Imagem:** {stats['erros_imagem']}\n")
        f.write(f"**Suspeitas de Categoria:** {stats['erros_categoria']}\n")
        f.write(f"**Alertas de Descrição:** {stats['alertas_descricao']}\n\n")
        
        f.write("## 🚨 Problemas Encontrados\n\n")
        for i in issues:
            f.write(f"### {i['sku']} - {i['nome']}\n")
            for erro in i['erros']:
                f.write(f"- {erro}\n")
            f.write("\n")

    print(f"✅ Auditoria concluída! Relatório salvo em: {RELATORIO_PATH}")
    if stats['erros_categoria'] > 0:
        print(f"⚠️ ATENÇÃO: Encontradas {stats['erros_categoria']} inconsistências de categoria!")

if __name__ == "__main__":
    auditar()
