import { Metadata } from 'next';
import legalData from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Mentions Légales | SoloDesign',
  description: 'Mentions légales, informations sur l\'entreprise et conditions d\'utilisation du site SoloDesign.',
  robots: 'index, follow',
  openGraph: {
    title: 'Mentions Légales | SoloDesign',
    description: 'Mentions légales et informations légales de SoloDesign',
    type: 'website',
  },
};

export default function LegalPage() {
  const { company, legal } = legalData;
  
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Mentions Légales</h1>
        
        <div className="prose prose-lg mx-auto max-w-none">
          {/* Éditeur du site */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Éditeur du site</h2>
            <div className="space-y-2">
              <p><strong>Raison sociale :</strong> {company.name}</p>
              <p><strong>Statut juridique :</strong> {company.legalForm}</p>
              <p><strong>Adresse :</strong> {company.address}, {company.postalCode} {company.city}, {company.country}</p>
              <p><strong>Téléphone :</strong> {company.phone}</p>
              <p><strong>Email :</strong> <a href={`mailto:${company.email}`} className="text-primary hover:underline">{company.email}</a></p>
              
              {company.siret !== "XXXXX XXXXX XXXXX" && (
                <>
                  <p><strong>SIRET :</strong> {company.siret}</p>
                  <p><strong>RCS :</strong> {company.rcs}</p>
                  <p><strong>TVA intracommunautaire :</strong> {company.vat}</p>
                </>
              )}
              <p><strong>Code APE :</strong> {company.codeAPE}</p>
              
              {company.insurance && (
                <div className="mt-4">
                  <p><strong>Assurance professionnelle :</strong></p>
                  <p>Assureur : {company.insurance.company}</p>
                  <p>Police : {company.insurance.policy}</p>
                  <p>Couverture : {company.insurance.coverage}</p>
                </div>
              )}
            </div>
          </section>

          {/* Directeur de publication */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Directeur de publication</h2>
            <p><strong>Responsable éditorial :</strong> {legal.director}</p>
          </section>

          {/* Hébergement */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Hébergement</h2>
            <div className="space-y-2">
              <p><strong>Hébergeur :</strong> {legal.hosting.provider}</p>
              <p><strong>Adresse :</strong> {legal.hosting.address}</p>
              <p><strong>Téléphone :</strong> {legal.hosting.phone}</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="mt-4">
              La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite 
              sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          {/* Protection des données */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Protection des données personnelles</h2>
            <p>
              Conformément à la loi &ldquo;Informatique et Libertés&rdquo; du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
            </p>
            <p className="mt-4">
              Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : 
              <a href={`mailto:${company.email}`} className="text-primary hover:underline ml-1">{company.email}</a>
            </p>
            <p className="mt-4">
              Pour plus de détails, consultez notre <a href="/privacy" className="text-primary hover:underline">politique de confidentialité</a>.
            </p>
          </section>

          {/* Médiation */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Médiation de la consommation</h2>
            <p>
              {legal.mediation.conditions}
            </p>
            <p className="mt-4">
              <strong>Médiateur :</strong> {legal.mediation.name}<br />
              <strong>Site web :</strong> <a href={legal.mediation.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{legal.mediation.website}</a>
            </p>
          </section>

          {/* Responsabilité */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Limitation de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l&apos;année, 
              mais peut toutefois contenir des inexactitudes ou des omissions.
            </p>
            <p className="mt-4">
              Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
              à l&apos;adresse {company.email}, en décrivant le problème de la façon la plus précise possible.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et mesurer l&apos;audience. 
              Pour plus d&apos;informations sur les cookies utilisés, consultez notre page dédiée aux cookies.
            </p>
            <p className="mt-4">
              <a href="/legal" className="text-primary hover:underline">En savoir plus sur les cookies</a>
            </p>
          </section>

          {/* Droit applicable */}
          <section className="mb-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Droit applicable et juridiction</h2>
            <p>
              Tout litige en relation avec l&apos;utilisation du site www.solodesign.fr est soumis au droit français. 
              Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
            </p>
          </section>

          {/* Date de mise à jour */}
          <section className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
