"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { ArrowLeft, Shield, FileText, Calendar, Scale } from 'lucide-react';
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

const TermsPage = () => {
  const router = useRouter();

  const sections = [
    {
      icon: FileText,
      title: "1. Objet",
      content: [
        "Les présentes conditions générales d'utilisation (ci-après « CGU ») régissent l'utilisation du site web Solo Design accessible à l'adresse [URL du site] (ci-après le « Site »).",
        "L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site."
      ]
    },
    {
      icon: Shield,
      title: "2. Mentions légales",
      content: [
        "Éditeur du site : Solo Design",
        "Forme juridique : [À compléter]",
        "Adresse : Paris, France",
        "Email : contact@solodesign.fr",
        "Téléphone : +33 06 60 94 98 79",
        "Numéro SIRET : [À compléter]",
        "Directeur de la publication : [À compléter]",
        "Hébergeur : [À compléter selon l'hébergeur utilisé]"
      ]
    },
    {
      icon: Scale,
      title: "3. Accès et utilisation du site",
      content: [
        "Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.",
        "Solo Design se réserve le droit de modifier, suspendre ou interrompre temporairement ou définitivement tout ou partie du Site sans préavis.",
        "L'utilisateur s'engage à utiliser le Site de manière conforme à sa destination et à ne pas porter atteinte aux droits de tiers ou à l'ordre public."
      ]
    },
    {
      icon: FileText,
      title: "4. Propriété intellectuelle",
      content: [
        "L'ensemble des éléments du Site (textes, images, vidéos, logos, etc.) sont protégés par le droit de la propriété intellectuelle et appartiennent à Solo Design ou à ses partenaires.",
        "Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Solo Design.",
        "La violation de ces dispositions peut entraîner des poursuites judiciaires."
      ]
    },
    {
      icon: Shield,
      title: "5. Données personnelles",
      content: [
        "Les données personnelles collectées sur le Site font l'objet d'un traitement informatique conforme au Règlement Général sur la Protection des Données (RGPD).",
        "Pour plus d'informations sur la collecte et le traitement de vos données personnelles, consultez notre Politique de confidentialité.",
        "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité de vos données personnelles."
      ]
    },
    {
      icon: Scale,
      title: "6. Responsabilité",
      content: [
        "Solo Design s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité de ces informations.",
        "Solo Design ne saurait être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au Site.",
        "L'utilisateur est seul responsable de l'utilisation qu'il fait des informations et contenus présents sur le Site."
      ]
    },
    {
      icon: FileText,
      title: "7. Liens hypertextes",
      content: [
        "Le Site peut contenir des liens vers d'autres sites Internet. Solo Design n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
        "La création de liens vers le Site est soumise à l'autorisation préalable de Solo Design."
      ]
    },
    {
      icon: Scale,
      title: "8. Modification des CGU",
      content: [
        "Solo Design se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le Site.",
        "Il appartient à l'utilisateur de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications."
      ]
    },
    {
      icon: Shield,
      title: "9. Droit applicable et juridiction",
      content: [
        "Les présentes CGU sont régies par le droit français.",
        "En cas de litige, les tribunaux français seront seuls compétents."
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

        {/* Floating geometric elements */}
        <motion.div
          className="fixed top-20 right-10 w-4 h-4 border border-gray-300 rotate-45 opacity-20"
          animate={{ 
            rotate: [45, 135, 225, 315, 45],
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="fixed bottom-32 left-16 w-2 h-2 bg-gray-400 rounded-full opacity-30"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <main className="pt-32 pb-16 relative z-10">
          {/* Header Section */}
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
                    className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Scale className="w-10 h-10 text-gray-600" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={fadeInVariants}
                  className="text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  Conditions
                  <span className="block mt-2 bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                    d&apos;utilisation
                  </span>
                </motion.h1>

                <motion.div
                  variants={fadeInVariants}
                  className="flex items-center justify-center space-x-2 text-gray-500"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Dernière mise à jour : 05 août 2025</span>
                </motion.div>

                <motion.p
                  variants={fadeInVariants}
                  className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                  Ces conditions d&apos;utilisation définissent les règles d&apos;usage de notre site et nos services. 
                  Veuillez les lire attentivement.
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

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-12"
            >
              {sections.map((section, index) => (
                <Parallax key={index} speed={index % 2 === 0 ? -2 : 2}>
                  <motion.div
                    variants={fadeInVariants}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <section.icon className="w-6 h-6 text-gray-600" />
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h2>
                        <div className="space-y-4">
                          {section.content.map((paragraph, pIndex) => (
                            <motion.p
                              key={pIndex}
                              className="text-gray-600 leading-relaxed"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: pIndex * 0.1 }}
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
            <Parallax speed={-3}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-16 p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl text-white text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Des questions ?</h3>
                <p className="text-gray-300 mb-6">
                  Pour toute question concernant ces conditions d&apos;utilisation, n&apos;hésitez pas à nous contacter.
                </p>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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

export default TermsPage;
