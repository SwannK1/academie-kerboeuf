import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/.git/**",
          "**/node_modules/**",
          "**/.next/**",
          "**/.next-*/**",
          "**/.audit-pr268-codex/**",
          "**/.worktrees/**",
          "**/tmp/**",
        ],
      };
    }

    return config;
  },
  async redirects() {
    // Refonte « espace de travail » : voir docs/refonte-2026/inventaire.md.
    const permanent = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      // Outils fusionnés dans Enseigner / Direction
      permanent("/enseignants", "/enseigner"),
      permanent("/enseignants/emploi-du-temps", "/enseigner/classe"),
      permanent("/enseignants/organisation", "/enseigner/semaine"),
      permanent("/enseignants/preparer-une-seance", "/enseigner/semaine"),
      permanent("/enseignants/cahier-journal", "/enseigner/cahier-journal"),
      permanent("/enseignants/programmation", "/enseigner/annee"),
      permanent("/enseignants/programmation/:path*", "/enseigner/annee"),
      permanent("/enseignants/progression", "/enseigner/periode"),
      permanent("/enseignants/conseil-ecole", "/direction/reunions"),
      permanent("/enseignants/conseils-cycle", "/direction/reunions"),
      permanent("/enseignants/projets-sorties", "/direction/demarches/sortie"),
      permanent("/enseignants/plan-de-classe", "/enseigner/classe"),
      permanent("/enseignants/organisation-classe", "/archives/organisation-classe"),
      permanent("/enseignants/bibliotheque-classe", "/archives/bibliotheque-classe"),
      permanent("/enseignants/formations", "/archives/formations"),
      permanent("/enseignants/materiel-classe", "/archives/materiel-classe"),
      permanent("/enseignants/mon-annee", "/enseigner/annee"),
      permanent("/enseignants/ma-semaine", "/enseigner/semaine"),
      permanent("/enseignants/ma-classe", "/enseigner/classe"),
      permanent("/enseignants/tous-les-outils", "/enseigner"),
      permanent("/programmation", "/enseigner/annee"),
      permanent("/programmes", "/enseigner/annee"),
      permanent("/programmes/:path*", "/enseigner/annee"),
      permanent("/primaire/programmation", "/enseigner/annee"),
      // Recherche
      permanent("/recherche", "/ressources"),
      permanent("/ressources/:path+", "/ressources"),
      permanent("/primaire/ressources", "/ressources"),
      permanent("/maternelle/ressources", "/ressources?niveau=ms"),
      permanent("/missions-recentes", "/ressources"),
      // Lycée retiré du périmètre (fichiers conservés, voir inventaire)
      permanent("/lycee", "/ressources"),
      permanent("/lycee/:path*", "/ressources"),
      // Ancien univers narratif archivé
      permanent("/univers", "/"),
      permanent("/univers/:path*", "/"),
      permanent("/carte", "/"),
      permanent("/personnages", "/"),
      permanent("/personnages/:path*", "/"),
      permanent("/professeurs", "/"),
      permanent("/professeurs/:path*", "/"),
      permanent("/eleves", "/"),
      permanent("/eleves/:path*", "/"),
      permanent("/primaire/professeurs", "/ressources"),
      permanent("/primaire/lieux", "/ressources"),
      permanent("/primaire/lieux/:path*", "/ressources"),
      permanent("/primaire/elementaire", "/ressources"),
      permanent("/primaire/elementaire/:path*", "/ressources"),
      permanent("/primaire/:level/missions", "/primaire/:level"),
      permanent("/primaire/cm2/missions/:path*", "/primaire/cm2"),
      permanent("/primaire/cm2/parcours", "/primaire/cm2"),
      permanent("/parcours/reussir-entree-sixieme", "/ressources?collection=liaison-cm2-6e"),
      permanent("/parcours", "/ressources"),
      permanent("/parcours/:path*", "/ressources"),
      permanent("/etat-du-site", "/"),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
