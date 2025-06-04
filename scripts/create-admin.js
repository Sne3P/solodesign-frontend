const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function createAdmin() {
  const email = 'balourob@gmail.com'
  const fullName = 'Admin SoloDesign'

  try {
    console.log('🚀 Création de l\'utilisateur admin...')
    
    // 1. Vérifier si l'utilisateur existe déjà
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers.users.find(user => user.email === email)
    
    if (existingUser) {
      console.log('⚠️  Utilisateur déjà existant:', existingUser.id)
      
      // Vérifier si le profil existe
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('user_id', existingUser.id)
        .single()
      
      if (existingProfile) {
        console.log('✅ Profil déjà existant:', existingProfile)
        return
      } else {
        console.log('📝 Création du profil manquant...')
        // Créer le profil manquant
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            user_id: existingUser.id,
            full_name: fullName,
            role: 'admin'
          })
        
        if (profileError) {
          console.error('❌ Erreur création profil:', profileError)
          return
        }
        
        console.log('✅ Profil admin créé avec succès')
        return
      }
    }

    // 2. Créer l'utilisateur avec des métadonnées
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: 'admin'
      }
    })

    if (userError) {
      console.error('❌ Erreur création utilisateur:', userError.message)
      return
    }

    console.log('✅ Utilisateur créé:', {
      id: userData.user.id,
      email: userData.user.email
    })

    // 3. Attendre un peu pour que le trigger se déclenche
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 4. Vérifier si le profil a été créé automatiquement par le trigger
    const { data: autoProfile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', userData.user.id)
      .single()

    if (autoProfile) {
      console.log('✅ Profil créé automatiquement par le trigger:', autoProfile)
      
      // Mettre à jour le rôle si nécessaire
      if (autoProfile.role !== 'admin') {
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ role: 'admin', full_name: fullName })
          .eq('user_id', userData.user.id)
        
        if (updateError) {
          console.error('❌ Erreur mise à jour rôle:', updateError)
        } else {
          console.log('✅ Rôle mis à jour vers admin')
        }
      }
    } else {
      console.log('📝 Création manuelle du profil...')
      
      // 5. Créer le profil manuellement si le trigger n'a pas fonctionné
      const { data: newProfile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          user_id: userData.user.id,
          full_name: fullName,
          role: 'admin'
        })
        .select()
        .single()

      if (profileError) {
        console.error('❌ Erreur création profil:', profileError.message)
        
        // Afficher plus de détails sur l'erreur
        console.error('Détails:', {
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint
        })
        return
      }

      console.log('✅ Profil admin créé manuellement:', newProfile)
    }

    // 6. Vérification finale
    const { data: finalProfile, error: checkError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', userData.user.id)
      .single()

    if (checkError) {
      console.error('❌ Erreur vérification finale:', checkError.message)
    } else {
      console.log('🎉 Création terminée avec succès!')
      console.log('📋 Résumé:')
      console.log(`   Email: ${email}`)
      console.log(`   Nom: ${finalProfile.full_name}`)
      console.log(`   Rôle: ${finalProfile.role}`)
      console.log(`   ID utilisateur: ${userData.user.id}`)
      console.log(`   ID profil: ${finalProfile.id}`)
      console.log('')
      console.log('🔗 Utilisez le magic link pour vous connecter!')
    }

  } catch (error) {
    console.error('💥 Erreur inattendue:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Exécuter le script
createAdmin().then(() => {
  console.log('Script terminé')
  process.exit(0)
}).catch(error => {
  console.error('Erreur fatale:', error)
  process.exit(1)
})