import React from 'react';

const FooterMinimal = () => {
  return (
    <footer className="bg-transparent text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-2">
          © 2025 Solo Design. Tous droits réservés.
        </p>
        <ul className="flex space-x-4 text-sm">
          <li>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Conditions d&apos;utilisation
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Mentions légales
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterMinimal;
