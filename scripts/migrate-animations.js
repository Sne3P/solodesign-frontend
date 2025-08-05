#!/usr/bin/env node

/**
 * Script de migration pour remplacer les anciennes animations
 * par le nouveau système optimisé
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mappings des anciens noms vers les nouveaux
const animationMigrations = {
  // Transitions
  'transitions.ultraFast': 'transitions.instant',
  'transitions.standard': 'transitions.normal',
  'transitions.easeOut': 'transitions.ease',
  'transitions.easeInOut': 'transitions.ease',
  
  // Variants
  'fadeInVariants': 'animations.fadeIn',
  'fadeInUp': 'animations.slideUp',
  'fadeInDown': 'slideDown', // À créer si nécessaire
  'slideInFromLeftVariants': 'animations.slideLeft',
  'slideInFromRightVariants': 'animations.slideRight',
  'slideUpVariants': 'animations.slideUp',
  'scaleInVariants': 'animations.scaleIn',
  'buttonVariants': 'animations.hoverScale',
  'cardVariants': 'animations.scaleIn',
  'containerVariants': 'animations.stagger',
  'staggeredContainer': 'animations.stagger',
  'iconVariants': 'animations.hoverScale',
  
  // Scale animations
  'scaleAnimations.subtle': 'animations.hoverScale',
  'scaleAnimations.moderate': 'animations.hoverScale',
  'scaleAnimations.strong': 'animations.hoverLift',
  'scaleAnimations.dynamic': 'animations.hoverLift',
};

// Imports à remplacer
const importMigrations = [
  {
    old: /import\s*{[^}]*fadeInVariants[^}]*}\s*from\s*['"][^'"]*animations['"];?/g,
    new: "import { animations } from '@/lib/animations';"
  },
  {
    old: /import\s*{[^}]*slideInFromLeftVariants[^}]*}\s*from\s*['"][^'"]*animations['"];?/g,
    new: "import { animations } from '@/lib/animations';"
  },
  {
    old: /import\s*{[^}]*buttonVariants[^}]*}\s*from\s*['"][^'"]*animations['"];?/g,
    new: "import { animations } from '@/lib/animations';"
  },
  {
    old: /import\s*{[^}]*transitions[^}]*}\s*from\s*['"][^'"]*animations['"];?/g,
    new: "import { animations, transitions } from '@/lib/animations';"
  }
];

function migrateFile(filePath) {
  console.log(`🔄 Migration de ${path.relative(process.cwd(), filePath)}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Migrer les imports
  importMigrations.forEach(migration => {
    if (migration.old.test(content)) {
      content = content.replace(migration.old, migration.new);
      hasChanges = true;
    }
  });
  
  // Migrer les usages d'animations
  Object.entries(animationMigrations).forEach(([old, newValue]) => {
    const regex = new RegExp(`\\b${old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newValue);
      hasChanges = true;
    }
  });
  
  // Nettoyer les imports dupliqués
  const duplicateImportRegex = /(import\s*{[^}]*}\s*from\s*['"]@\/lib\/animations['"];?\s*){2,}/g;
  if (duplicateImportRegex.test(content)) {
    content = content.replace(duplicateImportRegex, "import { animations, transitions } from '@/lib/animations';\n");
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${path.relative(process.cwd(), filePath)} migré`);
    return true;
  } else {
    console.log(`⏭️  ${path.relative(process.cwd(), filePath)} - pas de changement`);
    return false;
  }
}

function main() {
  console.log('🚀 Migration des animations vers le nouveau système...\n');
  
  const patterns = [
    'components/**/*.tsx',
    'components/**/*.ts',
    'app/**/*.tsx',
    'app/**/*.ts',
    '!node_modules/**/*',
    '!.next/**/*'
  ];
  
  let totalFiles = 0;
  let migratedFiles = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { 
      ignore: ['node_modules/**', '.next/**'],
      absolute: true 
    });
    
    files.forEach(file => {
      totalFiles++;
      if (migrateFile(file)) {
        migratedFiles++;
      }
    });
  });
  
  console.log(`\n✨ Migration terminée!`);
  console.log(`📊 ${migratedFiles}/${totalFiles} fichiers modifiés`);
  
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Tester l\'application: npm run dev');
  console.log('2. Vérifier que toutes les animations fonctionnent');
  console.log('3. Optimiser les CSS custom si nécessaire');
  console.log('4. Supprimer styles/projects-section.css si plus utilisé');
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, animationMigrations };
