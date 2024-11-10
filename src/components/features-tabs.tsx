"use client"

import { useEffect } from 'react'

export default function FeaturesTabs() {
  useEffect(() => {
    // Initialize Preline tabs when component mounts
    if (typeof window !== 'undefined') {
      require('preline/dist/preline').initHSTabs
    }
  }, [])

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-48 mx-auto">
      <div className="relative p-6 md:p-16">
        {/* Grid */}
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-3xl text-gray-800 font-black italic sm:text-4xl dark:text-neutral-200">
              Weitere handfeste Gründe, warum du oder dein Team diese Prompt-Bibliothek lieben wird.
            </h2>

            {/* Tab Navs */}
            <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist" aria-orientation="vertical">
              <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-background dark:hover:bg-background dark:focus:bg-background active" id="tabs-with-card-item-1" aria-selected="true" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
                <span className="flex gap-x-6">
                  <span className="shrink-0 mt-1 text-2xl">⚡</span>
                  <span className="grow">
                    <span className="block text-xl font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-primary dark:text-neutral-200">Spare einfach Zeit</span>
                    <span className="block mt-1 text-lg text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Prompt finden oder Bildrecherche von 2-3 Stunden auf 15-20 Minuten reduziert.</span>
                  </span>
                </span>
              </button>

              <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-background p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-background dark:hover:bg-background dark:focus:bg-background" id="tabs-with-card-item-2" aria-selected="false" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
                <span className="flex gap-x-6">
                  <span className="shrink-0 mt-1 text-2xl">✨</span>
                  <span className="grow">
                    <span className="block text-xl font-semibold hs-tab-active:text-primary text-gray-800 dark:hs-tab-active:text-primary dark:text-neutral-200">Konstante Qualität</span>
                    <span className="block mt-1 text-lg text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Erprobte Formeln für verlässlich gute Ergebnisse beim ersten Versuch</span>
                  </span>
                </span>
              </button>

              <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-background dark:hover:bg-background dark:focus:bg-background" id="tabs-with-card-item-3" aria-selected="false" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab">
                <span className="flex gap-x-6">
                  <span className="shrink-0 mt-1 text-2xl">🎯</span>
                  <span className="grow">
                    <span className="block text-xl font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-primary dark:text-neutral-200">Lernkurve? Welche Lernkurve?</span>
                    <span className="block mt-1 text-lg text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">Keine Lernkurve, keine Probleme. Sofort nutzbar, ohne wochenlange Einarbeitung</span>
                  </span>
                </span>
              </button>
            </nav>
            {/* End Tab Navs */}
          </div>
          {/* End Col */}

          <div className="lg:col-span-6">
            <div className="relative">
              {/* Tab Content */}
              <div>
                <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
                  <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="images/zeit-sparen.png" alt="Features Image" />
                </div>

                <div id="tabs-with-card-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                  <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="images/konstante-qualitaet.png" alt="Features Image" />
                </div>

                <div id="tabs-with-card-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                  <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" src="images/keine-lernkurve.png" alt="Features Image" />
                </div>
              </div>
              {/* End Tab Content */}

            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}

        {/* Background Color */}
        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-[#0A0A0A] w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
        </div>
        {/* End Background Color */}
      </div>
    </div>
  )
}
