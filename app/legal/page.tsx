"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { ArrowLeft, Cookie, Settings, Eye, BarChart3, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/layout/LogoTitle';
import SocialLinks from '@/components/layout/SocialLinks';
import MenuButton from '@/components/layout/MenuButton';
import FooterMinimal from '@/components/sections/FooterMinimal';
import BackgroundPattern from '@/components/layout/BackgroundPattern';
import Cursor from '@/components/layout/Cursor';
import legalData from '@/lib/legal-data';

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

const CookiesPage = () => {
  const router = useRouter();
  const { cookies } = legalData;

  const cookieTypes = [
    {
      icon: Shield,
      title: "Cookies essentiels",
      description: "Nécessaires au fonctionnement du site",
      essential: true,
      cookies: cookies.essential
    },
    {
      icon: BarChart3,
      title: "Cookies analytiques",
      description: "Nous aident à comprendre comment vous utilisez notre site",
      essential: false,
      cookies: cookies.analytics
    },
    {
      icon: Settings,
      title: "Cookies de préférences",
      description: "Personnalisent votre expérience sur le site",
      essential: false,
      cookies: cookies.preferences
    }
  ];

  const sections = [
    {
      icon: Cookie,
      title: "Qu&apos;est-ce qu&apos;un cookie ?",
      content: [
        "Un cookie est un petit fichier texte stocké sur votre ordinateur, tablette ou smartphone lorsque vous visitez un site web.",
        "Les cookies permettent au site de mémoriser vos actions et préférences (comme votre langue, la taille de police, etc.) pendant un certain temps.",
        "Ils améliorent votre expérience de navigation en évitant de saisir ces informations à chaque visite."
      ]
    },
    {
      icon: Shield,
      title: "Comment nous utilisons les cookies",
      content: [
        "Solo Design utilise les cookies pour :",
        "• Assurer le bon fonctionnement de notre site web",
        "• Mémoriser vos préférences et paramètres",
        "• Analyser la façon dont notre site est utilisé",
        "• Améliorer nos services et votre expérience utilisateur",
        "• Respecter nos obligations légales"
      ]
    },
    {
      icon: Settings,
      title: "Gestion de vos préférences",
      content: [
        "Vous avez le contrôle total sur les cookies :",
        "• Vous pouvez accepter ou refuser les cookies non essentiels",
        "• Modifier vos préférences à tout moment",
        "• Supprimer les cookies existants via votre navigateur",
        "• Configurer votre navigateur pour bloquer certains cookies",
        "Note : Désactiver les cookies essentiels peut affecter le fonctionnement du site."
      ]
    },
    {
      icon: Eye,
      title: "Cookies tiers",
      content: [
        "Certains cookies proviennent de services tiers :",
        "• Google Analytics : pour analyser le trafic du site",
        "• Services de cartographie : pour afficher des cartes interactives",
        "• Réseaux sociaux : pour les boutons de partage",
        "Ces services ont leurs propres politiques de confidentialité que nous vous encourageons à consulter."
      ]
    },
    {
      icon: Shield,
      title: "Base légale",
      content: [
        "Notre utilisation des cookies repose sur :",
        "• Votre consentement (cookies non essentiels)",
        "• L&apos;intérêt légitime (cookies essentiels au fonctionnement)",
        "• L&apos;exécution d&apos;un contrat (cookies nécessaires aux services demandés)",
        "Vous pouvez retirer votre consentement à tout moment sans affecter la légalité du traitement basé sur le consentement avant son retrait."
      ]
    },
    {
      icon: Settings,
      title: "Configuration du navigateur",
      content: [
        "Vous pouvez configurer votre navigateur pour :",
        "• Accepter ou refuser automatiquement les cookies",
        "• Être averti avant qu&apos;un cookie soit stocké",
        "• Supprimer les cookies stockés",
        "• Bloquer les cookies tiers",
        "Consultez l&apos;aide de votre navigateur pour connaître la procédure spécifique."
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

        {/* Floating cookie-like elements */}
        <motion.div
          className="fixed top-24 right-16 w-8 h-8 bg-yellow-200 rounded-full opacity-30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed bottom-32 right-24 w-4 h-4 bg-orange-200 rounded-full opacity-40"
          animate={{ 
            x: [-10, 10, -10],
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="fixed top-40 left-12 w-6 h-6 bg-amber-200 rounded-full opacity-25"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
                    className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Cookie className="w-10 h-10 text-orange-600" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={fadeInVariants}
                  className="text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  Politique des
                  <span className="block mt-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Cookies
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
                  Cette politique explique comment nous utilisons les cookies sur notre site 
                  et comment vous pouvez contrôler leur utilisation.
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

          {/* Cookie Types Overview */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Types de cookies utilisés
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cookieTypes.map((type, index) => (
                <Parallax key={index} speed={index % 2 === 0 ? -1 : 1}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          type.essential 
                            ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                            : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <type.icon className={`w-6 h-6 ${
                          type.essential ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                        {type.essential && (
                          <span className="inline-flex items-center space-x-1 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Toujours actifs</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    <div className="space-y-3">
                      {type.cookies.map((cookie, cookieIndex) => (
                        <motion.div
                          key={cookieIndex}
                          className="bg-white border border-gray-100 rounded-lg p-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: cookieIndex * 0.05 }}
                        >
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Nom:</span>
                              <span className="text-gray-600 ml-1">{cookie.name}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Durée:</span>
                              <span className="text-gray-600 ml-1">{cookie.duration}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="font-semibold text-gray-700">Objectif:</span>
                              <span className="text-gray-600 ml-1">{cookie.purpose}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </Parallax>
              ))}
            </div>
          </div>

          {/* Detailed Information */}
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
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <section.icon className="w-6 h-6 text-orange-600" />
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

            {/* Cookie Preferences */}
            <Parallax speed={-2}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-16 p-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl text-white text-center"
              >
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Gérer vos préférences</h3>
                <p className="text-orange-100 mb-6">
                  Vous pouvez modifier vos préférences de cookies à tout moment. 
                  Votre consentement est important pour nous.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Gérer les cookies
                  </motion.button>
                  <motion.a
                    href="/contact"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Nous contacter
                  </motion.a>
                </div>
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

export default CookiesPage;
