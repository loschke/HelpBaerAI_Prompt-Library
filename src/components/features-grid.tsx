export default function FeaturesGrid() {
  return (
    <div className="bg-background">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-48 mx-auto">
        {/* Hero Image */}
        <div className="aspect-w-16 aspect-h-7 mb-16">
          <img 
            className="w-full object-cover rounded-xl" 
            src="/images/zielgruppe-team.png" 
            alt="Features Hero Image"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Heading */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl font-black italic text-gray-800 dark:text-neutral-200">
              Sofort loslegen: Profi-Prompts für eure Projekte
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Designer Card */}
              <div className="flex flex-col">
                <span role="img" aria-label="Artist palette" className="text-5xl mb-4">🎨</span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  Designer
                </h3>
                <p className="mt-2 text-lg text-gray-600 dark:text-neutral-400">
                  Schnelle Mockups und Konzeptvisualisierungen für Kunden. Überzeugende Visualisierungen in Minuten erstellen.
                </p>
              </div>

              {/* Marketing-Teams Card */}
              <div className="flex flex-col">
                <span role="img" aria-label="Mobile phone" className="text-5xl mb-4">📱</span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  Marketing-Teams
                </h3>
                <p className="mt-2 text-lg text-gray-600 dark:text-neutral-400">
                  Konsistente Bildsprache über alle Kanale. Einheitliche visuelle Identität auf allen Plattformen sicherstellen.
                </p>
              </div>

              {/* Agenturen Card */}
              <div className="flex flex-col">
                <span role="img" aria-label="Office building" className="text-5xl mb-4">🏢</span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  Agenturen
                </h3>
                <p className="mt-2 text-lg text-gray-600 dark:text-neutral-400">
                  Effiziente Asset-Produktion für verschiedene Kunden. Optimierter Workflow für maßgeschneiderte Kundenlösungen.
                </p>
              </div>

              {/* Freelancer Card */}
              <div className="flex flex-col">
                <span role="img" aria-label="Briefcase" className="text-5xl mb-4">💼</span>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  Freelancer
                </h3>
                <p className="mt-2 text-lg text-gray-600 dark:text-neutral-400">
                  Professionelle Ergebnisse auch bei kleinem Budget. Hochwertige Designs ohne teure Ressourcen erstellen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
