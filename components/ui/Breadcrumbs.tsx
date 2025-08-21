import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items.length) return null;

  // Ajouter l'accueil au début si pas présent
  const breadcrumbItems = items[0]?.href !== '/' 
    ? [{ label: 'Accueil', href: '/' }, ...items]
    : items;

  // Schema.org structured data pour les breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://solodesign.fr${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav 
        aria-label="Fil d'Ariane" 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            
            {item.isActive || index === breadcrumbItems.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {index === 0 ? <Home className="w-4 h-4" /> : item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
              >
                {index === 0 ? <Home className="w-4 h-4" /> : item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

// Hook pour générer automatiquement les breadcrumbs
export function useBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    return {
      label,
      href,
      isActive: index === pathSegments.length - 1
    };
  });

  return breadcrumbs;
}

export default Breadcrumbs;
