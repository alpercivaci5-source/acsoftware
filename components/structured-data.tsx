export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Patientia",
    url: "https://www.patientia.com.tr",
    logo: "https://www.patientia.com.tr/patientia-logo.png",
    description:
      "Patientia, özel web uygulamaları, mobil çözümler, yapay zeka entegrasyonları ve bulut altyapısı ile dijital dönüşüme öncülük eden profesyonel bir yazılım geliştirme şirketidir.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@patientia.com.tr",
      contactType: "customer service",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: [
      "https://linkedin.com",
      "https://github.com",
      "https://instagram.com",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Patientia",
    url: "https://www.patientia.com.tr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.patientia.com.tr/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Patientia",
    image: "https://www.patientia.com.tr/patientia-logo.png",
    "@id": "https://www.patientia.com.tr",
    url: "https://www.patientia.com.tr",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://linkedin.com",
      "https://github.com",
      "https://instagram.com",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
