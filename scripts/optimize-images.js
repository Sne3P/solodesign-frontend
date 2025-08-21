import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

async function optimizeImages() {
  const inputDir = path.join(process.cwd(), 'public')
  const outputDir = path.join(process.cwd(), 'public', 'optimized')
  
  // Créer le dossier de sortie
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Configuration des formats et tailles
  const formats = [
    { ext: '.webp', format: 'webp', quality: 85 },
    { ext: '.avif', format: 'avif', quality: 80 }
  ]
  
  const sizes = [
    { width: 400, suffix: '-sm' },
    { width: 800, suffix: '-md' },
    { width: 1200, suffix: '-lg' },
    { width: 1920, suffix: '-xl' }
  ]

  // Optimiser le logo
  if (fs.existsSync(path.join(inputDir, 'logo_white_png.png'))) {
    console.log('🖼️ Optimisation du logo...')
    
    for (const format of formats) {
      await sharp(path.join(inputDir, 'logo_white_png.png'))
        .resize(400, null, { withoutEnlargement: true })
        .toFormat(format.format, { quality: format.quality })
        .toFile(path.join(outputDir, `logo${format.ext}`))
    }
  }

  // Optimiser les images de projets (placeholders)
  console.log('🖼️ Génération des placeholders de projets...')
  
  for (let i = 1; i <= 6; i++) {
    for (const size of sizes) {
      for (const format of formats) {
        // Générer des placeholders colorés
        const colors = [
          { r: 59, g: 130, b: 246 },  // bleu
          { r: 16, g: 185, b: 129 },  // vert
          { r: 245, g: 101, b: 101 }, // rouge
          { r: 251, g: 191, b: 36 },  // jaune
          { r: 139, g: 92, b: 246 },  // violet
          { r: 236, g: 72, b: 153 }   // rose
        ]
        
        const color = colors[(i - 1) % colors.length]
        
        await sharp({
          create: {
            width: size.width,
            height: Math.round(size.width * 0.6), // Ratio 16:10
            channels: 3,
            background: color
          }
        })
        .png()
        .toFormat(format.format, { quality: format.quality })
        .toFile(path.join(outputDir, `project-${i}${size.suffix}${format.ext}`))
      }
    }
  }

  console.log('✅ Optimisation des images terminée!')
}

optimizeImages().catch(console.error)
