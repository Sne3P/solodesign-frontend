"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ArrowLeft, Cookie, Eye, BarChart3, Shield, CheckCircle } from 'lucide-react';
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
      icon: Eye,
      title: "Cookies marketing",
      description: "Utilisés pour personnaliser votre expérience",
      essential: false,
      cookies: cookies.marketing
    }
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        <Cursor />
        <BackgroundPattern />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.header 
            className="fixed top-0 left-0 right-0 z-50 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <LogoTitle />
              <div className="flex items-center gap-6">
                <SocialLinks />
                <MenuButton />
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="pt-24 pb-20">
            <div className="container mx-auto px-6">
              {/* Hero Section */}
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  className="flex items-center justify-center gap-4 mb-6"
                  variants={fadeInVariants}
                >
                  <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    Retour
                  </button>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-4 mb-6"
                  variants={fadeInVariants}
                >
                  <Cookie className="w-12 h-12 text-primary" />
                  <h1 className="text-4xl md:text-6xl font-bold">
                    Gestion des Cookies
                  </h1>
                </motion.div>

                <motion.p
                  className="text-xl text-muted-foreground max-w-3xl mx-auto"
                  variants={fadeInVariants}
                >
                  Nous utilisons des cookies pour améliorer votre expérience et analyser l&apos;utilisation de notre site.
                  Vous pouvez gérer vos préférences ci-dessous.
                </motion.p>
              </motion.div>

              {/* Cookie Categories */}
              <motion.div
                className="grid gap-8 max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {cookieTypes.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 shadow-lg"
                    variants={fadeInVariants}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl ${category.essential ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                        <category.icon className={`w-8 h-8 ${category.essential ? 'text-green-500' : 'text-primary'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                            <p className="text-muted-foreground">{category.description}</p>
                          </div>
                          
                          {category.essential ? (
                            <div className="flex items-center gap-2 text-green-500">
                              <CheckCircle size={20} />
                              <span className="text-sm font-medium">Toujours actif</span>
                            </div>
                          ) : (
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                              <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                            </button>
                          )}
                        </div>

                        {/* Cookie Details */}
                        <div className="space-y-4">
                          {category.cookies.map((cookie, cookieIndex) => (
                            <div
                              key={cookieIndex}
                              className="border border-border rounded-lg p-4 bg-background/50"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Nom</h4>
                                  <p className="font-mono text-sm">{cookie.name}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Finalité</h4>
                                  <p className="text-sm">{cookie.purpose}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Durée</h4>
                                  <p className="text-sm">{cookie.duration}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Type</h4>
                                  <p className="text-sm">{cookie.type}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Cookie Management */}
              <motion.div
                className="max-w-4xl mx-auto mt-16 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-4">Gestion des préférences</h2>
                  <p className="text-muted-foreground mb-6">
                    Vous pouvez modifier vos préférences à tout moment. Les cookies essentiels sont nécessaires 
                    au fonctionnement du site et ne peuvent pas être désactivés.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Accepter tous les cookies
                    </button>
                    <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
                      Cookies essentiels seulement
                    </button>
                    <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors">
                      Personnaliser
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Legal Info */}
              <motion.div
                className="max-w-4xl mx-auto mt-12 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Pour plus d&apos;informations sur notre utilisation des cookies, consultez notre{' '}
                    <a href="/privacy" className="text-primary hover:underline">politique de confidentialité</a>.
                  </p>
                  <p>
                    Des questions ? Contactez-nous à{' '}
                    <a href="mailto:contact@solodesign.fr" className="text-primary hover:underline">
                      contact@solodesign.fr
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </main>

          {/* Footer */}
          <FooterMinimal />
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default CookiesPage;
