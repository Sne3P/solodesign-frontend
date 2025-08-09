#!/bin/bash

# Script de déploiement automatisé pour SoloDesign
# Usage: ./deploy.sh [environment]

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
PROJECT_NAME="solodesign"
DOCKER_IMAGE="${PROJECT_NAME}:${ENVIRONMENT}"
CONTAINER_NAME="${PROJECT_NAME}-${ENVIRONMENT}"

log "🚀 Début du déploiement pour l'environnement: ${ENVIRONMENT}"

# Vérification des prérequis
log "🔍 Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    error "Docker n'est pas installé"
fi

if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé"
fi

# Chargement des variables d'environnement
ENV_FILE=".env.${ENVIRONMENT}"
if [ -f "$ENV_FILE" ]; then
    log "📄 Chargement des variables d'environnement depuis ${ENV_FILE}"
    export $(cat $ENV_FILE | xargs)
else
    warning "Fichier d'environnement ${ENV_FILE} non trouvé"
fi

# Tests de sécurité et qualité
log "🔒 Exécution des tests de sécurité..."
npm audit --audit-level high || error "Vulnérabilités de sécurité détectées"

log "🧹 Nettoyage du code..."
npm run clean:console || warning "Échec du nettoyage des console.log"

log "✅ Exécution des tests..."
npm run lint || error "Échec du linting"

# Build de l'application
log "🏗️ Build de l'application..."
npm run build || error "Échec du build"

# Build de l'image Docker
log "🐳 Build de l'image Docker..."
docker build -t $DOCKER_IMAGE . || error "Échec du build Docker"

# Arrêt du conteneur existant
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    log "🛑 Arrêt du conteneur existant..."
    docker stop $CONTAINER_NAME
fi

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    log "🗑️ Suppression du conteneur existant..."
    docker rm $CONTAINER_NAME
fi

# Déploiement
log "🚀 Déploiement du nouveau conteneur..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file $ENV_FILE \
  -v $(pwd)/public/uploads:/app/public/uploads \
  $DOCKER_IMAGE || error "Échec du déploiement"

# Vérification de la santé
log "🏥 Vérification de la santé de l'application..."
sleep 10

HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health || echo "000")
if [ "$HEALTH_CHECK" = "200" ]; then
    success "✅ Application déployée avec succès!"
else
    error "❌ L'application ne répond pas correctement (Code: $HEALTH_CHECK)"
fi

# Nettoyage des images Docker orphelines
log "🧹 Nettoyage des images Docker orphelines..."
docker image prune -f

success "🎉 Déploiement terminé avec succès!"
success "🌐 Application accessible sur: http://localhost:3000"

# Logs en temps réel (optionnel)
read -p "Voulez-vous voir les logs en temps réel? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker logs -f $CONTAINER_NAME
fi
