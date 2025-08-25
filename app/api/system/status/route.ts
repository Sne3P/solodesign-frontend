import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * API de diagnostic du système de persistence
 * GET /api/system/status - Vérifier l'état des données et la persistence
 */
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    const projectsFile = path.join(dataDir, 'projects.json')
    const mediaFile = path.join(dataDir, 'media.json')

    const status = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      directories: {
        data: {
          exists: fs.existsSync(dataDir),
          path: dataDir,
          writable: false,
          size: 0,
          permissions: null as string | null
        },
        uploads: {
          exists: fs.existsSync(uploadsDir),
          path: uploadsDir,
          writable: false,
          size: 0,
          files: 0,
          permissions: null as string | null
        }
      },
      files: {
        projects: {
          exists: fs.existsSync(projectsFile),
          path: projectsFile,
          size: 0,
          readable: false,
          writable: false,
          content: null as any,
          backup_files: 0
        },
        media: {
          exists: fs.existsSync(mediaFile),
          path: mediaFile,
          size: 0,
          readable: false,
          writable: false,
          content: null as any,
          backup_files: 0
        }
      },
      persistence: {
        docker_volumes: process.env.NODE_ENV === 'production',
        write_test: false,
        backup_system: false
      },
      health: 'unknown' as 'healthy' | 'warning' | 'critical' | 'unknown'
    }

    // Test des dossiers
    for (const [key, dir] of Object.entries(status.directories)) {
      if (dir.exists) {
        try {
          const stats = fs.statSync(dir.path)
          dir.size = stats.size
          dir.permissions = (stats.mode & parseInt('777', 8)).toString(8)

          // Test d'écriture
          const testFile = path.join(dir.path, '.write-test')
          try {
            fs.writeFileSync(testFile, 'test')
            fs.unlinkSync(testFile)
            dir.writable = true
          } catch {
            dir.writable = false
          }

          // Compter les fichiers dans uploads
          if (key === 'uploads' && 'files' in dir) {
            try {
              const files = fs.readdirSync(dir.path)
              dir.files = files.length
            } catch {
              dir.files = 0
            }
          }
        } catch (error) {
          console.error(`Erreur analyse dossier ${key}:`, error)
        }
      }
    }

    // Test des fichiers JSON
    for (const [key, file] of Object.entries(status.files)) {
      if (file.exists) {
        try {
          const stats = fs.statSync(file.path)
          file.size = stats.size

          // Test de lecture
          try {
            const content = fs.readFileSync(file.path, 'utf-8')
            const parsed = JSON.parse(content)
            file.readable = true
            file.content = {
              valid_json: true,
              length: Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length,
              structure: Array.isArray(parsed) ? 'array' : 'object'
            }
          } catch {
            file.readable = false
            file.content = { valid_json: false }
          }

          // Test d'écriture
          try {
            const testContent = file.content?.valid_json ? 
              fs.readFileSync(file.path, 'utf-8') : '[]'
            fs.writeFileSync(file.path, testContent)
            file.writable = true
          } catch {
            file.writable = false
          }

          // Compter les backups
          try {
            const dir = path.dirname(file.path)
            const basename = path.basename(file.path)
            const files = fs.readdirSync(dir)
            file.backup_files = files.filter(f => 
              f.startsWith(`${basename}.backup.`) || 
              f.startsWith(`${basename}.tmp.`)
            ).length
          } catch {
            file.backup_files = 0
          }
        } catch (error) {
          console.error(`Erreur analyse fichier ${key}:`, error)
        }
      }
    }

    // Test de persistence avancé
    status.persistence.write_test = 
      status.directories.data.writable && 
      status.directories.uploads.writable
    
    status.persistence.backup_system = 
      status.files.projects.backup_files > 0 || 
      status.files.media.backup_files > 0

    // Déterminer l'état de santé
    let health: 'healthy' | 'warning' | 'critical' = 'healthy'
    const issues = []

    if (!status.directories.data.exists || !status.directories.data.writable) {
      health = 'critical'
      issues.push('Dossier data inaccessible ou non-writable')
    }
    
    if (!status.directories.uploads.exists || !status.directories.uploads.writable) {
      health = 'critical'
      issues.push('Dossier uploads inaccessible ou non-writable')
    }

    if (!status.files.projects.readable || !status.files.projects.writable) {
      health = health === 'critical' ? 'critical' : 'warning'
      issues.push('Fichier projects.json inaccessible')
    }

    if (!status.files.media.readable || !status.files.media.writable) {
      health = health === 'critical' ? 'critical' : 'warning'
      issues.push('Fichier media.json inaccessible')
    }

    if (!status.files.projects.content?.valid_json || !status.files.media.content?.valid_json) {
      health = health === 'critical' ? 'critical' : 'warning'
      issues.push('JSON corrompu détecté')
    }

    status.health = health

    return NextResponse.json({
      status,
      issues,
      recommendations: health !== 'healthy' ? [
        'Vérifier les permissions des dossiers',
        'Redémarrer le container si nécessaire',
        'Vérifier les volumes Docker',
        'Consulter les logs pour plus de détails'
      ] : []
    })

  } catch (error) {
    console.error('💥 Erreur diagnostic système:', error)
    return NextResponse.json({
      error: 'Erreur lors du diagnostic',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}
