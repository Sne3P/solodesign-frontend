"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import BackgroundPattern from '@/components/layout/BackgroundPattern';
import Cursor from '@/components/layout/Cursor';

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PrivacyPage = () => {
  const router = useRouter();

  const sections = [
    {
      icon: Shield,
      title: "1. Responsable du traitement",
      content: [
        "Solo Design, dont le siège social est situé à Paris, France, est responsable du traitement de vos données personnelles.",
        "Contact : hello@solodesign.fr - +33 06 60 94 98 79"
      ]
    },
    {
      icon: Database,
      title: "2. Données collectées",
      content: [
        "Nous collectons les données suivantes :",
        "• Données d&apos;identification : nom, prénom, adresse email",
        "• Données de navigation : adresse IP, cookies, pages visitées",
        "• Données de contact : messages envoyés via notre formulaire",
        "• Données techniques : type de navigateur, système d&apos;exploitation"
      ]
    },
    {
      icon: Lock,
      title: "3. Finalités du traitement",
      content: [
        "Vos données sont traitées pour les finalités suivantes :",
        "• Répondre à vos demandes de contact et devis",
        "• Améliorer notre site web et nos services",
        "• Respecter nos obligations légales",
        "• Analyser la fréquentation de notre site",
        "• Vous envoyer notre newsletter (avec votre consentement)"
      ]
    },
    {
      icon: UserCheck,
      title: "4. Base légale",
      content: [
        "Le traitement de vos données repose sur :",
        "• Votre consentement (newsletter, cookies non essentiels)",
        "• L&apos;exécution d&apos;un contrat ou de mesures précontractuelles",
        "• L&apos;intérêt légitime (amélioration de nos services)",
        "• Le respect d&apos;une obligation légale"
      ]
    },
    {
      icon: Database,
      title: "5. Destinataires des données",
      content: [
        "Vos données peuvent être transmises à :",
        "• Nos prestataires techniques (hébergement, analytics)",
        "• Nos sous-traitants (développement, maintenance)",
        "• Les autorités compétentes sur demande légale",
        "Tous nos partenaires sont soumis à des obligations strictes de confidentialité."
      ]
    },
    {
      icon: Lock,
      title: "6. Durée de conservation",
      content: [
        "Nous conservons vos données pendant :",
        "• Données de contact : 3 ans après le dernier contact",
        "• Données de navigation : 13 mois maximum",
        "• Newsletter : jusqu&apos;à votre désinscription",
        "• Obligations légales : selon les délais légaux applicables"
      ]
    },
    {
      icon: Shield,
      title: "7. Sécurité des données",
      content: [
        "Nous mettons en œuvre des mesures de sécurité appropriées :",
        "• Chiffrement des données sensibles",
        "• Accès restreint aux données personnelles",
        "• Surveillance et détection des intrusions",
        "• Sauvegardes régulières et sécurisées",
        "• Formation de nos équipes à la protection des données"
      ]
    },
    {
      icon: Eye,
      title: "8. Vos droits",
      content: [
        "Conformément au RGPD, vous disposez des droits suivants :",
        "• Droit d&apos;accès à vos données personnelles",
        "• Droit de rectification des données inexactes",
        "• Droit d&apos;effacement (&apos;droit à l&apos;oubli&apos;)",
        "• Droit à la limitation du traitement",
        "• Droit d&apos;opposition au traitement",
        "• Droit à la portabilité de vos données",
        "• Droit de retirer votre consentement à tout moment"
      ]
    },
    {
      icon: UserCheck,
      title: "9. Exercice de vos droits",
      content: [
        "Pour exercer vos droits, contactez-nous :",
        "• Email : hello@solodesign.fr",
        "• Courrier : Solo Design - Paris, France",
        "Nous vous répondrons dans un délai d&apos;un mois.",
        "Vous pouvez également introduire une réclamation auprès de la CNIL."
      ]
    },
    {
      icon: Database,
      title: "10. Cookies",
      content: [
        "Notre site utilise des cookies pour :",
        "• Assurer le bon fonctionnement du site (cookies essentiels)",
        "• Analyser l&apos;audience (avec votre consentement)",
        "• Personnaliser votre expérience",
        "Vous pouvez gérer vos préférences cookies à tout moment."
      ]
    },
    {
      icon: Shield,
      title: "11. Transferts internationaux",
      content: [
        "Si vos données sont transférées hors UE, nous nous assurons :",
        "• D&apos;un niveau de protection adéquat",
        "• De la mise en place de garanties appropriées",
        "• Du respect des décisions d&apos;adéquation de la Commission européenne"
      ]
    },
    {
      icon: Lock,
      title: "12. Modifications",
      content: [
        "Cette politique peut être modifiée pour :",
        "• S&apos;adapter aux évolutions légales",
        "• Refléter les changements de nos pratiques",
        "• Améliorer la transparence",
        "Toute modification sera publiée sur cette page avec une nouvelle date."
      ]
    }
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white text-black relative overflow-hidden">
        <BackgroundPattern />
        <LogoTitle />
        <SocialLinks />
        <MenuButton />

        {/* Floating elements */}
        <motion.div
          className="fixed top-32 right-20 w-3 h-3 bg-blue-200 rounded-full opacity-40"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed bottom-40 left-10 w-6 h-6 border border-gray-300 opacity-20"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <main className="pt-32 pb-16 relative z-10">
          {/* Header */}
          <Parallax speed={-5}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.div
                  variants={fadeInVariants}
                  className="flex justify-center mb-8"
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="w-10 h-10 text-blue-600" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={fadeInVariants}
                  className="text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  Politique de
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Confidentialité
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInVariants}
                  className="text-sm text-gray-500 flex items-center justify-center space-x-2"
                >
                  <span>Dernière mise à jour : 05 août 2025</span>
                </motion.p>

                <motion.p
                  variants={fadeInVariants}
                  className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                  Nous nous engageons à protéger votre vie privée et vos données personnelles. 
                  Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
                </motion.p>
              </motion.div>
            </div>
          </Parallax>

          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="fixed top-24 left-8 z-50 bg-white border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {sections.map((section, index) => (
                <Parallax key={index} speed={index % 2 === 0 ? -1 : 1}>
                  <motion.div
                    variants={fadeInVariants}
                    className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <section.icon className="w-6 h-6 text-blue-600" />
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h2>
                        <div className="space-y-3">
                          {section.content.map((paragraph, pIndex) => (
                            <motion.p
                              key={pIndex}
                              className="text-gray-600 leading-relaxed"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: pIndex * 0.05 }}
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Parallax>
              ))}
            </motion.div>

            {/* Contact Section */}
            <Parallax speed={-2}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center"
              >
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Protection garantie</h3>
                <p className="text-blue-100 mb-6">
                  Vos données sont protégées selon les plus hauts standards de sécurité. 
                  Pour toute question, notre équipe est à votre disposition.
                </p>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Nous contacter</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </motion.a>
              </motion.div>
            </Parallax>
          </div>
        </main>

        <FooterMinimal />
        <Cursor />
      </div>
    </ParallaxProvider>
  );
};

export default PrivacyPage;
