import { Metadata } from 'next'
import { StylesGrid } from "@/components/styles-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// SEO Metadata
export const metadata: Metadata = {
  title: 'PromptBär | 300+ KI-Bildstile & Design-Referenzen für konsistente Ergebnisse',
  description: 'Umfangreiche Sammlung von KI-Bildstilen und Design-Referenzen. Erstelle konsistente Bildserien mit Midjourney, DALL-E & Firefly. Mit Style-Prompts.',
  keywords: 'ki bildstile, ai artstyles, midjourney styles, design referenzen, visual styles, ki-design stile, prompt styles, style guide',
}

// Fetch data with ISR
async function getStyles() {
  try {
    // Use direct Airtable API call for SSR to avoid additional hop through our API
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_STYLES}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    return {
      styles: result.records.filter((record: any) => 
        record.fields?.Preview?.[0]?.url
      ),
      nextOffset: result.offset || null
    };
  } catch (err) {
    console.error('Error fetching styles:', err);
    return {
      styles: [],
      nextOffset: null
    };
  }
}

export default async function StylesReferencesPage() {
  const { styles: initialStyles, nextOffset: initialOffset } = await getStyles();

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            {/* Tag */}
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              Kreative Inspiration
            </Badge>

            {/* New Content */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Bilder mit Stil!
            </h2>
            <p className="text-2xl text-foreground leading-relaxed">
              Styles sind der Schlüssel für konsistente und hochwertige KI-Bilder. Sie definieren das visuelle
              Erscheinungsbild und die Ästhetik eurer kreativen Projekte.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 text-4xl">
                    ✍️
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Text-Styles</h3>
                  <p className="text-sm text-slate-300">Wiederverwendbare Stilbeschreibungen, die an den Motivprompt angehängt werden, um einen konsistenten visuellen Stil zu erzeugen.</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 text-4xl">
                    🎨
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Bild-Styles</h3>
                  <p className="text-sm text-slate-300">Visuelle Vorlagen für komplexe Stilübertragungen, die als Referenz für das gewünschte künstlerische Erscheinungsbild dienen.</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 text-4xl">
                    ⚡
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Style-Codes</h3>
                  <p className="text-sm text-slate-300">Spezifische Parameter-Codes für Midjourney, die am Ende des Prompts eingefügt werden und kreative Bildstile erzeugen.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="w-full mx-auto py-8">
          <StylesGrid 
            initialStyles={initialStyles} 
            initialOffset={initialOffset}
          />
        </div>
      </div>
    </main>
  )
}
