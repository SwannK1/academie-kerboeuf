#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Académie Kerboeuf — Lancement local (double-clic sur Mac)
# ─────────────────────────────────────────────────────────────
# Ce fichier lance automatiquement le site en local et ouvre
# le navigateur. Double-cliquez dessus depuis le Finder.
# ─────────────────────────────────────────────────────────────

PROJET="/Users/swann/Desktop/Academie KERBOEUF/academie-kerboeuf"

cd "$PROJET" || { echo "❌ Dossier projet introuvable : $PROJET"; exit 1; }

echo ""
echo "🎓 Académie Kerboeuf — Lancement en local"
echo "─────────────────────────────────────────"
echo ""

# 1. Libérer le port 3000 si un ancien processus l'occupe
echo "Vérification du port 3000..."
PIDS=$(lsof -ti:3000 2>/dev/null)
if [ -n "$PIDS" ]; then
  echo "  → Port 3000 occupé — libération en cours..."
  echo "$PIDS" | xargs kill -9 2>/dev/null || true
  sleep 1
else
  echo "  → Port 3000 libre."
fi

# 2. Nettoyer le cache Next.js pour éviter les bugs de démarrage
echo "Nettoyage du cache Next.js (.next)..."
rm -rf .next
echo "  → Cache nettoyé."
echo ""

# 3. Démarrer le serveur Next.js en arrière-plan
echo "Démarrage du serveur..."
npm run dev &
SERVER_PID=$!

# 4. Attendre que le serveur soit prêt (jusqu'à 30 secondes)
echo "Attente du serveur (max 30 secondes)..."
READY=0
for i in $(seq 1 15); do
  sleep 2
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    READY=1
    break
  fi
  echo "  ... $((i * 2))s"
done

echo ""
if [ $READY -eq 1 ]; then
  echo "✅ Serveur prêt !"
  echo "   Ouverture de http://localhost:3000 dans le navigateur..."
  open http://localhost:3000
else
  echo "⚠️  Le serveur met du temps à démarrer."
  echo "   Ouvrez manuellement : http://localhost:3000"
  echo "   (attendez quelques secondes si la page ne charge pas)"
fi

echo ""
echo "─────────────────────────────────────────"
echo "Site disponible sur : http://localhost:3000"
echo "Appuyez sur Ctrl+C dans ce terminal pour arrêter le serveur."
echo "─────────────────────────────────────────"
echo ""

# Garder le terminal ouvert jusqu'à l'arrêt du serveur
wait $SERVER_PID
