#!/bin/bash

# Script de déploiement automatisé pour SoloDesign
# Usage: ./deploy.sh [environment] [--no-cache] [--pull]

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Variables
ENVIRONMENT=${1:-production}
SHIFTED=1
NO_CACHE=false
PULL=false
PRUNE_OLD=false
DEEP_CLEAN=false
PRUNE_VOLUMES=false
KEEP_IMAGES=3

for arg in "$@"; do
    case $arg in
        --no-cache) NO_CACHE=true ;;
        --pull) PULL=true ;;
        --prune-old) PRUNE_OLD=true ;;
        --deep-clean) DEEP_CLEAN=true ;;
        --prune-volumes) PRUNE_VOLUMES=true ;;
        --keep=*) KEEP_IMAGES="${arg#*=}" ;;
    esac
done

PROJECT_NAME="solodesign"
CONTAINER_NAME="solodesign-frontend"
GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
BUILD_TAG="${ENVIRONMENT}-${GIT_SHA}"
DOCKER_IMAGE="${PROJECT_NAME}:${BUILD_TAG}"
LATEST_TAG="${PROJECT_NAME}:latest"
COMPOSE_FILE="docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
    error "docker-compose.yml introuvable"
fi

log "🚀 Début du déploiement pour l'environnement: ${ENVIRONMENT} (tag: ${BUILD_TAG})"

# Vérification des prérequis
log "🔍 Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    error "Docker n'est pas installé"
fi

if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    error "Docker Compose n'est pas installé"
fi

# Chargement des variables d'environnement
ENV_FILE=".env.${ENVIRONMENT}"
if [ ! -f "$ENV_FILE" ]; then
    error "Fichier d'environnement requis manquant: $ENV_FILE"
