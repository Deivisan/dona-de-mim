#!/bin/bash
# Script para renomear imagens novas com nomenclatura DDM-XXXX

NOVOS_DIR="/home/deivi/Projetos/dona-de-mim/public/imgs/novos"
DESTINO_DIR="/home/deivi/Projetos/dona-de-mim/public/imgs"

# Produto DDM-0044 - 7:06:53 (1 imagem)
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.06.53 PM.jpeg" "$DESTINO_DIR/conjuntos/DDM-0044-conjunto-plus-size-novo.jpeg" 2>/dev/null

# Produto DDM-0045 - 7:11:04-7:11:07 (12 imagens - mesmo produto, vários ângulos)
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.04 PM.jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-1.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.05 PM.jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-2.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.05 PM (1).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-3.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.05 PM (2).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-4.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.05 PM (3).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-5.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM.jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-6.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM (1).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-7.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM (2).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-8.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM (3).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-9.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM (4).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-10.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.06 PM (5).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-11.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.07 PM.jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-12.jpeg" 2>/dev/null
mv "$NOVOS_DIR/WhatsApp Image 2026-04-04 at 7.11.07 PM (1).jpeg" "$DESTINO_DIR/conjuntos/DDM-0045-conjunto-plus-size-novo-13.jpeg" 2>/dev/null

# Produtos DDM-0046 a DDM-0050 - 7:12:10-7:12:15 (imagens restantes)
# Dividir proporcionalmente entre produtos

COUNTER=46
INDEX=1

for file in "$NOVOS_DIR"/WhatsApp\ Image\ 2026-04-04\ at\ 7.12.*.jpeg; do
    if [ -f "$file" ]; then
        # Cada produto terá ~7-8 imagens
        if [ $INDEX -le 8 ]; then
            SKU="DDM-0046"
        elif [ $INDEX -le 16 ]; then
            SKU="DDM-0047"
        elif [ $INDEX -le 24 ]; then
            SKU="DDM-0048"
        elif [ $INDEX -le 32 ]; then
            SKU="DDM-0049"
        else
            SKU="DDM-0050"
        fi
        
        SUBINDEX=$(( (INDEX-1) % 8 + 1 ))
        mv "$file" "$DESTINO_DIR/conjuntos/${SKU}-conjunto-plus-size-novo-${SUBINDEX}.jpeg" 2>/dev/null
        INDEX=$((INDEX+1))
    fi
done

echo "Renomeação concluída!"
echo "DDM-0044: 1 imagem"
echo "DDM-0045: 13 imagens"
echo "DDM-0046 a DDM-0050: restante das imagens"
