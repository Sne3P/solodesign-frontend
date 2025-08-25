#!/bin/bash

# Script de sauvegarde des données avant déploiement
# À exécuter pour sauvegarder les données avant mise à jour

BACKUP_DIR="./backups/backup_$(date +%Y%m%d_%H%M%S)"

echo "💾 Sauvegarde des données SoloDesign..."
echo "📁 Dossier de sauvegarde: $BACKUP_DIR"

# Créer le dossier de sauvegarde
mkdir -p "$BACKUP_DIR"

# Sauvegarder les uploads (images, vidéos)
if [ -d "./data/uploads" ]; then
    echo "📸 Sauvegarde des uploads..."
    cp -r ./data/uploads "$BACKUP_DIR/"
    echo "✅ Uploads sauvegardés"
fi

# Sauvegarder les données JSON
if [ -f "./data/projects.json" ]; then
    echo "📄 Sauvegarde des projets..."
    cp ./data/projects.json "$BACKUP_DIR/"
    echo "✅ Projets sauvegardés"
fi

if [ -f "./data/media.json" ]; then
    echo "📄 Sauvegarde des médias..."
    cp ./data/media.json "$BACKUP_DIR/"
    echo "✅ Médias sauvegardés"
fi

# Sauvegarder les logs récents
if [ -d "./logs" ]; then
    echo "📋 Sauvegarde des logs..."
    cp -r ./logs "$BACKUP_DIR/"
    echo "✅ Logs sauvegardés"
fi

# Créer un résumé
echo "
# Sauvegarde SoloDesign
Date: $(date)
Dossier: $BACKUP_DIR

## Contenu sauvegardé:
- Uploads: $(find $BACKUP_DIR/uploads -type f 2>/dev/null | wc -l) fichiers
- Projets: $([ -f $BACKUP_DIR/projects.json ] && echo "✅" || echo "❌")
- Médias: $([ -f $BACKUP_DIR/media.json ] && echo "✅" || echo "❌")
- Logs: $([ -d $BACKUP_DIR/logs ] && echo "✅" || echo "❌")

## Restauration:
Pour restaurer cette sauvegarde:
1. Arrêter le conteneur: docker compose down
2. Copier les fichiers: cp -r $BACKUP_DIR/uploads ./data/
3. Copier les JSON: cp $BACKUP_DIR/*.json ./data/
4. Redémarrer: docker compose up -d
" > "$BACKUP_DIR/README.md"

echo ""
echo "✅ Sauvegarde terminée!"
echo "📁 Emplacement: $BACKUP_DIR"
echo "📄 Voir le détail: cat $BACKUP_DIR/README.md"
echo ""
echo "🚀 Vous pouvez maintenant lancer le déploiement en toute sécurité:"
echo "   ./deploy.sh production --pull"
