#!/bin/bash
# Script para organizar vídeos por categoria

VIDEOS_DIR="/home/deivi/Projetos/dona-de-mim/public/videos"

# Vídeos de produtos (sessão de fotos das roupas - 7:11 PM)
# Baseado nos timestamps, estes são vídeos das roupas sendo modeladas
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.07 PM.mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-01.mp4" 2>/dev/null
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.07 PM (1).mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-02.mp4" 2>/dev/null
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.08 PM.mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-03.mp4" 2>/dev/null
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.09 PM.mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-04.mp4" 2>/dev/null
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.10 PM.mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-05.mp4" 2>/dev/null
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.11.11 PM.mp4" "$VIDEOS_DIR/produtos/video-conjunto-novo-06.mp4" 2>/dev/null

# Vídeo da loja (timestamp diferente - 7:12 PM)
mv "$VIDEOS_DIR/WhatsApp Video 2026-04-04 at 7.12.16 PM.mp4" "$VIDEOS_DIR/loja/video-loja-tour.mp4" 2>/dev/null

echo "✅ Vídeos organizados:"
echo "  - Produtos: 6 vídeos"
echo "  - Loja: 1 vídeo"
