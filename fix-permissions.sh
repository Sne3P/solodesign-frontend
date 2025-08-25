#!/bin/bash

# Script pour corriger les permissions des uploads après déploiement
# À exécuter si les uploads ne fonctionnent pas

echo "🔧 Correction des permissions pour les uploads..."

# Créer les dossiers si ils n'existent pas
mkdir -p ./data/uploads ./logs ./data

# Créer les fichiers JSON s'ils n'existent pas
[ ! -f "./data/projects.json" ] && echo "[]" > ./data/projects.json
[ ! -f "./data/media.json" ] && echo "{\"images\":{},\"videos\":{}}" > ./data/media.json

# Solution 1: Permissions optimales (propriétaire nextjs)
echo "📝 Tentative de configuration propriétaire nextjs (1001:1001)..."
if [ "$(id -u)" -eq 0 ]; then
    chown -R 1001:1001 ./data ./logs
    chmod -R 755 ./data/uploads ./logs
    chmod 644 ./data/projects.json ./data/media.json
    echo "✅ Permissions optimales configurées"
elif sudo -n chown -R 1001:1001 ./data ./logs 2>/dev/null; then
    chmod -R 755 ./data/uploads ./logs
    chmod 644 ./data/projects.json ./data/media.json
    echo "✅ Permissions optimales configurées via sudo"
else
    echo "⚠️ Impossible de changer le propriétaire, utilisation de permissions larges..."
    # Solution 2: Permissions larges (tout le monde peut écrire)
    chmod -R 777 ./data ./logs
    echo "✅ Permissions larges configurées (777)"
fi

# Redémarrer le conteneur pour appliquer les changements
echo "🔄 Redémarrage du conteneur..."
if command -v docker compose &>/dev/null; then
    docker compose restart solodesign-app
else
    docker-compose restart solodesign-app
fi

echo "✅ Correction terminée."
echo "🧪 Test des permissions:"
echo "   - Dossier uploads: $(ls -ld ./public/uploads/)"
echo "   - Dossier logs: $(ls -ld ./logs/)"
echo ""
echo "💡 Si l'upload ne fonctionne toujours pas:"
echo "   1. Vérifiez les logs: docker logs solodesign-frontend"
echo "   2. Testez l'upload via l'interface admin"
