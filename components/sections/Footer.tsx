import React from 'react';

const Footer = () => (
  <footer className="py-8 sm:py-12 border-t border-gray-800">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold mb-4 md:mb-0">Solo Design</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Solo Design. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
