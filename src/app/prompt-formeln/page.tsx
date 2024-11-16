import { Metadata } from 'next'
import { generateMetadata } from '@/components/ui/seo'
import ConceptSlider from "@/components/concept-slider"
import { Badge } from "@/components/ui/badge"

// SEO Metadata
export const metadata: Metadata = generateMetadata({
  title: 'PromptBär | 80+ KI-Prompt-Formeln für professionelle Bildgenerierung',
  description: 'Entdecke unsere erprobten KI-Prompt-Formeln für Midjourney, DALL-E & Co. Modular aufgebaut, sofort einsetzbar, mit Profi-Tipps für perfekte Ergebnisse.',
  keywords: 'prompt formeln, ki prompts, midjourney formeln, prompt vorlagen, ai prompt templates, prompt engineering, dall-e prompts, ki bildgenerierung',
  ogImage: '/images/promptbaer_ai-design_prompt-bibliothek.png'
})

interface PromptCard {
  id: string;
  fields: {
    name: string;
    free: boolean;
    legend?: string;
    promptFormel?: string;
    referenceImage: {
      url: string;
      thumbnails: {
        small: { url: string };
        large: { url: string };
      };
    }[];
    examples?: {
      url: string;
      filename: string;
      thumbnails?: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
      };
    }[];
  };
}

// Fetch data at build time
async function getPromptCards() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const response = await fetch(`${baseUrl}/api/airtable`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.records || [];
  } catch (err) {
    console.error('Error fetching Airtable records:', err);
    // Return empty array instead of throwing to prevent page from crashing
    return [];
  }
}

export default async function PromptFormeln() {
  const promptCards = await getPromptCards();

  // Generate structured data for the prompt formulas
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": promptCards.map((card: PromptCard, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": card.fields.name,
        "description": card.fields.legend || "",
        "image": card.fields.referenceImage?.[0]?.url || "",
        "isAccessibleForFree": card.fields.free
      }
    }))
  };

  return (
    <main>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            {/* Tag */}
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              Von Profis entwickelt
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Prompt Formeln für perfekte Ergebnisse
            </h1>      

            {/* Description */}
            <p className="text-2xl text-foreground leading-relaxed">
              Unsere bewährten Prompt Formeln helfen dir dabei, konsistente und hochwertige Ergebnisse mit KI-Tools zu erzielen.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <ConceptSlider initialCards={promptCards} />
          </div>
        </div>
      </div>
    </main>
  )
}
