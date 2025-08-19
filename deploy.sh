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

for arg in "$@"; do
    case $arg in
        --no-cache) NO_CACHE=true ;;
        --pull) PULL=true ;;
    esac
done

PROJECT_NAME="solodesign"
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

log "🔄 Nettoyage images dangling..."
docker image prune -f >/dev/null 2>&1 || true

# Vérification de la santé
log "🏥 Vérification de la santé de l'application..."
sleep 10

HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/api/health || echo "000")
if [ "$HEALTH_CHECK" = "200" ]; then
    success "✅ Application déployée avec succès!"
else
    error "❌ L'application ne répond pas correctement (Code: $HEALTH_CHECK)"
fi

# Nettoyage des images Docker orphelines
log "🧹 Nettoyage des images Docker orphelines..."
docker image prune -f

success "🎉 Déploiement terminé avec succès!"
success "🌐 Application accessible sur: http://$(hostname -I | awk '{print $1}'):3000"

# Logs en temps réel (optionnel)
if command -v docker compose &>/dev/null; then
    LOG_CMD="docker compose logs -f --tail=100 solodesign-app"
else
    LOG_CMD="docker-compose logs -f --tail=100 solodesign-app"
fi
echo
read -p "Afficher les logs ? (y/n): " -n 1 -r; echo
if [[ $REPLY =~ ^[Yy]$ ]]; then eval "$LOG_CMD"; fi
