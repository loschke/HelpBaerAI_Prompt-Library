import HeroSection from "@/components/hero-section"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Entdecken Sie die Kraft der Prompt Engineering
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-16">
              Mit unseren Prompt Formeln erstellen Sie beeindruckende KI-generierte Bilder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">Prompt Formeln</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Nutzen Sie unsere bewährten Prompt Formeln für konsistente und hochwertige Ergebnisse
                </p>
                <Link href="/prompt-formeln">
                  <Button className="w-full">Zur Galerie</Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">Bilder Galerie</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Lassen Sie sich von tausenden KI-generierten Bildern inspirieren
                </p>
                <Link href="/images">
                  <Button className="w-full">Entdecken</Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">Prompt Generator</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Erstellen Sie eigene Prompts mit unserem intuitiven Generator
                </p>
                <Link href="/generator">
                  <Button className="w-full">Jetzt testen</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Bereit loszulegen?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Starten Sie jetzt und erstellen Sie beeindruckende KI-generierte Bilder
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">Kostenlos starten</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">Preise ansehen</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
