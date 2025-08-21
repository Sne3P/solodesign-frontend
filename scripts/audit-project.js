#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const WORKSPACE_ROOT = process.cwd()

console.log('🧹 AUDIT ET NETTOYAGE DU PROJET\n')

// 1. Analyser les imports et exports
function analyzeCodeUsage() {
  console.log('📊 Analyse de l'utilisation du code...')
  
  const unusedFiles = []
  const componentDir = path.join(WORKSPACE_ROOT, 'components')
  const hookDir = path.join(WORKSPACE_ROOT, 'hooks')
  const libDir = path.join(WORKSPACE_ROOT, 'lib')
  
  // Analyser les composants test
  const testDir = path.join(componentDir, 'test')
  if (fs.existsSync(testDir)) {
    const testFiles = fs.readdirSync(testDir)
    console.log(`⚠️  Dossier test trouvé avec ${testFiles.length} fichiers`)
    
    // Vérifier si utilisés
    try {
      const grepResult = execSync(`grep -r "components/test" ${WORKSPACE_ROOT} --exclude-dir=node_modules --exclude-dir=.next`).toString()
      if (!grepResult.trim()) {
        unusedFiles.push('components/test/*')
      }
    } catch (e) {
      unusedFiles.push('components/test/* (non utilisé)')
    }
  }
  
  return unusedFiles
}

// 2. Vérifier les hooks personnalisés
function verifyHooks() {
  console.log('🪝 Vérification des hooks...')
  
  const hooksToCheck = [
    'use-toast.ts',
    'useMedia.ts', 
    'useProjects.ts',
    'usePerformance.ts'
  ]
  
  const hookUsage = {}
  
  hooksToCheck.forEach(hook => {
    const hookPath = path.join(WORKSPACE_ROOT, 'hooks', hook)
    if (fs.existsSync(hookPath)) {
      try {
        const hookName = hook.replace('.ts', '')
        const grepResult = execSync(`grep -r "${hookName}" ${WORKSPACE_ROOT} --exclude-dir=node_modules --exclude-dir=.next --exclude="*/${hook}"`).toString()
        hookUsage[hook] = grepResult.split('\n').filter(line => line.trim()).length
      } catch (e) {
        hookUsage[hook] = 0
      }
    }
  })
  
  return hookUsage
}

// 3. Vérifier les scripts package.json
function verifyPackageScripts() {
  console.log('📦 Vérification des scripts package.json...')
  
  const packagePath = path.join(WORKSPACE_ROOT, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  
  const scripts = packageJson.scripts
  const scriptFiles = {
    'seo:validate': 'scripts/seo-validation.js',
    'clean:console': 'scripts/clean-console-logs.js'
  }
  
  const missingScripts = []
  
  Object.entries(scriptFiles).forEach(([scriptName, filePath]) => {
    const fullPath = path.join(WORKSPACE_ROOT, filePath)
    if (!fs.existsSync(fullPath)) {
      missingScripts.push({ script: scriptName, file: filePath })
    }
  })
  
  return missingScripts
}

// 4. Optimiser les imports
function analyzeImports() {
  console.log('📥 Analyse des imports...')
  
  // Imports potentiellement inutiles
  const suspiciousImports = [
    'react-scroll-parallax', // Supprimé mais peut-être encore importé
    'jest', // Plus utilisé
    '@testing-library' // Plus utilisé
  ]
  
  const foundImports = []
  
  suspiciousImports.forEach(importName => {
    try {
      const grepResult = execSync(`grep -r "from '${importName}'" ${WORKSPACE_ROOT} --exclude-dir=node_modules --exclude-dir=.next`).toString()
      if (grepResult.trim()) {
        foundImports.push({ import: importName, locations: grepResult.split('\n').filter(l => l.trim()) })
      }
    } catch (e) {
      // Import non trouvé, c'est bien
    }
  })
  
  return foundImports
}

// 5. Vérifier les images et favicons
function verifyAssets() {
  console.log('🖼️  Vérification des assets...')
  
  const publicDir = path.join(WORKSPACE_ROOT, 'public')
  const requiredFiles = [
    'favicon.ico',
    'favicon-16x16.png', 
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'site.webmanifest',
    'robots.txt',
    'sitemap-static.xml'
  ]
  
  const missingAssets = []
  const existingAssets = []
  
  requiredFiles.forEach(file => {
    const filePath = path.join(publicDir, file)
    if (fs.existsSync(filePath)) {
      existingAssets.push(file)
    } else {
      missingAssets.push(file)
    }
  })
  
  return { existing: existingAssets, missing: missingAssets }
}

// Exécuter l'audit
async function runAudit() {
  const results = {
    unusedFiles: analyzeCodeUsage(),
    hookUsage: verifyHooks(),
    missingScripts: verifyPackageScripts(),
    suspiciousImports: analyzeImports(),
    assets: verifyAssets()
  }
  
  // Afficher les résultats
  console.log('\n📋 RÉSULTATS DE L\'AUDIT\n')
  
  console.log('🗑️  Fichiers potentiellement inutiles:')
  if (results.unusedFiles.length === 0) {
    console.log('   ✅ Aucun fichier inutile détecté')
  } else {
    results.unusedFiles.forEach(file => console.log(`   ❌ ${file}`))
  }
  
  console.log('\n🪝 Utilisation des hooks:')
  Object.entries(results.hookUsage).forEach(([hook, usage]) => {
    const status = usage > 0 ? '✅' : '❌'
    console.log(`   ${status} ${hook}: ${usage} utilisations`)
  })
  
  console.log('\n📦 Scripts manquants:')
  if (results.missingScripts.length === 0) {
    console.log('   ✅ Tous les scripts référencés existent')
  } else {
    results.missingScripts.forEach(({ script, file }) => {
      console.log(`   ❌ ${script} → ${file}`)
    })
  }
  
  console.log('\n📥 Imports suspects:')
  if (results.suspiciousImports.length === 0) {
    console.log('   ✅ Aucun import suspect détecté')
  } else {
    results.suspiciousImports.forEach(({ import: imp, locations }) => {
      console.log(`   ❌ ${imp}:`)
      locations.forEach(loc => console.log(`      ${loc}`))
    })
  }
  
  console.log('\n🖼️  Assets:')
  console.log(`   ✅ ${results.assets.existing.length} fichiers présents`)
  if (results.assets.missing.length > 0) {
    console.log(`   ❌ ${results.assets.missing.length} fichiers manquants:`)
    results.assets.missing.forEach(file => console.log(`      ${file}`))
  }
  
  console.log('\n🎯 RECOMMANDATIONS:\n')
  
  if (results.unusedFiles.length > 0) {
    console.log('1. Supprimer les fichiers inutiles ou les intégrer')
  }
  
  if (results.hookUsage['usePerformance.ts'] === 0) {
    console.log('2. Intégrer le hook usePerformance dans le layout')
  }
  
  if (results.missingScripts.length > 0) {
    console.log('3. Créer les scripts manquants')
  }
  
  if (results.suspiciousImports.length > 0) {
    console.log('4. Nettoyer les imports inutiles')
  }
  
  if (results.assets.missing.length > 0) {
    console.log('5. Ajouter les assets manquants')
  }
  
  console.log('\n✨ Audit terminé!')
}

runAudit().catch(console.error)
