#!/bin/bash

# Script de réparation automatique du système de persistence
# Usage: ./fix-persistence.sh

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log "🔧 Démarrage de la réparation du système de persistence..."

# 1. Vérifier l'état actuel
log "📊 Vérification de l'état actuel du système..."

if [ ! -d "./data" ]; then
    warning "Dossier data manquant, création..."
    mkdir -p ./data
fi

if [ ! -d "./data/uploads" ]; then
    warning "Dossier uploads manquant, création..."
    mkdir -p ./data/uploads
fi

if [ ! -d "./logs" ]; then
    warning "Dossier logs manquant, création..."
    mkdir -p ./logs
fi

# 2. Réparer les fichiers JSON corrompus ou manquants
log "📝 Réparation des fichiers JSON..."

# Backup des fichiers existants
if [ -f "./data/projects.json" ]; then
    cp "./data/projects.json" "./data/projects.json.backup.$(date +%s)" || true
fi

if [ -f "./data/media.json" ]; then
    cp "./data/media.json" "./data/media.json.backup.$(date +%s)" || true
fi

# Vérifier et réparer projects.json
if [ ! -f "./data/projects.json" ] || ! jq empty "./data/projects.json" 2>/dev/null; then
    warning "projects.json manquant ou corrompu, restauration..."
    
    # Essayer de restaurer depuis un backup récent
    LATEST_BACKUP=$(ls -t ./data/projects.json.backup.* 2>/dev/null | head -1 || echo "")
    if [ -n "$LATEST_BACKUP" ] && jq empty "$LATEST_BACKUP" 2>/dev/null; then
        log "📦 Restauration depuis backup: $LATEST_BACKUP"
        cp "$LATEST_BACKUP" "./data/projects.json"
    else
        log "📝 Création d'un nouveau projects.json"
        echo "[]" > "./data/projects.json"
    fi
fi

# Vérifier et réparer media.json
if [ ! -f "./data/media.json" ] || ! jq empty "./data/media.json" 2>/dev/null; then
    warning "media.json manquant ou corrompu, restauration..."
    
    # Essayer de restaurer depuis un backup récent
    LATEST_BACKUP=$(ls -t ./data/media.json.backup.* 2>/dev/null | head -1 || echo "")
    if [ -n "$LATEST_BACKUP" ] && jq empty "$LATEST_BACKUP" 2>/dev/null; then
        log "📦 Restauration depuis backup: $LATEST_BACKUP"
        cp "$LATEST_BACKUP" "./data/media.json"
    else
        log "📝 Création d'un nouveau media.json"
        echo '{"images":{},"videos":{}}' > "./data/media.json"
    fi
fi

# 3. Nettoyer les fichiers temporaires orphelins
log "🧹 Nettoyage des fichiers temporaires..."

# Supprimer les fichiers .tmp anciens (plus de 1 heure)
find ./data -name "*.tmp.*" -type f -mmin +60 -delete 2>/dev/null || true

# Nettoyer les anciens backups (garder seulement les 5 derniers)
for file in projects.json media.json; do
    ls -t ./data/${file}.backup.* 2>/dev/null | tail -n +6 | xargs rm -f 2>/dev/null || true
done

# 4. Réparer les permissions
log "🔑 Réparation des permissions..."

chmod 755 ./data ./data/uploads ./logs 2>/dev/null || true
chmod 644 ./data/projects.json ./data/media.json 2>/dev/null || true

# Essayer de définir le propriétaire pour Docker (utilisateur 1001)
if command -v chown >/dev/null 2>&1; then
    if [ "$(id -u)" = "0" ]; then
        # Nous sommes root, on peut changer le propriétaire
        chown -R 1001:1001 ./data ./data/uploads ./logs 2>/dev/null || true
        success "Permissions Docker configurées (root)"
    else
        # Essayer avec sudo si disponible
        if command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
            sudo chown -R 1001:1001 ./data ./data/uploads ./logs 2>/dev/null || true
            success "Permissions Docker configurées (sudo)"
        else
            warning "Impossible de configurer les permissions Docker (pas de sudo/root)"
        fi
    fi
fi

# 5. Test d'écriture
log "✅ Test du système réparé..."

# Test d'écriture dans data
TEST_FILE="./data/.write-test-$(date +%s)"
if echo "test" > "$TEST_FILE" 2>/dev/null; then
    rm -f "$TEST_FILE"
    success "Dossier data: écriture OK"
else
    error "Dossier data: écriture ÉCHEC"
    exit 1
fi

# Test d'écriture dans uploads
TEST_FILE="./data/uploads/.write-test-$(date +%s)"
if echo "test" > "$TEST_FILE" 2>/dev/null; then
    rm -f "$TEST_FILE"
    success "Dossier uploads: écriture OK"
else
    error "Dossier uploads: écriture ÉCHEC"
    exit 1
fi

# Test de modification des JSON
if echo '[]' | jq . > "/tmp/projects-test.json" 2>/dev/null; then
    if cp "/tmp/projects-test.json" "./data/projects.json.test" 2>/dev/null; then
        rm -f "./data/projects.json.test" "/tmp/projects-test.json"
        success "Fichiers JSON: modification OK"
    else
        error "Fichiers JSON: modification ÉCHEC"
        exit 1
    fi
else
    error "jq non disponible, impossible de tester les JSON"
fi

# 6. Rapport final
log "📊 Génération du rapport de santé..."

echo ""
echo "=== RAPPORT DE RÉPARATION ==="
echo "Timestamp: $(date)"
echo "Environnement: $(uname -a)"
echo ""

echo "DOSSIERS:"
ls -la ./data/ ./data/uploads/ ./logs/ 2>/dev/null || true

echo ""
echo "FICHIERS JSON:"
if [ -f "./data/projects.json" ]; then
    echo "projects.json: $(wc -c < ./data/projects.json) bytes, $(jq length ./data/projects.json 2>/dev/null || echo "?") projets"
else
    echo "projects.json: MANQUANT"
fi

if [ -f "./data/media.json" ]; then
    echo "media.json: $(wc -c < ./data/media.json) bytes"
else
    echo "media.json: MANQUANT"
fi

echo ""
echo "UPLOADS:"
if [ -d "./data/uploads" ]; then
    UPLOAD_COUNT=$(find ./data/uploads -type f | wc -l)
    UPLOAD_SIZE=$(du -sh ./data/uploads 2>/dev/null | cut -f1 || echo "?")
    echo "Fichiers: $UPLOAD_COUNT, Taille: $UPLOAD_SIZE"
else
    echo "Dossier uploads: MANQUANT"
fi

echo ""
echo "BACKUPS DISPONIBLES:"
ls -la ./data/*.backup.* 2>/dev/null | tail -5 || echo "Aucun backup trouvé"

echo ""
success "🎉 Réparation terminée avec succès!"
echo ""
echo "Prochaines étapes recommandées:"
echo "1. Redémarrer l'application: docker-compose restart"
echo "2. Vérifier les logs: docker-compose logs -f"
echo "3. Tester l'upload d'un fichier"
echo "4. Vérifier l'API de statut: GET /api/system/status"
