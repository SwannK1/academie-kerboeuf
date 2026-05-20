#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Académie Kerboeuf — Script de lancement local
# Usage : ./scripts/open-local.sh [--clean]
#
#   --clean   Nettoie le cache .next avant de démarrer
#             (utile après un build raté ou un changement de config)
#
# Exécuter depuis la racine du projet ou depuis n'importe où.
# ─────────────────────────────────────────────────────────────

set -euo pipefail

# ── Résolution du chemin racine (fonctionne depuis n'importe où) ──
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT" || { echo "❌  Impossible d'accéder au projet : $PROJECT_ROOT"; exit 1; }

# ── Options ──────────────────────────────────────────────────
CLEAN=false
if [[ "${1:-}" == "--clean" ]]; then
  CLEAN=true
fi

# ── En-tête ──────────────────────────────────────────────────
echo ""
echo "  🎓  Académie Kerboeuf — Lancement local"
echo "  ─────────────────────────────────────────"
echo ""

# ── 1. Libération du port 3000 ────────────────────────────────
echo "  → Vérification du port 3000..."
PORT_PIDS=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PORT_PIDS" ]; then
  echo "     Port 3000 occupé — libération..."
  echo "$PORT_PIDS" | xargs kill -9 2>/dev/null || true
  sleep 1
  echo "     Port 3000 libéré."
else
  echo "     Port 3000 libre."
fi

# ── 2. Nettoyage du cache (optionnel) ─────────────────────────
if [ "$CLEAN" = true ]; then
  echo "  → Nettoyage du cache .next..."
  rm -rf .next
  echo "     Cache supprimé."
fi

# ── 3. Démarrage du serveur ───────────────────────────────────
echo ""
echo "  → Démarrage du serveur de développement (port 3000)..."
echo "     Appuyez sur Ctrl+C pour arrêter."
echo ""

# Ouvrir le navigateur en arrière-plan après un délai
(sleep 8 && open http://localhost:3000 2>/dev/null) &
OPEN_PID=$!

# Lancer le serveur (bloquant jusqu'à Ctrl+C)
npm run dev -- --port 3000

# Nettoyage si le serveur s'arrête proprement
kill "$OPEN_PID" 2>/dev/null || true

echo ""
echo "  ─────────────────────────────────────────"
echo "  Serveur arrêté."
echo ""
