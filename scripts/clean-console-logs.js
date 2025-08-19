/**
 * Script de nettoyage pour supprimer tous les console.log de production
 * À exécuter avant le build de production
 */

const fs = require('fs');
const path = require('path');

const directories = [
  './app',
  './components', 
  './lib',
  './hooks'
];

function removeConsoleLogs(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Supprime les console.log mais garde console.error et console.warn
    const consoleLogPattern = /^\s*console\.log\(.*\);?\s*$/gm;
    const debugPattern = /^\s*\/\/\s*Debug.*$/gm;
    
    if (consoleLogPattern.test(content)) {
      content = content.replace(consoleLogPattern, '');
      modified = true;
    }

    if (debugPattern.test(content)) {
      content = content.replace(debugPattern, '');
      modified = true;
    }

    // Nettoie les lignes vides multiples
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Nettoyé: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du nettoyage de ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      removeConsoleLogs(fullPath);
    }
  }
}

console.log('🧹 Début du nettoyage des console.log...');

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`📁 Traitement du dossier: ${dir}`);
    processDirectory(dir);
  }
});

console.log('✨ Nettoyage terminé !');
