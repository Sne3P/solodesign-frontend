# Script PowerShell pour déploiement Windows
# Usage: .\deploy.ps1 [environment]

param(
    [string]$Environment = "production"
)

# Couleurs pour les logs
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

function Write-Log {
    param([string]$Message, [string]$Color = "White")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] $Message" -ForegroundColor $Color
}

function Write-Error-Exit {
    param([string]$Message)
    Write-Log "[ERROR] $Message" $Red
    exit 1
}

function Write-Success {
    param([string]$Message)
    Write-Log "[SUCCESS] $Message" $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Log "[WARNING] $Message" $Yellow
}

Write-Log "🚀 Début du déploiement pour l'environnement: $Environment" $Blue

# Vérification des prérequis
Write-Log "🔍 Vérification des prérequis..." $Blue

if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error-Exit "Docker n'est pas installé"
}

if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error-Exit "npm n'est pas installé"
}

# Variables
$ProjectName = "solodesign"
$DockerImage = "${ProjectName}:$Environment"
$ContainerName = "${ProjectName}-$Environment"

# Chargement des variables d'environnement
$EnvFile = ".env.$Environment"
if (Test-Path $EnvFile) {
    Write-Log "📄 Chargement des variables d'environnement depuis $EnvFile" $Blue
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
} else {
    Write-Warning "Fichier d'environnement $EnvFile non trouvé"
}

# Tests de sécurité
Write-Log "🔒 Exécution des tests de sécurité..." $Blue
$auditResult = npm audit --audit-level high
if ($LASTEXITCODE -ne 0) {
    Write-Error-Exit "Vulnérabilités de sécurité détectées"
}

# Nettoyage du code
Write-Log "🧹 Nettoyage du code..." $Blue
npm run clean:console
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Échec du nettoyage des console.log"
}

# Linting
Write-Log "✅ Exécution des tests..." $Blue
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Error-Exit "Échec du linting"
}

# Build
Write-Log "🏗️ Build de l'application..." $Blue
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error-Exit "Échec du build"
}

# Build Docker
Write-Log "🐳 Build de l'image Docker..." $Blue
docker build -t $DockerImage .
if ($LASTEXITCODE -ne 0) {
    Write-Error-Exit "Échec du build Docker"
}

# Arrêt du conteneur existant
$runningContainer = docker ps -q -f name=$ContainerName
if ($runningContainer) {
    Write-Log "🛑 Arrêt du conteneur existant..." $Blue
    docker stop $ContainerName
}

$existingContainer = docker ps -aq -f name=$ContainerName
if ($existingContainer) {
    Write-Log "🗑️ Suppression du conteneur existant..." $Blue
    docker rm $ContainerName
}

# Déploiement
Write-Log "🚀 Déploiement du nouveau conteneur..." $Blue
$uploadsPath = "$(Get-Location)\public\uploads"
docker run -d --name $ContainerName --restart unless-stopped -p 3000:3000 --env-file $EnvFile -v "${uploadsPath}:/app/public/uploads" $DockerImage
if ($LASTEXITCODE -ne 0) {
    Write-Error-Exit "Échec du déploiement"
}

# Vérification de la santé
Write-Log "🏥 Vérification de la santé de l'application..." $Blue
Start-Sleep -Seconds 10

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Success "✅ Application déployée avec succès!"
    } else {
        Write-Error-Exit "❌ L'application ne répond pas correctement (Code: $($response.StatusCode))"
    }
} catch {
    Write-Error-Exit "❌ Impossible de vérifier la santé de l'application"
}

# Nettoyage
Write-Log "🧹 Nettoyage des images Docker orphelines..." $Blue
docker image prune -f | Out-Null

Write-Success "🎉 Déploiement terminé avec succès!"
Write-Success "🌐 Application accessible sur: http://localhost:3000"

# Logs optionnels
$showLogs = Read-Host "Voulez-vous voir les logs en temps réel? (y/n)"
if ($showLogs -eq "y" -or $showLogs -eq "Y") {
    docker logs -f $ContainerName
}