fi
log "📄 Vérification des variables critiques..."
REQUIRED_VARS=(JWT_SECRET ADMIN_PASSWORD_HASH EMAIL_USER EMAIL_PASS NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_SITE_NAME)
MISSING=()
for v in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^$v=" "$ENV_FILE"; then MISSING+=("$v"); fi
done
if [ ${#MISSING[@]} -gt 0 ]; then
    error "Variables manquantes dans $ENV_FILE: ${MISSING[*]}"
fi

set -o allexport; source "$ENV_FILE"; set +o allexport

# Tests de sécurité et qualité
log "🧹 Nettoyage des console.log (pré-build)..."
npm run clean:console >/dev/null 2>&1 || warning "Nettoyage console échoué"

BUILD_ARGS=()
$NO_CACHE && BUILD_ARGS+=(--no-cache)
$PULL && BUILD_ARGS+=(--pull)

log "🐳 Build image Docker (tag: ${DOCKER_IMAGE})..."
docker build ${BUILD_ARGS[@]} -t "$DOCKER_IMAGE" -t "$LATEST_TAG" . || error "Échec build Docker"

# Arrêt du conteneur existant
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    log "🛑 Arrêt du conteneur existant..."
    docker stop $CONTAINER_NAME
fi

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    log "🗑️ Suppression du conteneur existant..."
    docker rm $CONTAINER_NAME
fi

log "🧱 Mise à jour docker-compose service application..."

# Arrêt ancien conteneur géré par compose
if docker ps --format '{{.Names}}' | grep -q "solodesign-frontend"; then
    log "🛑 Arrêt précédent via compose"
fi

export IMAGE_OVERRIDE="$DOCKER_IMAGE"

if command -v docker compose &>/dev/null; then
        docker compose down --remove-orphans || true
        docker compose up -d --no-deps --build solodesign-app || docker compose up -d solodesign-app
else
        docker-compose down --remove-orphans || true
        docker-compose up -d --no-deps --build solodesign-app || docker-compose up -d solodesign-app
fi

# Vérification réseau externe (npm_network) si non exposition de port
if ! docker network inspect npm_network >/dev/null 2>&1; then
    warning "Réseau externe npm_network introuvable (créez-le avec: docker network create npm_network)."
else
    if ! docker network inspect npm_network 2>/dev/null | grep -q 'solodesign-frontend'; then
        warning "Conteneur pas encore sur npm_network (Docker démarre peut-être)."
    else
        log "🔗 Conteneur attaché au réseau npm_network"
    fi
fi

log "🔄 Nettoyage images dangling..."
docker image prune -f >/dev/null 2>&1 || true

if [ "$DEEP_CLEAN" = true ]; then
    log "🧨 Deep clean: prune images/build cache..."
    docker builder prune -af >/dev/null 2>&1 || true
    docker image prune -af >/dev/null 2>&1 || true
    if [ "$PRUNE_VOLUMES" = true ]; then
        log "🗃️ Prune volumes non utilisés..."
        docker volume prune -f >/dev/null 2>&1 || true
    fi
fi

# Optionnel: suppression des anciennes images de production (garde les 3 plus récentes)
if [ "$PRUNE_OLD" = true ]; then
    log "🧽 Nettoyage anciens tags de production (conservation $KEEP_IMAGES derniers)..."
    IMAGE_LIST=$(docker images --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep '^solodesign:production-' || true)
    if [ -n "$IMAGE_LIST" ]; then
        COUNT=0
        echo "$IMAGE_LIST" | while read -r LINE; do
            IMG_TAG=$(echo "$LINE" | awk '{print $1}')
            IMG_ID=$(echo "$LINE" | awk '{print $2}')
            COUNT=$((COUNT+1))
            if [ $COUNT -le $KEEP_IMAGES ]; then
                log "➡️ Conserve $IMG_TAG ($IMG_ID)"
            else
                log "🗑️ Suppression image $IMG_TAG ($IMG_ID)"
                docker rmi -f "$IMG_ID" >/dev/null 2>&1 || true
            fi
        done
    else
        log "ℹ️ Aucune image ancienne à nettoyer"
    fi
fi

# Vérification de la santé
log "🏥 Vérification de la santé de l'application..."
ATTEMPTS=0
MAX_ATTEMPTS=15
SLEEP_BETWEEN=4

# Détection exposition port host (ex: 3010:3000)
EXTERNAL_MAPPING=$(docker ps --format '{{.Names}} {{.Ports}}' | grep "^$CONTAINER_NAME " | awk '{print $2}') || true
USE_INTERNAL=false
if echo "$EXTERNAL_MAPPING" | grep -q '3010->3000'; then
    HEALTH_URL="http://127.0.0.1:3010/api/health"
else
    USE_INTERNAL=true
    HEALTH_URL="http://solodesign-frontend:3000/api/health"
fi

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    if [ "$USE_INTERNAL" = true ]; then
         STATUS=$(docker run --rm --network npm_network curlimages/curl:8.8.0 curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || echo "000")
    else
         STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || echo "000")
    fi
    if [ "$STATUS" = "200" ]; then
        success "✅ Application healthy (code 200) via ${USE_INTERNAL:true=interne:false=externe}"
        break
    fi
    ATTEMPTS=$((ATTEMPTS+1))
    log "⏳ En attente de l'application... tentative $ATTEMPTS/$MAX_ATTEMPTS (dernier code: $STATUS)"
    sleep $SLEEP_BETWEEN
done
[ "$STATUS" = "200" ] || error "❌ Healthcheck échoué après $MAX_ATTEMPTS tentatives (dernier code: $STATUS | URL: $HEALTH_URL | interne=$USE_INTERNAL)"

# Nettoyage des images Docker orphelines
log "🧹 Nettoyage des images Docker orphelines..."
docker image prune -f

success "🎉 Déploiement terminé avec succès!"
if [ "$USE_INTERNAL" = true ]; then
    success "🌐 Application accessible via domaine proxifié (Nginx Proxy Manager). Configure solodesign.fr -> solodesign-frontend:3000"
else
    success "🌐 Application accessible sur: http://$(hostname -I | awk '{print $1}'):3010"
fi

log "📋 Récapitulatif déploiement:"
echo "  - Image utilisée: $DOCKER_IMAGE"
echo "  - Ports exposés: ${EXTERNAL_MAPPING:-(aucun, mode proxy)}"
echo "  - Réseau npm_network: $(docker network inspect npm_network 2>/dev/null | grep -q 'solodesign-frontend' && echo OK || echo ABSENT)"
echo "  - Prune old: $PRUNE_OLD (keep=$KEEP_IMAGES) | Deep clean: $DEEP_CLEAN | Volumes pruned: $PRUNE_VOLUMES"

# Logs en temps réel (optionnel)
if command -v docker compose &>/dev/null; then
    LOG_CMD="docker compose logs -f --tail=100 solodesign-app"
else
    LOG_CMD="docker-compose logs -f --tail=100 solodesign-app"
fi
echo
read -p "Afficher les logs ? (y/n): " -n 1 -r; echo
if [[ $REPLY =~ ^[Yy]$ ]]; then eval "$LOG_CMD"; fi
